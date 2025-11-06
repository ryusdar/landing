// Partículas de fondo (estrellas/luces)
const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.7 ? '#FFD700' : '#D72638',
      glow: Math.random() > 0.5
    });
  }
}
createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = p.glow ? 16 : 0;
    ctx.fill();
    ctx.restore();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Temporizador de oferta
function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  function update() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) timer = 0;
  }
  update();
  const interval = setInterval(function () {
    update();
    if (timer <= 0) clearInterval(interval);
  }, 1000);
}
document.addEventListener('DOMContentLoaded', function () {
  const timerDisplay = document.getElementById('timer');
  if (timerDisplay) startTimer(60 * 15, timerDisplay); // 15 minutos
});

// Animación scroll suave para CTA
const ctaBtns = document.querySelectorAll('.cta-btn');
ctaBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });
});

// Formulario de suscripción
const form = document.querySelector('.subscribe-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    form.innerHTML = `<p style='color:#FFD700;font-weight:bold;'>¡Gracias por suscribirte, gamer!</p>`;
  });
}
