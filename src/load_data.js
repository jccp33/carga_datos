"use strict"

// variables globales
let pages = 0;
let current = 1;
let rows_page = 10;
let last_page = 0;
let keys_data = [];
let rows_data = [];
let file_name = "";

// cargar pagina de datos actual
function loadCurrentPage(){
    ShowLoadingModal();

    // calcular inicio y fin de datos a cargar
    let init = (current-1) * rows_page;
    let end = init + rows_page;
    if(current==pages && last_page!=0){
        end = init + last_page;
    }
    // cargar cabecera de la tabla
    let text_head = "<tr><th scope='col'>numero</th>";
    for(let i=0; i<keys_data.length; i++){
        text_head += "<th scope='col'>" + keys_data[i] + "</th>";
    }
    text_head += "</tr>";
    let data_head = document.getElementById('data-head');
    data_head.innerHTML = "";
    data_head.innerHTML = text_head;
    // cargar datos de la tabla
    let data_body = document.getElementById('data-body');
    data_body.innerHTML = "";
    for(let i=init; i<end; i++){
        let text_row = "<tr>";
        text_row += "<td>" + (i+1) + "</td>";
        for(let j=0; j<keys_data.length; j++){
            text_row += "<td>" + rows_data[i][keys_data[j]] + "</td>";
        }
        text_row += "</tr>";
        data_body.innerHTML += text_row;
    }

    HideLoadingModal();
}

// cargar siguiente pagina de datos
function loadNextPage(){
    if(current < pages){
        current++;
    }
    loadCurrentPage();
}

// cargar anterior pagina de datos
function loadPreviousPage(){
    if(current > 1){
        current--;
    }
    loadCurrentPage();
}

// resetear tabla de datos al cambiar la cantidad de renglones por pagina
function resetForValue(){
    // obtener cantidad de renglones por pagina
    let value = parseInt(document.getElementById('select-rows').value);
    // resetear variables globales
    current = 1;
    rows_page = value;
    pages = parseInt(rows_data.length / rows_page);
    if(rows_data.length%rows_page != 0){
        pages += 1;
        last_page = rows_data.length % rows_page;
    }
    // cargar pagina actual -> 1
    loadCurrentPage();
}

// cargar archivo de datox -> excel
function Upload(){
    // archivo
    let fileUpload = document.getElementById("data-file");
    // expresion regular para excle
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    // verificar archivo
    if(regex.test(fileUpload.value.toLowerCase())){
        if(typeof(FileReader)!= "undefined"){
            let reader = new FileReader();
            // navegadores diferentes de IE
            if(reader.readAsBinaryString){
                reader.onload = function(e){
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            }else{
                // IE
                reader.onload = function(e){
                    let data = "";
                    let bytes = new Uint8Array(e.target.result);
                    for(let i = 0; i < bytes.byteLength; i++){
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
            // mostrar tabla y controles de tabla
            document.getElementById('data-container').style.display = "block";
        }else{
            ShowModal("ALERTA", "HTML5 no soportado!", "alerta");
        }
    }else{
        ShowModal("ALERTA", "Archivo no valido!", "alerta");
    }
};

function ProcessExcel(data){
    // leer archivo
    let workbook = XLSX.read(data, {type: 'binary'});
    // nombre de primera hoja
    let firstSheet = workbook.SheetNames[0];
    // leer datos en un objeto json
    let excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    // datos
    rows_data = excelRows;
    // cabeceras de columnas
    keys_data = Object.keys(excelRows[0]);
    // calcular variables globales
    pages = parseInt(excelRows.length / rows_page);
    if(excelRows.length%rows_page != 0){
        pages += 1;
        last_page = excelRows.length % rows_page;
    }
    // cargar pagina actual -> 1
    loadCurrentPage();
}

// evento 'onChange' del input file
document.getElementById('data-file').addEventListener("change", function(){
    // calcular variables globales
    pages = 0;
    current = 1;
    rows_page = 10;
    last_page = 0;
    rows_data = [];
    document.getElementById('select-rows').value = "10";
    let file = this.value.split('\\');
    file_name = file[file.length-1];
    
    Upload();
});
