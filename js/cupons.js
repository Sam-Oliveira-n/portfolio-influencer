// Dados vindos de dados.js
const cupons = dados.cupons;

// Elementos
const cuponsGrid = document.getElementById('cuponsGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Funções auxiliares
function validadeExiste(validade) {
    return validade && validade.trim() !== '';
}
function gerarValidadeHTML(validade) {
    return validadeExiste(validade) ? `<p class="cupom-validade">${validade}</p>` : '';
}

// Copiar código
function copiarCodigo(codigo, botao) {
    navigator.clipboard.writeText(codigo).then(() => {
        botao.textContent = 'Copiado!';
        setTimeout(() => {
            botao.textContent = 'Copiar';
        }, 2000);
    }).catch(() => {
        alert('Não foi possível copiar. Copie manualmente: ' + codigo);
    });
}

// Geração dos cards
function gerarCardsCupons() {
    cuponsGrid.innerHTML = '';
    cupons.forEach((cupom, index) => {
        const card = document.createElement('div');
        card.className = 'cupom-card';
        if (cupom.destaque) card.classList.add('destaque');
        // Definir variável CSS para atraso da animação
        card.style.setProperty('--i', index);

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
                ${gerarValidadeHTML(cupom.validade)}
            </div>
        `;
        card.addEventListener('click', () => abrirModalCupom(cupom));
        cuponsGrid.appendChild(card);
    });
}

// Modal
function abrirModalCupom(cupom) {
    modalBody.innerHTML = `
        <h2>${cupom.loja}</h2>
        <p>${cupom.detalhes || cupom.descricao || ''}</p>
        <div class="modal-codigo">${cupom.codigo}</div>
        <div style="display:flex; gap:10px; justify-content:center;">
            <button class="btn-copiar" onclick="copiarCodigo('${cupom.codigo}', this)">Copiar</button>
            <a href="${cupom.link}" target="_blank" class="btn-usar">Visitar Loja</a>
        </div>
        ${gerarValidadeHTML(cupom.validade)}
    `;
    modalOverlay.classList.add('active');
}
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

// Partículas do destaque (mantido)
function iniciarParticulasDestaque() {
    const canvas = document.getElementById('particulasDestaqueCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let largura = window.innerWidth;
    let altura = window.innerHeight;

    function redimensionar() {
        largura = window.innerWidth;
        altura = window.innerHeight;
        canvas.width = largura;
        canvas.height = altura;
    }
    window.addEventListener('resize', redimensionar);
    redimensionar();

    const particulas = [];
    const cores = ['#D4AF37', '#FFB6C1', '#E75480', '#FF8C00', '#FFFFFF'];
    let ultimoTempo = 0;

    function obterRectDestaque() {
        const el = document.querySelector('.cupom-card.destaque');
        if (!el) return null;
        return el.getBoundingClientRect();
    }

    function criarParticula(rect) {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        particulas.push({
            x, y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2 - 0.5,
            raio: Math.random() * 4 + 1,
            cor: cores[Math.floor(Math.random() * cores.length)],
            vida: 1,
            decaimento: Math.random() * 0.02 + 0.01
        });
    }

    function animar() {
        ctx.clearRect(0, 0, largura, altura);
        const rect = obterRectDestaque();
        const agora = Date.now();
        if (rect && agora - ultimoTempo > 200) {
            ultimoTempo = agora;
            const quantidade = Math.floor(Math.random() * 4) + 2;
            for (let i = 0; i < quantidade; i++) criarParticula(rect);
        }
        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.02;
            p.vida -= p.decaimento;
            p.raio *= 0.98;
            if (p.vida <= 0 || p.raio < 0.1 || p.y < -50 || p.x < 0 || p.x > largura) {
                particulas.splice(i, 1);
                continue;
            }
            ctx.globalAlpha = p.vida;
            ctx.fillStyle = p.cor;
            ctx.shadowColor = p.cor;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        requestAnimationFrame(animar);
    }
    animar();
}

// Inicialização
gerarCardsCupons();
iniciarParticulasDestaque();