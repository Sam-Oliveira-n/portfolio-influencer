// Dados dos cupons (edite manualmente)
const cupons = [
    {
        loja: "Loja de Moda",
        desconto: "20%",
        codigo: "EMILY20",
        descricao: "Desconto em todo o site, exceto itens da coleção nova.",
        validade: "Válido até 31/12/2026",
        link: "https://www.exemplo.com",
        detalhes: "Use o código no checkout para obter 20% de desconto em produtos selecionados."
    },
    {
        loja: "Cosméticos Beauty",
        desconto: "15%",
        codigo: "EMILYBEAUTY",
        descricao: "Desconto em produtos de skincare e maquiagem.",
        validade: "Válido até 30/11/2026",
        link: "https://www.exemplo.com",
        detalhes: "Válido para compras acima de R$100. Não cumulativo com outras promoções."
    },
    {
        loja: "Alimentação Saudável",
        desconto: "R$30 OFF",
        codigo: "EMILYFIT",
        descricao: "Desconto em kits de suplementos e alimentos fit.",
        validade: "Válido até 15/01/2027",
        link: "https://www.exemplo.com",
        detalhes: "Válido para compras acima de R$150. Entrega grátis para capitais."
    }
];

// Elementos
const cuponsGrid = document.getElementById('cuponsGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Gera os cards de cupons
function gerarCardsCupons() {
    cuponsGrid.innerHTML = '';
    cupons.forEach((cupom, index) => {
        const card = document.createElement('div');
        card.className = 'cupom-card';
        card.innerHTML = `
            <div class="cupom-header">
                <div class="cupom-desconto">${cupom.desconto}</div>
                <div class="cupom-loja">${cupom.loja}</div>
            </div>
            <div class="cupom-body">
                <p class="cupom-descricao">${cupom.descricao}</p>
                <div class="cupom-codigo">
                    <span>${cupom.codigo}</span>
                    <button class="btn-copiar" onclick="copiarCodigo('${cupom.codigo}', this)">Copiar</button>
                </div>
                <a href="${cupom.link}" target="_blank" class="btn-usar">Usar Cupom</a>
                <p class="cupom-validade">${cupom.validade}</p>
            </div>
        `;
        card.addEventListener('click', () => abrirModalCupom(cupom));
        cuponsGrid.appendChild(card);
    });
}

// Função para copiar código
function copiarCodigo(codigo, botao) {
    navigator.clipboard.writeText(codigo).then(() => {
        botao.textContent = 'Copiado!';
        setTimeout(() => {
            botao.textContent = 'Copiar';
        }, 2000);
    }).catch(err => {
        alert('Não foi possível copiar. Copie manualmente: ' + codigo);
    });
}

// Abre modal com detalhes
function abrirModalCupom(cupom) {
    modalBody.innerHTML = `
        <h2>${cupom.loja}</h2>
        <p>${cupom.detalhes || cupom.descricao}</p>
        <div class="modal-codigo">${cupom.codigo}</div>
        <div style="display:flex; gap:10px; justify-content:center;">
            <button class="btn-copiar" onclick="copiarCodigo('${cupom.codigo}', this)">Copiar</button>
            <a href="${cupom.link}" target="_blank" class="btn-usar">Visitar Loja</a>
        </div>
        <p class="cupom-validade">${cupom.validade}</p>
    `;
    modalOverlay.classList.add('active');
}

// Fecha modal
function fecharModal() {
    modalOverlay.classList.remove('active');
}

modalClose.addEventListener('click', fecharModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) fecharModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) fecharModal();
});

// Inicializa
gerarCardsCupons();