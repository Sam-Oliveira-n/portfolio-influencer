// =====================
// MÉTRICAS (edite manualmente)
// =====================
const metricas = {
    seguidores: "9.6k",
    engajamento: "12%"
};

function aplicarMetricas() {
    const numeros = document.querySelectorAll('.stat-number');
    // Agora temos exatamente 2 spans: Seguidores e Engajamento
    if (numeros.length >= 2) {
        numeros[0].textContent = metricas.seguidores;
        numeros[1].textContent = metricas.engajamento;
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
const redes = [
    { nome: "Instagram", icone: "fa-brands fa-instagram", seguidores: "9,6k", link: "https://www.instagram.com/emilylucioo/" },
    // Adicione outras redes quando desejar
];

const parcerias = [
    { titulo: "Marca de Moda", img: "https://via.placeholder.com/400x250", desc: "Campanha de lançamento", detalhes: "Posts + stories com alcance de 500K" },
    { titulo: "Cosméticos", img: "https://via.placeholder.com/400x250", desc: "Linha de skincare", detalhes: "Vídeo review com 200K views" },
    { titulo: "Alimentação Saudável", img: "https://via.placeholder.com/400x250", desc: "Parceria trimestral", detalhes: "Conteúdo mensal + presença em evento" }
];

const depoimentos = [
    { nome: "Marca A", texto: "Profissionalismo e resultado acima do esperado. A influencer engajou muito nosso público." },
    { nome: "Marca B", texto: "Conteúdo autêntico e de alta qualidade. A comunidade dela é muito fiel." },
    { nome: "Marca C", texto: "Foi um prazer trabalhar com ela. Entrega rápida e ótimos números." }
];

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