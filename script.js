const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = ['#ff4d6d', '#ffd60a', '#4cc9f0', '#80ffdb', '#f72585', '#ffffff'];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.gravity = 0.03;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.012;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 40 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }

  update() {
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw() {
    this.particles.forEach(p => p.draw());
  }

  isDone() {
    return this.particles.length === 0;
  }
}

let fireworks = [];

function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.6;
  fireworks.push(new Firework(x, y));
}

function animate() {
  ctx.fillStyle = 'rgba(11, 12, 30, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach(fw => {
    fw.update();
    fw.draw();
  });

  fireworks = fireworks.filter(fw => !fw.isDone());

  requestAnimationFrame(animate);
}

setInterval(launchFirework, 900);
animate();

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada! Entraremos em contato em breve. 🎆');
    form.reset();
  });
}
