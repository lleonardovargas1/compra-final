const preco = {
    griezmann: 499.00,
    neyma: 1.00,
    messi: 299.00,
    cristianoRonaldo: 299.00
};
 
const produtos = [
    {
        titulo: "griezmann",
        preco: preco.griezmann,
        imagem: "https://jpimg.com.br/uploads/2017/04/1897829755-griezmann-havia-afirmado-que-atletico-de-madrid-brigaria-contra-o-rebaixamento-na-temporada.jpg"
    },
    {
        titulo: "oneyma",
        preco: preco.neyma,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8jvT9aAJUPeexGgc4WTOpdc4Jld5qaW3FA&s"
    },
    {
        titulo: "messi",
        preco: preco.messi,
        imagem: "https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2025/04/messi-inter-miami-scaled-aspect-ratio-512-320.jpg"
    },
    {
        titulo: "cris",
        preco: preco.cristianoRonaldo, 
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdhHe79aHGHO5SfYZ01rniGOn7--_yPBXC4HIlynkunrmLLU3rli-La4uyaHQq76-ywBUL6RDQ_qzZ4FxW39LM4ERCN9balNn4FJwRUQ"
    }
];
 
 
const produtosNaCesta = [];
const container = document.getElementById('container');
const listaC = document.querySelector('.listaC');
const overlay = document.querySelector('.overlay');
 
function mostrarCarrinho() {
    listaC.classList.add('mostrar');
    overlay.classList.add('mostrar');
}
 
function ocultarCarrinho() {
    listaC.classList.remove('mostrar');
    overlay.classList.remove('mostrar');
}
 
function adicionarProdutosAoContainer() {
    produtos.forEach((produto, index) => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');
        divProduto.innerHTML = `
            <img class="ps4" src="${produto.imagem}" alt="${produto.titulo}">
            <h1 class="ps4titulo">${produto.titulo}</h1>
            <h2 class="preco"><b>R$ ${produto.preco.toFixed(2)}</b></h2>
            <button class="comprar" data-index="${index}">Comprar</button>
        `;
        container.appendChild(divProduto);
    });
 
    const botoesComprar = document.querySelectorAll('.comprar');
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            adicionarProdutoNaCesta(index);
            mostrarCarrinho();
        });
    });
}
 
function adicionarProdutoNaCesta(index) {
    const produto = produtos[index];
    const produtoExistente = produtosNaCesta.find(p => p.titulo === produto.titulo);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        produtosNaCesta.push({ ...produto, quantidade: 1 }); // Inicializa com quantidade 1
    }
    atualizarListaC();
}
 
function atualizarListaC() {
    const itensExistentes = listaC.querySelectorAll('.item-cesta');
    itensExistentes.forEach(item => item.remove());
 
    produtosNaCesta.forEach((produto, index) => {
        const item = document.createElement('div');
        item.classList.add('item-cesta');
        item.innerHTML = `
            <p><strong>${produto.titulo}</strong></p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <p class="legal"> <b>R$ ${(produto.preco * produto.quantidade).toFixed(2)}<b></p>
            <p><button class="diminuir" data-index="${index}">-</button>
                ${produto.quantidade}
                <button class="aumentar" data-index="${index}">+</button>
            </p><button class="remover" data-index="${index}">Remover</button>
        `;
        listaC.appendChild(item);
    });
 
    // Recalcula o total
    const precoTotal = produtosNaCesta.reduce((total, produto) => {
        return total + produto.preco * produto.quantidade;
    }, 0);
 
    let totalDiv = document.querySelector('.total-preco');
    if (!totalDiv) {
        totalDiv = document.createElement('div');
        totalDiv.classList.add('total-preco');
        listaC.appendChild(totalDiv);
    }
    totalDiv.innerHTML = `<h3 id="Total">Total: R$ ${precoTotal.toFixed(2)}</h3>`;
 
    // Atualiza os botões de diminuir, aumentar e remover
    const botoesDiminuir = document.querySelectorAll('.diminuir');
    botoesDiminuir.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (produtosNaCesta[index].quantidade > 1) {
                produtosNaCesta[index].quantidade -= 1;
            } else {
                produtosNaCesta.splice(index, 1);
            }
            atualizarListaC();
        });
    });
 
    const botoesAumentar = document.querySelectorAll('.aumentar');
    botoesAumentar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta[index].quantidade += 1;
            atualizarListaC();
        });
    });
 
    const botoesRemover = document.querySelectorAll('.remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta.splice(index, 1);
            atualizarListaC();
        });
    });
}
 
document.querySelector('.excluir').addEventListener('click', ocultarCarrinho);
overlay.addEventListener('click', ocultarCarrinho);
 
adicionarProdutosAoContainer();
 