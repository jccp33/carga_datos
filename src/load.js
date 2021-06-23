"use strict"

function ShowModal(title, mssg, mode){
    document.getElementById('modal_title').innerHTML = title;
    if(mode === 'alerta'){
        document.getElementById('modal_title').style.color = '#B3B300';
    }else if(mode === 'error'){
        document.getElementById('modal_title').style.color = '#FF0000';
    }else if(mode === 'mensaje'){
        document.getElementById('modal_title').style.color = '#009933';
    }
    document.getElementById('modal_messg').innerHTML = mssg;
    document.getElementById('w-modal').style.display = "block";
}
function HideModal(){
    document.getElementById('w-modal').style.display = "none";
}
function ShowLoadingModal(){
    document.getElementById('loading_modal').style.display = "block";
}
function HideLoadingModal(){
    document.getElementById('loading_modal').style.display = "none";
}
function HideModalExport(){
    document.getElementById('w-modal-export').style.display = "none";
}
