const fileToRoute = {
  'index.html': '/welcome',
  'about.html': '/whoIam',
  'skills.html': '/whatCanIdo',
  'projects.html': '/whatIveDone'
};

const routeToFile = {
  '/welcome': 'index.html',
  '/whoIam': 'about.html',
  '/whatCanIdo': 'skills.html',
  '/whatIveDone': 'projects.html'
};

function handleRouting(href, pushHistory = true) {
  let targetFile = href;
  let displayRoute = href;
  
  if (fileToRoute[href]) {
    targetFile = href;
    displayRoute = fileToRoute[href];
  }
  else if (routeToFile[href]) {
    targetFile = routeToFile[href];
    displayRoute = href;
  }
  
  if (targetFile) {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (currentFile === targetFile) {
      if (pushHistory && displayRoute && window.location.pathname !== displayRoute) {
        window.history.replaceState({ file: targetFile }, '', displayRoute);
      }
      return;
    }
    
    if (pushHistory && displayRoute) {
      window.history.pushState({ file: targetFile }, '', displayRoute);
    }

    window.location.href = targetFile;
  }
}

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.file) {
    window.location.href = e.state.file;
  }
});

function highlightCurrentPageLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-item a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPath || href === currentPath + '/') {
      link.classList.add('active');
    }
  });
}

function initializeRouting() {
  const navLinks = document.querySelectorAll('.nav-item a, .action-link, .cta-button');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('mailto:') && !href.startsWith('http') && !href.startsWith('/')) {
        e.preventDefault();
        handleRouting(href);
      }
    });
  });
  
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const displayRoute = fileToRoute[currentFile];
  if (displayRoute) {
    window.history.replaceState({ file: currentFile }, '', displayRoute);
  }
  
  highlightCurrentPageLink();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeRouting();
  initializeSkillBars();
  initCircuitCanvas();
});

function initializeSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    const skillLevel = item.getAttribute('data-skill-level');
    const progressBar = item.querySelector('.skill-progress');
    if (progressBar && skillLevel) {
      progressBar.style.width = skillLevel + '%';
    }
  });
}

function initCircuitCanvas() {
  const body = document.body;
  if (!body.classList.contains('circuit-alt')) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'circuit-canvas';
  body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const glowCanvas = document.createElement('canvas');
  const glowCtx = glowCanvas.getContext('2d');
  const particles = [];
  const particleCount = 640;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let palette = [];
  const mouse = { x: width / 2, y: height / 2, active: false };
  let allowInteraction = true;
  const influenceRadius = 32;
  const alphaBase = 0.65;
  const alphaAmp = 0.28;
  const drag = 0.96;

  const resize = () => {
    setHeaderOffset();
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    glowCanvas.width = width * dpr;
    glowCanvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    glowCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    allowInteraction = width > 768;
    if (!allowInteraction) {
      mouse.active = false;
    }
  };

  const refreshPalette = () => {
    const styles = getComputedStyle(document.documentElement);
    palette = [
      styles.getPropertyValue('--overlay-1').trim(),
      styles.getPropertyValue('--overlay-2').trim(),
      styles.getPropertyValue('--overlay-3').trim(),
      styles.getPropertyValue('--overlay-4').trim(),
    ].filter(Boolean);
  };

  const makeParticle = () => {
    const depth = 0.4 + Math.random() * 0.8;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2.6 + Math.random() * 3.6 * depth,
      vx: (Math.random() - 0.5) * 0.18 * depth,
      vy: (Math.random() - 0.2) * 0.20 * depth,
      drift: Math.random() * Math.PI * 2,
      pulse: Math.random() * Math.PI * 2,
      flickerPhase: Math.random() * Math.PI * 2,
      flickerSpeed: 0.0012 + Math.random() * 0.0012,
      depth,
      color: palette[Math.floor(Math.random() * palette.length)] || 'rgba(255,255,255,0.3)',
    };
  };

  const repaintColors = () => {
    refreshPalette();
    particles.forEach(p => {
      p.color = palette[Math.floor(Math.random() * palette.length)] || p.color;
    });
  };

  const wrap = (p) => {
    const margin = 12;
    if (p.x < -margin) p.x = width + margin;
    if (p.x > width + margin) p.x = -margin;
    if (p.y < -margin) p.y = height + margin;
    if (p.y > height + margin) p.y = -margin;
  };

  const tick = () => {
    const now = performance.now();
    glowCtx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy + Math.sin(p.drift) * 0.35 * p.depth;
      p.drift += 0.0065;
      p.pulse += 0.013;
      wrap(p);

      let hoverDist = Infinity;
      let dx = 0;
      let dy = 0;

      if (allowInteraction && mouse.active) {
        dx = mouse.x - p.x;
        dy = mouse.y - p.y;
        hoverDist = Math.hypot(dx, dy);
        if (hoverDist < influenceRadius && hoverDist > 0.0001) {
          const pull = (influenceRadius - hoverDist) / influenceRadius;
          const kick = pull * 1.55 * p.depth;
          p.vx += (dx / hoverDist) * kick;
          p.vy += (dy / hoverDist) * kick;
        }
      }

      p.vx *= drag;
      p.vy *= drag;

      let alpha = Math.min(1, alphaBase + alphaAmp * Math.sin(p.pulse));

      if (hoverDist < influenceRadius && hoverDist > 0.0001) {
        const proximity = 1 - hoverDist / influenceRadius;
        const flicker = 0.7 + 0.7 * Math.sin(now * p.flickerSpeed + p.flickerPhase);
        alpha = Math.min(1, (alphaBase + alphaAmp * Math.sin(p.pulse)) + flicker * proximity * 0.95);
      }

      glowCtx.globalAlpha = alpha;
      glowCtx.fillStyle = p.color;
      glowCtx.fillRect(p.x, p.y, p.size, p.size);
    });
    glowCtx.globalAlpha = 1;

    ctx.clearRect(0, 0, width, height);
    ctx.filter = 'blur(6px)';
    ctx.globalAlpha = 0.85;
    ctx.drawImage(glowCanvas, 0, 0);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
    ctx.drawImage(glowCanvas, 0, 0);
    requestAnimationFrame(tick);
  };

  resize();
  refreshPalette();
  for (let i = 0; i < particleCount; i++) {
    particles.push(makeParticle());
  }

  window.addEventListener('resize', () => {
    resize();
    particles.splice(0, particles.length);
    for (let i = 0; i < particleCount; i++) {
      particles.push(makeParticle());
    }
    repaintColors();
  });

  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const topEl = document.elementFromPoint(e.clientX, e.clientY);
    const allowZones = '.hero, .intro, .banner, .page-title, footer, .projects-grid';
    const blockZones = 'header, nav, .about-content, .timeline, .skills-container, .skills-category, .certifications, .project-card, .featured-item, .section-featured, .content-box, .card, .card-body, .card-header, .card-footer';

    const inAllowZone = topEl && (topEl === document.body || topEl === document.documentElement || topEl.closest(allowZones));
    const inBlockZone = topEl && topEl.closest(blockZones);

    mouse.active = allowInteraction && (inAllowZone || !inBlockZone);
  });

  const themeObserver = new MutationObserver(repaintColors);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  tick();
}

