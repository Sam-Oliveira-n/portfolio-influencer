// Os dados agora vêm de dados.js
const metricas = dados.metricas;
const redes = dados.redes;
const parcerias = dados.parcerias;
const depoimentos = dados.depoimentos;

function aplicarMetricas() {
    const numeros = document.querySelectorAll('.stat-number');
    // Agora temos exatamente 2 spans: Seguidores e Engajamento
    if (numeros.length >= 2) {
        numeros[0].textContent = metricas.seguidores;
        numeros[1].textContent = metricas.visualizacoes;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarMetricas();
});

function getCardsPorSlide() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 769) return 2;
    return 1;
}

// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 100));

// Menu mobile
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').classList.add('fa-bars');
        mobileToggle.querySelector('i').classList.remove('fa-xmark');
    });
});

// Active link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) current = section.getAttribute('id');
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
});

// Reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting));
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

// Hero scroll
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
    document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
});

// WhatsApp contato
function enviarContatoWhatsApp() {
    const nome = document.getElementById('nomeContato').value.trim();
    const email = document.getElementById('emailContato').value.trim();
    const instagram = document.getElementById('instagramContato').value.trim();
    const msg = document.getElementById('msgContato').value.trim();
    if (!nome || !email || !msg) {
        alert('Preencha nome, e-mail e mensagem.');
        return;
    }
    const texto = `Olá! Meu nome é ${nome} (${email}${instagram ? ' - @' + instagram : ''}).%0A${msg}`;
    window.open(`https://wa.me/5517991182651?text=${texto}`, '_blank');
}

// =====================
// DADOS
// =====================


// =====================
// MODAL
// =====================
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function fecharModal() {
    modalOverlay.classList.remove('active');
}
modalClose.addEventListener('click', fecharModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) fecharModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modalOverlay.classList.contains('active')) fecharModal(); });

function formatarCampo(valor) {
    if (Array.isArray(valor)) return valor.map(item => `<p>${item}</p>`).join('');
    return `<p>${valor}</p>`;
}

// =====================
// REDES SOCIAIS (gerados)
// =====================
const redesGrid = document.getElementById('redesGrid');
redes.forEach(rede => {
    const card = document.createElement('a');
    card.className = 'rede-card';
    card.href = rede.link;
    card.target = '_blank';
    card.innerHTML = `<i class="${rede.icone}"></i><h3>${rede.nome}</h3><p>${rede.seguidores} seguidores</p>`;
    redesGrid.appendChild(card);
});

// =====================
// FUNÇÃO GENÉRICA DE CARROSSEL
// =====================
function criarCarrossel(containerId, dotsId, itens, montarCard, aoClicar) {
    const container = document.getElementById(containerId);
    const dotsContainer = document.getElementById(dotsId);
    let currentSlide = 0;
    let cardsPorSlide = getCardsPorSlide();

    function criarSlides() {
        container.innerHTML = '';
        dotsContainer.innerHTML = '';
        const totalSlides = Math.ceil(itens.length / cardsPorSlide);
        for (let i = 0; i < totalSlides; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            const inicio = i * cardsPorSlide;
            const fim = Math.min(inicio + cardsPorSlide, itens.length);
            const grupo = itens.slice(inicio, fim);
            grupo.forEach(item => {
                const card = montarCard(item);
                card.addEventListener('click', () => aoClicar(item));
                slide.appendChild(card);
            });
            container.appendChild(slide);
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => mudarSlide(i));
            dotsContainer.appendChild(dot);
        }
        currentSlide = 0;
        container.style.transform = 'translateX(0%)';
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === 0));
    }

    function mudarSlide(index) {
        const totalSlides = Math.ceil(itens.length / cardsPorSlide);
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;
        container.style.transform = `translateX(-${index * 100}%)`;
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    return { criarSlides, mudarSlide, getCurrentSlide: () => currentSlide, setCardsPorSlide: val => cardsPorSlide = val };
}

// ==================== CAMPANHAS ====================
const campanhasGrid = document.getElementById('campanhasGrid');

