document.addEventListener("DOMContentLoaded", (event) => {
    //buscarInscritos();
    //construirModal();

    const temaLocal = localStorage.getItem("tema");
    document.body.setAttribute("data-theme", temaLocal);

    const idiomaSalvo = localStorage.getItem("idioma") ;
    idiomaAtual = idiomaSalvo;

    const traducaoCache = localStorage.getItem(`traducao_${idiomaAtual}`);
    if (traducaoCache) {
        traduzirPagina(JSON.parse(traducaoCache));
    } else {
        carregaIdioma(idiomaAtual);
    }
});

let idiomaAtual = "pt"

function alterarIdioma() {
    idiomaAtual = idiomaAtual == "pt" ? "en" : "pt";
    localStorage.setItem("idioma", idiomaAtual);
    carregaIdioma(idiomaAtual);

}

function carregaIdioma(idioma){
    fetch(`./JSON/${idioma}.json`)
    .then(data => data.json())
    .then(data=>{
        localStorage.setItem(`traducao_${idioma}`, JSON.stringify(data));
        traduzirPagina(data);
    });
}

function traduzirPagina(linguagem){
    document.querySelectorAll("[data-i18n]").forEach(elemento=>{ 
        const chave = elemento.getAttribute("data-i18n");
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