document.addEventListener('DOMContentLoaded', initializeSkillBars);

const header = document.querySelector('header');

const setHeaderOffset = () => {
  if (!header) return;
  const h = header.getBoundingClientRect().height || 0;
  document.documentElement.style.setProperty('--header-offset', `${h}px`);
};

const SCROLL_BREAKPOINTS = {
  SHRINK: 100,
  EXPAND: 80
};

let isHeaderShrunken = false;
let isScrollCheckScheduled = false;

function checkHeaderShrinkState() {
  const scrollY = window.scrollY;
  
  if (!isHeaderShrunken && scrollY > SCROLL_BREAKPOINTS.SHRINK) {
    header.classList.add('shrink');
    setHeaderOffset();
    isHeaderShrunken = true;
  } else if (isHeaderShrunken && scrollY < SCROLL_BREAKPOINTS.EXPAND) {
    header.classList.remove('shrink');
    setHeaderOffset();
    isHeaderShrunken = false;
  }
  
  isScrollCheckScheduled = false;
}

window.addEventListener('scroll', () => {
  if (!isScrollCheckScheduled) {
    isScrollCheckScheduled = true;
    requestAnimationFrame(checkHeaderShrinkState);
  }
}, { passive: true });

function initScrollIndicator() {
  const canvas = document.createElement('canvas');
  canvas.id = 'scroll-indicator-canvas';
  canvas.style.position = 'fixed';
  canvas.style.bottom = '5px';
  canvas.style.left = '20px';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const lineCount = 64;
  const lineHeights = [];

  for (let i = 0; i < lineCount; i++) {
    lineHeights[i] = 0.3 + Math.random() * 0.7;
  }

  function setCanvasSize() {
    canvas.width = 150;
    canvas.height = 150;
  }

  function drawScrollIndicator() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 55;

    const computedStyle = getComputedStyle(document.documentElement);
    const accentColor = computedStyle.getPropertyValue('--accent-blue').trim();

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '138, 43, 226';
    };
    
    const rgbColor = hexToRgb(accentColor);
    
    const logProgress = Math.log(1 + scrollProgress * (Math.E - 1)) / Math.log(Math.E);
    const lineOpacity = 0.2 + logProgress * 0.65;

    ctx.strokeStyle = `rgba(${rgbColor}, ${lineOpacity})`;
    ctx.lineWidth = 2;

    const arcProgress = scrollProgress * Math.PI * 2;

    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const baseHeight = lineHeights[i];
      
      let angleOffset = angle - (Math.PI / 2);
      if (angleOffset < 0) angleOffset += Math.PI * 2;

      if (angleOffset <= arcProgress) {
        const innerRadius = 30;
        const lineExtension = innerRadius + (radius - innerRadius) * baseHeight;

        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle) * innerRadius,
          centerY + Math.sin(angle) * innerRadius
        );
        ctx.lineTo(
          centerX + Math.cos(angle) * lineExtension,
          centerY + Math.sin(angle) * lineExtension
        );
        ctx.stroke();
      }
    }
  }

  function animate() {
    drawScrollIndicator();
    requestAnimationFrame(animate);
  }

  setCanvasSize();
  animate();

  window.addEventListener('resize', setCanvasSize);
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollIndicator();
  setHeaderOffset();
});

