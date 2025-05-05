document.addEventListener("DOMContentLoaded", (event) => {
    //buscarInscritos();
    //construirModal();

    const temaLocal = localStorage.getItem("tema");
    document.body.setAttribute("data-theme", temaLocal);
});

let idiomaAtual = "pt"

function alterarIdioma() {
    idiomaAtual = idiomaAtual == "pt" ? "en" : "pt";
    carregaIdioma(idiomaAtual);

}

function carregaIdioma(idioma){
    fetch(`./json/${idioma}.json`).then(data => data.json()).then(data=>{
        traduzirPagina(data);
    });
}

function traduzirPagina(linguagem){
    document.querySelectorAll("[data-i18n]").forEach(elemento=>{
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n");
        console.log(chave);
        if(linguagem[chave]){
            elemento.textContent = linguagem[chave];
        }
        //para imagens
    });
}

function alterarTema() {
    //DOM -> document object model
    const tema = document.body.getAttribute("data-theme");
    const novoTema = tema === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", novoTema);

    const bAlterarTema = document.getElementById("bAlterarTema");
    bAlterarTema.textContent = novoTema === "dark" ? "🌙" : "☀️";

    localStorage.setItem("tema", novoTema);
    document.body.setAttribute("data-theme", novoTema);


}