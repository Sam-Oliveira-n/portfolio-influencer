// =====================
// DADOS DOS CUPONS
// =====================

const cupons = [
    {
        loja: "Glam",
        desconto: "25% OFF",
        codigo: "EMILYG10",
        descricao: "Desconto na assinatura e nos produtos de beleza e cuidado pessoal.",
        validade: "",
        link: "https://sua.glam.com.br/promocoes/partner/EMILYG10",
        detalhes: "Assinantes tem 40% de desconto em todos os produtos.",
        destaque: true   // este cupom terá destaque visual
    },
    {
        loja: "Delugui Calçados",
        desconto: "10% OFF",
        codigo: "EMILY",
        descricao: "Desconto em todos os produtos.",
        validade: "",
        link: "https://deluguicalcados.com.br/",
        detalhes: "Use o código ao finalizar a compra para obter 10% de desconto (válido para todos produtos)."
    },
    
];

// =====================
// ELEMENTOS
// =====================
const cuponsGrid = document.getElementById('cuponsGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// =====================
// FUNÇÕES AUXILIARES
// =====================

function validadeExiste(validade) {
    return validade && validade.trim() !== '';
}

function gerarValidadeHTML(validade) {
    return validadeExiste(validade) ? `<p class="cupom-validade">${validade}</p>` : '';
}

// =====================
// FUNÇÃO DE COPIAR
// =====================
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

// =====================
// GERAÇÃO DOS CARDS
// =====================
function gerarCardsCupons() {
    cuponsGrid.innerHTML = '';
    cupons.forEach((cupom) => {
        const card = document.createElement('div');
        card.className = 'cupom-card';

        if (cupom.destaque) {
            card.classList.add('destaque');
        }

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

// =====================
// PARTÍCULAS DO DESTAQUE
// =====================
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
        const rect = el.getBoundingClientRect();
        return rect;
    }

    function criarParticula(rect) {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        particulas.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2 - 0.5, // sobe
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
            for (let i = 0; i < quantidade; i++) {
                criarParticula(rect);
            }
        }

        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.02; // leve gravidade (diminui a subida)
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

// =====================
// MODAL
// =====================
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

// Eventos do modal
modalClose.addEventListener('click', fecharModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) fecharModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) fecharModal();
});

// =====================
// INICIALIZAÇÃO
// =====================
gerarCardsCupons();
iniciarParticulasDestaque();