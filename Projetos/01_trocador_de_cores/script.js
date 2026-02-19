function cliquei() {
    
    //Pegar o HTML da Página
    let corpo = document.getElementById('corpo')
    corpo.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
