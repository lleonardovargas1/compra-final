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
        titulo: "CristianoRonaldo",
        preco: preco.cristianoRonaldo, // Corrigido: apenas uma definição
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdhHe79aHGHO5SfYZ01rniGOn7--_yPBXC4HIlynkunrmLLU3rli-La4uyaHQq76-ywBUL6RDQ_qzZ4FxW39LM4ERCN9balNn4FJwRUQ"
    }
];
 
// Array para armazenar os produtos adicionados à cesta
const produtosNaCesta = [];
 
// Seleciona o container onde os produtos serão exibidos
const container = document.getElementById('container');
 
// Seleciona os elementos necessários
const listaC = document.querySelector('.listaC');
const overlay = document.querySelector('.overlay');
 
// Função para mostrar o carrinho
function mostrarCarrinho() {
    listaC.classList.add('mostrar');
    overlay.classList.add('mostrar');
}
 
// Função para ocultar o carrinho
function ocultarCarrinho() {
    listaC.classList.remove('mostrar');
    overlay.classList.remove('mostrar');
}
 
// Função para adicionar os produtos dinamicamente ao container
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
 
    // Adiciona evento de clique aos botões "Comprar"
    const botoesComprar = document.querySelectorAll('.comprar');
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            adicionarProdutoNaCesta(index);
        });
    });
}
 
// Função para adicionar um produto à cesta
function adicionarProdutoNaCesta(index) {
    const produto = produtos[index];
    const produtoExistente = produtosNaCesta.find(p => p.titulo === produto.titulo);
 
    if (produtoExistente) {
        produtoExistente.quantidade += 1; // Incrementa a quantidade se o produto já estiver na cesta
    } else {
        produtosNaCesta.push({ ...produto, quantidade: 1 }); // Adiciona o produto com quantidade inicial 1
    }
    atualizarListaC();
}
 
// Função para atualizar a exibição da listaC
function atualizarListaC() {
    const listaC = document.querySelector('.listaC');
 
    // Remove os itens antigos (exceto o header)
    const itensExistentes = listaC.querySelectorAll('.item-cesta');
    itensExistentes.forEach(item => item.remove());
 
    // Adiciona cada produto na lista
    produtosNaCesta.forEach((produto, index) => {
        const item = document.createElement('div');
        item.classList.add('item-cesta');
        item.innerHTML = `
            <p><strong>${produto.titulo}</strong></p>
            <p>R$ ${produto.preco.toFixed( )} x ${produto.quantidade}</p>
            <p>
                <button class="diminuir" data-index="${index}">-</button>
                ${produto.quantidade}
                <button class="aumentar" data-index="${index}">+</button>
            </p>
            <button class="remover" data-index="${index}">Remover</button>
        `;
        listaC.appendChild(item);
    });
 
    // Adiciona funcionalidade de aumentar a quantidade
    const botoesAumentar = document.querySelectorAll('.aumentar');
    botoesAumentar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta[index].quantidade += 1;
            atualizarListaC();
        });
    });
 
    // Adiciona funcionalidade de diminuir a quantidade
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
 
    // Calcula o total dos produtos na cesta
    const precoTotal = produtosNaCesta.reduce((total, produto) => {
        return total + produto.preco * produto.quantidade;
    }, 0);
 
    // Atualiza ou cria o elemento do total
    let totalDiv = document.querySelector('.total-preco');
    if (!totalDiv) {
        totalDiv = document.createElement('div');
        totalDiv.classList.add('total-preco');
        listaC.appendChild(totalDiv);
    }
    totalDiv.innerHTML = `<h3 id="Total">Total: R$ ${precoTotal.toFixed()}</h3>`;
 
    // Adicionei a  funcionalidade de remoção
    const botoesRemover = document.querySelectorAll('.remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta.splice(index, 1);
            atualizarListaC();
        });
    });
}
 
 
function adicionarEventosComprar() {
    const botoesComprar = document.querySelectorAll('.comprar');
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            adicionarProdutoNaCesta(index);
            mostrarCarrinho();
        });
    });
}
 
 
document.querySelector('.excluir').addEventListener('click', ocultarCarrinho);
overlay.addEventListener('click', ocultarCarrinho);
 
 
adicionarProdutosAoContainer();
adicionarEventosComprar();