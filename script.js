
const perfis = [
    {
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Gosta de criar coisas e resolver problemas.",
        imagem: "imagens/Astronauta1.jpg",
        recomendacao: "Você vai cuidar dos equipamentos e sistemas da nave."
    },
    {
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "É curioso e gosta de pesquisar e descobrir coisas.",
        imagem: "imagens/Astronauta2.jpg",
        recomendacao: "Você vai estudar o planeta e fazer descobertas."
    },
    {
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "Gosta de aventuras e de conhecer lugares novos.",
        imagem: "imagens/Astronauta3.jpg",
        recomendacao: "Você vai explorar o planeta e procurar novos caminhos."
    },
    {
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "Gosta de organizar as coisas e planejar.",
        imagem: "imagens/Astronauta4.jpg",
        recomendacao: "Você vai organizar a equipe e ajudar nas decisões."
    }
];

const formulario = document.getElementById("testeAura");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "";

    if (nome === "" || nascimento === "") {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    const hoje = new Date();
    const dataNascimento = new Date(nascimento + "T12:00:00");

    if (dataNascimento > hoje || isNaN(dataNascimento.getTime())) {
        mensagem.textContent = "Informe uma data válida!";
        return;
    }

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    if (
        hoje.getMonth() < dataNascimento.getMonth() ||
        (hoje.getMonth() === dataNascimento.getMonth() &&
        hoje.getDate() < dataNascimento.getDate())
    ) {
        idade--;
    }

    const respostas = [];

    for (let i = 1; i <= 4; i++) {
        const resposta = formulario.querySelector(
            `input[name="p${i}"]:checked`
        );

        if (!resposta) {
            mensagem.textContent = "Responda todas as perguntas!";
            return;
        }

        respostas.push(Number(resposta.value));
    }

    const pontos = [0, 0, 0, 0];

    for (let i = 0; i < respostas.length; i++) {
        pontos[respostas[i] - 1]++;
    }

    const maior = Math.max(...pontos);
    const vencedor = pontos.indexOf(maior);

    if (pontos.filter(p => p === maior).length > 1) {
        mensagem.textContent = "Deu empate! Tente outras respostas.";
        return;
    }

    const perfil = perfis[vencedor];

    document.getElementById("saudacao").textContent =
        "Participante: " + nome + " • Idade: " + idade + " anos";

    document.getElementById("nomePerfil").textContent = perfil.nome;
    document.getElementById("categoria").textContent =
        "Categoria: " + perfil.categoria;
    document.getElementById("descricao").textContent = perfil.descricao;
    document.getElementById("recomendacao").textContent =
        perfil.recomendacao;
    document.getElementById("detalhes").textContent =
        "Pontuação: " + maior + " ponto(s).";

    const imagem = document.getElementById("imagemPerfil");
    imagem.src = perfil.imagem;
    imagem.alt = perfil.nome;

    document.getElementById("formulario").hidden = true;
    document.getElementById("resultado").hidden = false;
});

document.getElementById("refazer").addEventListener("click", function() {
    formulario.reset();

    document.getElementById("formulario").hidden = false;
    document.getElementById("resultado").hidden = true;
    document.getElementById("mensagem").textContent = "";
});
