// =====================
// PAINEL ADMINISTRATIVO
// =====================

// Elementos de cada aba
const abas = document.querySelectorAll('.tab-btn');
const conteudos = document.querySelectorAll('.tab-content');

abas.forEach(btn => {
    btn.addEventListener('click', () => {
        abas.forEach(b => b.classList.remove('active'));
        conteudos.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// Carregar dados atuais
function carregarDados() {
    document.getElementById('metricas-seguidores').value = dados.metricas.seguidores;
    document.getElementById('metricas-engajamento').value = dados.metricas.engajamento;

    renderizarRedes();
    renderizarParcerias();
    renderizarDepoimentos();
    renderizarCupons();
}

// =====================
// REDES SOCIAIS
// =====================
function renderizarRedes() {
    const container = document.getElementById('redes-editor');
    container.innerHTML = '';
    dados.redes.forEach((rede, index) => {
        const div = document.createElement('div');
        div.className = 'item-editor';
        div.innerHTML = `
            <h3>Rede #${index+1} <button class="btn-remove" onclick="removerRede(${index})">Remover</button></h3>
            <div class="form-group"><label>Nome</label><input type="text" data-index="${index}" data-campo="nome" value="${rede.nome}"></div>
            <div class="form-group"><label>Ícone (classe Font Awesome)</label><input type="text" data-index="${index}" data-campo="icone" value="${rede.icone}"></div>
            <div class="form-group"><label>Seguidores</label><input type="text" data-index="${index}" data-campo="seguidores" value="${rede.seguidores}"></div>
            <div class="form-group"><label>Link</label><input type="text" data-index="${index}" data-campo="link" value="${rede.link}"></div>
        `;
        container.appendChild(div);
    });
    container.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const campo = e.target.dataset.campo;
            dados.redes[index][campo] = e.target.value;
        });
    });
}

function adicionarRede() {
    dados.redes.push({ nome: '', icone: 'fa-brands fa-instagram', seguidores: '', link: '' });
    renderizarRedes();
}
function removerRede(index) {
    dados.redes.splice(index, 1);
    renderizarRedes();
}

// =====================
// PARCERIAS
// =====================
function renderizarParcerias() {
    const container = document.getElementById('parcerias-editor');
    container.innerHTML = '';
    dados.parcerias.forEach((parceria, index) => {
        const div = document.createElement('div');
        div.className = 'item-editor';
        div.innerHTML = `
            <h3>Parceria #${index+1} <button class="btn-remove" onclick="removerParceria(${index})">Remover</button></h3>
            <div class="form-group"><label>Título</label><input type="text" data-index="${index}" data-campo="titulo" value="${parceria.titulo}"></div>
            <div class="form-group"><label>Imagem URL</label><input type="text" data-index="${index}" data-campo="img" value="${parceria.img}"></div>
            <div class="form-group"><label>Descrição curta</label><input type="text" data-index="${index}" data-campo="desc" value="${parceria.desc}"></div>
            <div class="form-group"><label>Detalhes (modal)</label><textarea data-index="${index}" data-campo="detalhes">${parceria.detalhes}</textarea></div>
        `;
        container.appendChild(div);
    });
    container.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const campo = e.target.dataset.campo;
            dados.parcerias[index][campo] = e.target.value;
        });
    });
}

function adicionarParceria() {
    dados.parcerias.push({ titulo: '', img: '', desc: '', detalhes: '' });
    renderizarParcerias();
}
function removerParceria(index) {
    dados.parcerias.splice(index, 1);
    renderizarParcerias();
}

// =====================
// DEPOIMENTOS
// =====================
function renderizarDepoimentos() {
    const container = document.getElementById('depoimentos-editor');
    container.innerHTML = '';
    dados.depoimentos.forEach((dep, index) => {
        const div = document.createElement('div');
        div.className = 'item-editor';
        div.innerHTML = `
            <h3>Depoimento #${index+1} <button class="btn-remove" onclick="removerDepoimento(${index})">Remover</button></h3>
            <div class="form-group"><label>Nome</label><input type="text" data-index="${index}" data-campo="nome" value="${dep.nome}"></div>
            <div class="form-group"><label>Texto</label><textarea data-index="${index}" data-campo="texto">${dep.texto}</textarea></div>
        `;
        container.appendChild(div);
    });
    container.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const campo = e.target.dataset.campo;
            dados.depoimentos[index][campo] = e.target.value;
        });
    });
}

function adicionarDepoimento() {
    dados.depoimentos.push({ nome: '', texto: '' });
    renderizarDepoimentos();
}
function removerDepoimento(index) {
    dados.depoimentos.splice(index, 1);
    renderizarDepoimentos();
}

// =====================
// CUPONS
// =====================
function renderizarCupons() {
    const container = document.getElementById('cupons-editor');
    container.innerHTML = '';
    dados.cupons.forEach((cupom, index) => {
        const div = document.createElement('div');
        div.className = 'item-editor';
        div.innerHTML = `
            <h3>Cupom #${index+1} <button class="btn-remove" onclick="removerCupom(${index})">Remover</button></h3>
            <div class="form-group"><label>Loja</label><input type="text" data-index="${index}" data-campo="loja" value="${cupom.loja}"></div>
            <div class="form-group"><label>Desconto</label><input type="text" data-index="${index}" data-campo="desconto" value="${cupom.desconto}"></div>
            <div class="form-group"><label>Código</label><input type="text" data-index="${index}" data-campo="codigo" value="${cupom.codigo}"></div>
            <div class="form-group"><label>Descrição</label><input type="text" data-index="${index}" data-campo="descricao" value="${cupom.descricao}"></div>
            <div class="form-group"><label>Validade (opcional)</label><input type="text" data-index="${index}" data-campo="validade" value="${cupom.validade || ''}"></div>
            <div class="form-group"><label>Link</label><input type="text" data-index="${index}" data-campo="link" value="${cupom.link}"></div>
            <div class="form-group"><label>Detalhes (modal)</label><textarea data-index="${index}" data-campo="detalhes">${cupom.detalhes}</textarea></div>
            <div class="destaque-check">
                <label><input type="checkbox" data-index="${index}" data-campo="destaque" ${cupom.destaque ? 'checked' : ''}> Destaque</label>
            </div>
        `;
        container.appendChild(div);
    });
    container.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const campo = e.target.dataset.campo;
            if (e.target.type === 'checkbox') {
                dados.cupons[index][campo] = e.target.checked;
            } else {
                dados.cupons[index][campo] = e.target.value;
            }
        });
    });
}

function adicionarCupom() {
    dados.cupons.push({ loja: '', desconto: '', codigo: '', descricao: '', validade: '', link: '', detalhes: '', destaque: false });
    renderizarCupons();
}
function removerCupom(index) {
    dados.cupons.splice(index, 1);
    renderizarCupons();
}

// =====================
// AÇÕES FINAIS
// =====================
function baixarArquivoDados() {
    // Atualizar métricas
    dados.metricas.seguidores = document.getElementById('metricas-seguidores').value;
    dados.metricas.engajamento = document.getElementById('metricas-engajamento').value;

    const conteudo = `const dados = ${JSON.stringify(dados, null, 4)};`;
    const blob = new Blob([conteudo], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados.js';
    a.click();
    URL.revokeObjectURL(url);
}

function limparDados() {
    if (confirm('Tem certeza que deseja recarregar os dados originais?')) {
        location.reload();
    }
}

// Inicializar
carregarDados();