function renderizarCampanhas() {
    if (!campanhasGrid || !dados.campanhas) return;

    campanhasGrid.innerHTML = dados.campanhas.map(camp => `
        <div class="campanha-card reveal" data-id="${camp.id}">
            <div class="campanha-img-wrapper">
                <img src="${camp.img}" alt="${camp.titulo}" loading="lazy">
                <span class="campanha-badge">${camp.categoria}</span>
            </div>
            <div class="campanha-body">
                <span class="campanha-marca">${camp.marca}</span>
                <h3 class="campanha-titulo">${camp.titulo}</h3>
                <p class="campanha-desc">${camp.descricaoCurta}</p>
                <div class="campanha-resultados">
                    ${camp.resultados.map(r => `
                        <div class="campanha-resultado">
                            <span class="valor">${r.valor}</span>
                            <span class="label">${r.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Clique abre o modal de detalhes
    document.querySelectorAll('.campanha-card').forEach(card => {
        card.addEventListener('click', () => abrirModalCampanha(parseInt(card.dataset.id)));
    });
}

function abrirModalCampanha(id) {
    const camp = dados.campanhas.find(c => c.id === id);
    if (!camp) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="campanha-modal">
            <span class="modal-marca">${camp.marca}</span>
            <h3>${camp.titulo}</h3>
            <p class="campanha-data">${camp.data} • ${camp.categoria}</p>
            <img src="${camp.img}" alt="${camp.titulo}">
            <p>${camp.descricaoLonga}</p>
            <div class="modal-resultados">
                ${camp.resultados.map(r => `
                    <div>
                        <span class="valor">${r.valor}</span>
                        <span class="label">${r.label}</span>
                    </div>
                `).join('')}
            </div>
            ${camp.link ? `<a href="${camp.link}" target="_blank" class="btn btn-primary" style="margin-top:1.5rem;display:inline-block;">Ver mais</a>` : ''}
        </div>
    `;

    document.getElementById('modalOverlay').classList.add('active');
}

// Chama a renderização ao carregar
renderizarCampanhas();
// =====================
// CARROSSEL DE PARCERIAS
// =====================
const carrosselParcerias = criarCarrossel(
    'carouselParcerias',
    'dotsParcerias',
    parcerias,
    (parceria) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${parceria.img}" alt="${parceria.titulo}"><div class="card-body"><h3>${parceria.titulo}</h3><p>${parceria.desc}</p></div>`;
        return card;
    },
    (parceria) => {
        modalBody.innerHTML = `<h2>${parceria.titulo}</h2><p>${parceria.detalhes}</p>`;
        modalOverlay.classList.add('active');
    }
);
document.getElementById('prevParceria').addEventListener('click', () => carrosselParcerias.mudarSlide(carrosselParcerias.getCurrentSlide() - 1));
document.getElementById('nextParceria').addEventListener('click', () => carrosselParcerias.mudarSlide(carrosselParcerias.getCurrentSlide() + 1));

// =====================
// CARROSSEL DE DEPOIMENTOS
// =====================
const carrosselDepoimentos = criarCarrossel(
    'carouselDepoimentos',
    'dotsDepoimentos',
    depoimentos,
    (dep) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div class="card-body"><p style="font-style:italic;">"${dep.texto}"</p><h3>${dep.nome}</h3></div>`;
        return card;
    },
    (dep) => {
        modalBody.innerHTML = `<h2>${dep.nome}</h2><p>${dep.texto}</p>`;
        modalOverlay.classList.add('active');
    }
);
document.getElementById('prevDepoimento').addEventListener('click', () => carrosselDepoimentos.mudarSlide(carrosselDepoimentos.getCurrentSlide() - 1));
document.getElementById('nextDepoimento').addEventListener('click', () => carrosselDepoimentos.mudarSlide(carrosselDepoimentos.getCurrentSlide() + 1));

// =====================
// REDIMENSIONAMENTO
// =====================
window.addEventListener('resize', () => {
    const novaQuantidade = getCardsPorSlide();
    carrosselParcerias.setCardsPorSlide(novaQuantidade);
    carrosselParcerias.criarSlides();
    carrosselDepoimentos.setCardsPorSlide(novaQuantidade);
    carrosselDepoimentos.criarSlides();
});

// =====================
// INICIALIZAÇÃO
// =====================
carrosselParcerias.criarSlides();
carrosselDepoimentos.criarSlides();