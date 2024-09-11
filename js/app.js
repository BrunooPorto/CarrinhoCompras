let totalGeral = 0;
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
atualizarInterface();

// Função para adicionar um produto ao carrinho e ao localStorage
function adicionar() {
    const produto = document.getElementById('produto').value;
    const [nomeProduto, valorUnitarioStr] = produto.split('-');
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valorUnitario = parseFloat(valorUnitarioStr.replace('R$', ''));
    const precoTotal = quantidade * valorUnitario;


    if (isNaN(quantidade) || quantidade <= 0) {
        alert('Por favor, informe uma quantidade válida (número maior que zero).');
        return;
    }

    carrinho.push({ nomeProduto, quantidade, precoTotal });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarInterface();
}

// Função para remover um produto do carrinho e do localStorage
function removerProduto(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarInterface();
}

// Função para atualizar a interface do carrinho
function atualizarInterface() {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    let total = 0;
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.quantidade}x ${item.nomeProduto} - R$ ${formatarValor(item.precoTotal)}
        <button data-index="${index}">Remover</button>`;
        listaProdutos.appendChild(li);
        total += item.precoTotal;

        li.querySelector('button').addEventListener('click', () => {
            removerProduto(index);
        });
    });

    document.getElementById('valor-total').textContent = formatarValor(total);
}

// Função para formatar valores monetários
function formatarValor(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function limpar() {
    totalGeral = 0;
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$0';
}