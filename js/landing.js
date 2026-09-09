// =====================
// PARTÍCULAS MÁGICAS SEGUINDO O MOUSE
// =====================
(function() {
    const canvas = document.getElementById('particulasCanvas');
    const ctx = canvas.getContext('2d');
    let largura = window.innerWidth;
    let altura = window.innerHeight;
    const particulas = [];
    const maxParticulas = 80;
    const cores = ['#D4AF37', '#E75480', '#FFB6C1', '#FFFFFF', '#F4A460'];

    // Ajustar tamanho do canvas
    function redimensionar() {
        largura = window.innerWidth;
        altura = window.innerHeight;
        canvas.width = largura;
        canvas.height = altura;
    }
    window.addEventListener('resize', redimensionar);
    redimensionar();

    // Posição do mouse
    let mouseX = -100;
    let mouseY = -100;
    let ultimoTempo = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        criarParticulas(e.clientX, e.clientY);
    });

    // Criar partículas ao redor do mouse
    function criarParticulas(x, y) {
        const agora = Date.now();
        // Limitar a criação para não sobrecarregar
        if (agora - ultimoTempo < 30) return;
        ultimoTempo = agora;

        const quantidade = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < quantidade; i++) {
            if (particulas.length >= maxParticulas) particulas.shift();
            particulas.push({
                x: x,
                y: y,
                velocidadeX: (Math.random() - 0.5) * 3,
                velocidadeY: (Math.random() - 0.5) * 3 - 1, // leve tendência para cima
                raio: Math.random() * 4 + 1,
                cor: cores[Math.floor(Math.random() * cores.length)],
                vida: 1, // opacidade
                decaimento: Math.random() * 0.02 + 0.01
            });
        }
    }

    // Animar partículas
    function animar() {
        ctx.clearRect(0, 0, largura, altura);

        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];
            p.x += p.velocidadeX;
            p.y += p.velocidadeY;
            p.velocidadeY += 0.05; // leve gravidade
            p.vida -= p.decaimento;
            p.raio *= 0.98; // encolher gradualmente

            if (p.vida <= 0 || p.raio < 0.1 || p.x < 0 || p.x > largura || p.y < 0 || p.y > altura) {
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
})();