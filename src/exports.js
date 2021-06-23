"use strict"

// exportar datos a script sqlite
function exportSQLite(){
    if(rows_data.length == 0){
        ShowModal("ERROR", "No hay datos para exportar", "error");
    }else{
        // nombre de tabla -> igual a nombre de archivo
        let tname = file_name.split('.')[0];
        let text = "CREATE TABLE " + tname + "(";
        // nombres de columnas -> iguales a cabeceras de excel
        for(let i=0; i<keys_data.length; i++){
            if(i == keys_data.length-1){
                text += keys_data[i]+ " TEXT NULL);";
            }else{
                text += keys_data[i]+ " TEXT NULL, ";
            }
        }
        // inicia insert into -> tabla y columnas
        text += "\n\nINSERT INTO " + tname +"(";
        for(let j=0; j<keys_data.length; j++){
            if(j == keys_data.length-1){
                text += keys_data[j] + ")";
            }else{
                text += keys_data[j] + ", ";
            }
        }
        // agregar datos, renglon por renglon
        text += "\nVALUES\n"
        for(let i=0; i<rows_data.length; i++){
            if(i == rows_data.length-1){
                text += "\t(";
                for(let j=0; j<keys_data.length; j++){
                    if(j == keys_data.length-1){
                        text += "'" + rows_data[i][keys_data[j]] + "'";
                    }else{
                        text += "'" + rows_data[i][keys_data[j]] + "', ";
                    }
                }
                text += ");";
            }else{
                text += "\t(";
                for(let j=0; j<keys_data.length; j++){
                    if(j == keys_data.length-1){
                        text += "'" + rows_data[i][keys_data[j]] + "'";
                    }else{
                        text += "'" + rows_data[i][keys_data[j]] + "', ";
                    }
                }
                text += "),\n";
            }
        }
        // agregar texto a textarea
        document.getElementById('text-export').innerHTML = text;
        // mostrar textarea
        document.getElementById('w-modal-export').style.display = "block";
    }
}

function exportMySQL(){
    if(rows_data.length == 0){
        ShowModal("ERROR", "No hay datos para exportar", "error");
    }else{
        // nombre de tabla -> igual a nombre de archivo
        let tname = file_name.split('.')[0];
        let text = "CREATE TABLE " + tname + "(";
        // nombres de campor -> iguales a cabeceras de excel
        for(let i=0; i<keys_data.length; i++){
            if(i == keys_data.length-1){
                text += keys_data[i]+ " VARCHAR(50) NULL);";
            }else{
                text += keys_data[i]+ " VARCHAR(50) NULL, ";
            }
        }
        // inicia insert into -> tabla y columnas
        text += "\n\nINSERT INTO " + tname +"(";
        for(let j=0; j<keys_data.length; j++){
            if(j == keys_data.length-1){
                text += keys_data[j] + ")";
            }else{
                text += keys_data[j] + ", ";
            }
        }
        // agregar datos, renglon por renglon
        text += "\nVALUES\n"
        for(let i=0; i<rows_data.length; i++){
            if(i == rows_data.length-1){
                text += "\t(";
                for(let j=0; j<keys_data.length; j++){
                    if(j == keys_data.length-1){
                        text += "'" + rows_data[i][keys_data[j]] + "'";
                    }else{
                        text += "'" + rows_data[i][keys_data[j]] + "', ";
                    }
                }
                text += ");";
            }else{
                text += "\t(";
                for(let j=0; j<keys_data.length; j++){
                    if(j == keys_data.length-1){
                        text += "'" + rows_data[i][keys_data[j]] + "'";
                    }else{
                        text += "'" + rows_data[i][keys_data[j]] + "', ";
                    }
                }
                text += "),\n";
            }
        }
        // agregar texto a textarea
        document.getElementById('text-export').innerHTML = text;
        // mostrar textarea
        document.getElementById('w-modal-export').style.display = "block";
    }
}

// copiar script SQLite o MySQL
function copyToClipboard(){
    // guardar texto en text
    let text = document.getElementById('text-export').innerHTML;
    // copiar texto a portapapeles
    navigator.clipboard.writeText(text);
}
