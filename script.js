const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
})

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-name p")

inputUpload.addEventListener("change", async (evento) =>{
    const arquivo = evento.target.files[0];
    console.log(arquivo);
    if (arquivo){
        try{
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
            console.log(conteudoDoArquivo.url);
        } catch (erro) {
            console.error("Erro na leitura do arquivo.")

        }
    }
})

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject)=>{
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name})
            console.log(arquivo.name)
        }
        leitor.onerror = () =>
            reject(`Erro na leitura do arquivo ${arquivo.name}`)

        leitor.readAsDataURL(arquivo);
    });
}

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")){
        const tagAlvo = evento.target.parentElement;
        listaTags.removeChild(tagAlvo);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data science", "Full-stack", "HTML", "CSS", "JavaScript"];
async function verificarTagsDisponiveis(tagTexto) {
    return new Promise ((resolve) =>{
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 500)
    })
}


inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagText = inputTags.value.trim();
        try{
            const tagExiste = await verificarTagsDisponiveis(tagText);
            console.log(tagExiste)
            if (tagExiste) {
                if (tagText !== "") {
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagText}</p> <img src="img/close.svg" class="remove-tag">`;
                    listaTags.appendChild(newTag);
                    inputTags.value = ""; 
                }
            } else{
                alert("Tag não foi encontrada.");
            }
        } catch(error){
            console.error("Erro ao verificar a existência da tag", error);
            alert("Erro ao verificar a existência da tag. Verifique o console.")
        }

    }
})

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto){
        return new Promise((resolve,reject) =>{
            setTimeout(() => {
                const deuCerto = Math.random() > 0.5;

                if (deuCerto) {
                    resolve("Projeto publicado com sucesso");
                    console.log(nomeDoProjeto);
                    console.log(descricaoDoProjeto);
                    console.log(tagsProjeto);
                }
                else{
                    reject("Erro na puclicação do projeto")
                }
            }, 2000)
        })
}

botaoPublicar.addEventListener("click", async (evento) =>{
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try{
        const mensagem = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto)
        console.log(mensagem);
        alert(mensagem);
    }catch(error){
        console.log(`Erro no envio da mensagem ${error}`)
        console.error(error);
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click",(evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/Card-publicação.svg";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = '';
})