const nav = document.querySelector('nav');
let hamburger = null;
let isMenuOpen = false;

const updateNavPosition = () => {
  if (!isMenuOpen || !nav) return;
  const headerEl = document.querySelector('header');
  const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 60;
  nav.style.top = `${headerHeight}px`;
};

const toggleMenu = () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    hamburger.classList.add('active');
    nav.classList.add('active');
    nav.style.position = 'fixed';
    updateNavPosition();
    nav.style.right = '0';
    nav.style.left = 'auto';
    nav.style.zIndex = '10001';
    const header = document.querySelector('header');
    header && header.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
  } else {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    nav.style.position = '';
    nav.style.top = '';
    nav.style.right = '';
    nav.style.left = '';
    nav.style.zIndex = '';
    const header = document.querySelector('header');
    header && header.classList.remove('nav-open');
    document.body.style.overflow = '';
  }
};

const createHamburger = () => {
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    header.appendChild(hamburger);
    hamburger.addEventListener('click', toggleMenu);
  }
};

const removeHamburger = () => {
  if (hamburger) {
    if (isMenuOpen) {
      toggleMenu();
    }
    hamburger.remove();
    hamburger = null;
  }
};

const handleHamburgerVisibility = () => {
  if (window.innerWidth <= 768) {
    createHamburger();
  } else {
    removeHamburger();
  }
};

handleHamburgerVisibility();

window.addEventListener('resize', () => {
  handleHamburgerVisibility();
  updateNavPosition();
});

window.addEventListener('scroll', () => {
  updateNavPosition();
}, { passive: true });

const navItems = document.querySelectorAll('.nav-item a');
navItems.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768 && isMenuOpen) {
      toggleMenu();
    }
  });
});

const themeContainer = document.createElement('div');
themeContainer.className = 'theme-selector-container';

const toggleBtn = document.createElement('button');
toggleBtn.className = 'theme-toggle';
toggleBtn.id = 'theme-center-btn';
themeContainer.appendChild(toggleBtn);

const themes = [
  { name: 'dark', label: 'D', color: '#050210' },
  { name: 'light', label: 'L', color: '#020202' },
  { name: 'green', label: 'G', color: '#010502' }
];

const themeOptions = document.createElement('div');
themeOptions.className = 'theme-options';

themes.forEach((theme, index) => {
  const square = document.createElement('button');
  square.className = `theme-square theme-${theme.name}`;
  square.id = `theme-${theme.name}`;
  square.setAttribute('data-theme', theme.name);
  square.title = theme.name.charAt(0).toUpperCase() + theme.name.slice(1);
  themeOptions.appendChild(square);
});

themeContainer.appendChild(themeOptions);
document.body.appendChild(themeContainer);

let currentThemeIndex = 0;

const savedTheme = localStorage.getItem('theme') || 'dark';
currentThemeIndex = themes.findIndex(t => t.name === savedTheme);
if (currentThemeIndex === -1) currentThemeIndex = 0;

if (savedTheme !== 'dark') {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

toggleBtn.addEventListener('click', () => {
  themeOptions.classList.toggle('active');
});

document.querySelectorAll('.theme-square').forEach(square => {
  square.addEventListener('click', function() {
    const newTheme = this.getAttribute('data-theme');
    currentThemeIndex = themes.findIndex(t => t.name === newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    
    localStorage.setItem('theme', newTheme);
    
    setTimeout(() => {
      themeOptions.classList.remove('active');
    }, 100);
  });
});

function animateLogo(logoElement) {
  const targetText = 'JESSE';
  const length = targetText.length;
  const randomLetters = '日月火水木金人口目心山川田中大小本語電時αβγδελμπσωΑΒΔΘΛΞΠΣΦΩ■□◆◇●○▣▧◉◈';

  let index = 0;

  function animateCharacter() {
    if (index < length) {
      let iterations = 8;
      let currentIteration = 0;

      const interval = setInterval(() => {
        const randomChar = randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
        logoElement.textContent = logoElement.textContent.substring(0, index) + randomChar + logoElement.textContent.substring(index + 1);
        currentIteration++;

        if (currentIteration >= iterations) {
          clearInterval(interval);
          logoElement.textContent = logoElement.textContent.substring(0, index) + targetText.charAt(index) + logoElement.textContent.substring(index + 1);
          index++;
          setTimeout(animateCharacter, 100);
        }
      }, 120);
    }
  }

  animateCharacter();
}

const logoElement = document.querySelector('.logo');
if (logoElement) {
  animateLogo(logoElement);
}
