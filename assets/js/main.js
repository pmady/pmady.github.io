// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateGitHubImages(next);
});

function updateGitHubImages(theme) {
  const heatmap = document.getElementById('gh-heatmap');
  const streak = document.getElementById('gh-streak');
  const stats = document.getElementById('gh-stats');
  if (theme === 'light') {
    if (heatmap) heatmap.src = 'https://ghchart.rshah.org/0077cc/pmady';
    if (streak) streak.src = 'https://github-readme-streak-stats.herokuapp.com/?user=pmady&theme=default&hide_border=true&background=ffffff&ring=0077cc&fire=b8860b&currStreakLabel=0077cc';
    if (stats) stats.src = 'https://github-readme-stats.vercel.app/api?username=pmady&show_icons=true&count_private=true&theme=default&hide_border=true&bg_color=ffffff&title_color=0077cc&icon_color=b8860b&text_color=4a4a6a';
  } else {
    if (heatmap) heatmap.src = 'https://ghchart.rshah.org/00d4ff/pmady';
    if (streak) streak.src = 'https://github-readme-streak-stats.herokuapp.com/?user=pmady&theme=github-dark-blue&hide_border=true&background=1a1a2e&ring=00d4ff&fire=ffd700&currStreakLabel=00d4ff';
    if (stats) stats.src = 'https://github-readme-stats.vercel.app/api?username=pmady&show_icons=true&count_private=true&theme=github_dark&hide_border=true&bg_color=1a1a2e&title_color=00d4ff&icon_color=ffd700&text_color=a0a0b8';
  }
}

if (savedTheme === 'light') updateGitHubImages('light');

// ========================================
// Navigation
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ========================================
// Counter Animation
// ========================================
const counters = document.querySelectorAll('.stat-number[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ========================================
// Particles
// ========================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

createParticles();

// ========================================
// Typing Animation
// ========================================
const typedEl = document.getElementById('typed-text');
const titles = [
  'Senior Cloud Platform Engineer',
  'CNCF Golden Kubestronaut',
  'Open Source Contributor',
  'GPU/AI Infrastructure Builder',
  'IEEE Peer Reviewer'
];
let titleIdx = 0;
let charIdx = 0;
let deleting = false;
let typingTimeout;

function typeLoop() {
  const current = titles[titleIdx];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      typingTimeout = setTimeout(typeLoop, 2000);
      return;
    }
    typingTimeout = setTimeout(typeLoop, 60);
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      typingTimeout = setTimeout(typeLoop, 400);
      return;
    }
    typingTimeout = setTimeout(typeLoop, 30);
  }
}

setTimeout(typeLoop, 2500);

// ========================================
// Scroll Progress Bar
// ========================================
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = percent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// Back-to-Top Button
// ========================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================
// Staggered Fade-in Observer
// ========================================
const staggerElements = document.querySelectorAll('.fade-in-stagger');

const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

staggerElements.forEach(el => staggerObserver.observe(el));

// ========================================
// 3D Tilt Effect on Project Cards
// ========================================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.4s ease';
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});
