console.log('Happy developing ✨');

// File to route mapping
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

// Router function to handle navigation
function handleRouting(href, pushHistory = true) {
  let targetFile = href;
  let displayRoute = href;
  
  // If it's a file name, get the custom route
  if (fileToRoute[href]) {
    targetFile = href;
    displayRoute = fileToRoute[href];
  }
  // If it's a custom route, get the file name
  else if (routeToFile[href]) {
    targetFile = routeToFile[href];
    displayRoute = href;
  }
  
  if (targetFile) {
    // Don't navigate if already on the page
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (currentFile === targetFile) {
      if (pushHistory && displayRoute && window.location.pathname !== displayRoute) {
        window.history.replaceState({ file: targetFile }, '', displayRoute);
      }
      return;
    }
    
    // Push state to history with custom route
    if (pushHistory && displayRoute) {
      window.history.pushState({ file: targetFile }, '', displayRoute);
    }
    
    // Navigate to actual file
    window.location.href = targetFile;
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.file) {
    window.location.href = e.state.file;
  }
});

// Intercept navigation links and handle routing
// Highlight the current page link in navbar
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
      // Do not intercept absolute-path links like "/index.html"; let browser navigate
      if (href && !href.startsWith('mailto:') && !href.startsWith('http') && !href.startsWith('/')) {
        e.preventDefault();
        handleRouting(href);
      }
    });
  });
  
  // Set initial state for current page
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const displayRoute = fileToRoute[currentFile];
  if (displayRoute) {
    window.history.replaceState({ file: currentFile }, '', displayRoute);
  }
  
  // Highlight current page link
  highlightCurrentPageLink();
}

// Initialize routing on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeRouting();
  initializeSkillBars();
  initCircuitCanvas();
});

// Initialize skill bars with data attributes
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

// Canvas-based neon micro-squares background for `body.circuit-alt`
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
  const influenceRadius = 32; // px radius for nearest-particle gravity effect
  const alphaBase = 0.65;
  const alphaAmp = 0.28;
  const drag = 0.96; // increased drag dampening

  const resize = () => {
    setHeaderOffset(); // Call setHeaderOffset on resize to keep CSS var in sync
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
    const depth = 0.4 + Math.random() * 0.8; // shallower to deeper layers
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2.6 + Math.random() * 3.6 * depth,
      vx: (Math.random() - 0.5) * 0.18 * depth,
      vy: (Math.random() - 0.2) * 0.20 * depth,
      drift: Math.random() * Math.PI * 2,
      pulse: Math.random() * Math.PI * 2,
      flickerPhase: Math.random() * Math.PI * 2,
      flickerSpeed: 0.0012 + Math.random() * 0.0012, // slower firefly flicker speed
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

      // Local gravitational nudge near cursor
      if (allowInteraction && mouse.active) {
        dx = mouse.x - p.x;
        dy = mouse.y - p.y;
        hoverDist = Math.hypot(dx, dy);
        if (hoverDist < influenceRadius && hoverDist > 0.0001) {
          const pull = (influenceRadius - hoverDist) / influenceRadius;
          const kick = pull * 1.55 * p.depth; // velocity impulse instead of direct position move
          p.vx += (dx / hoverDist) * kick;
          p.vy += (dy / hoverDist) * kick;
        }
      }

      // Apply drag after kicks to bleed speed gradually
      p.vx *= drag;
      p.vy *= drag;

      let alpha = Math.min(1, alphaBase + alphaAmp * Math.sin(p.pulse));

      // Firefly flicker for particles near the cursor: random brightness over time
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

    // Bloom pass: blur the glow buffer, then draw sharp layer on top
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
    // Re-seed particles on resize to keep distribution uniform
    particles.splice(0, particles.length);
    for (let i = 0; i < particleCount; i++) {
      particles.push(makeParticle());
    }
    repaintColors();
  });

  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // Allow interaction over banners, hero, footer, and between project sections; block over nav and content boxes
    const topEl = document.elementFromPoint(e.clientX, e.clientY);
    const allowZones = '.hero, .intro, .banner, .page-title, footer, .projects-grid';
    const blockZones = 'header, nav, .about-content, .timeline, .skills-container, .skills-category, .certifications, .project-card, .featured-item, .section-featured, .content-box, .card, .card-body, .card-header, .card-footer';

    const inAllowZone = topEl && (topEl === document.body || topEl === document.documentElement || topEl.closest(allowZones));
    const inBlockZone = topEl && topEl.closest(blockZones);

    mouse.active = allowInteraction && (inAllowZone || !inBlockZone);
  });

  // Watch theme changes to reapply palette
  const themeObserver = new MutationObserver(repaintColors);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  tick();
}

// Call on page load
document.addEventListener('DOMContentLoaded', initializeSkillBars);

// Header shrink with scroll breakpoints using requestAnimationFrame debouncing
const header = document.querySelector('header');

const setHeaderOffset = () => {
  if (!header) return;
  const h = header.getBoundingClientRect().height || 0;
  document.documentElement.style.setProperty('--header-offset', `${h}px`);
};

// Define scroll breakpoints for navbar shrink behavior
const SCROLL_BREAKPOINTS = {
  SHRINK: 100,      // Pixel threshold to trigger shrink
  EXPAND: 80        // Pixel threshold to expand (hysteresis to prevent flickering)
};

let isHeaderShrunken = false;
let isScrollCheckScheduled = false;

function checkHeaderShrinkState() {
  const scrollY = window.scrollY;
  
  // Hysteresis-based state machine to prevent flickering
  if (!isHeaderShrunken && scrollY > SCROLL_BREAKPOINTS.SHRINK) {
    // Transition to shrunken state
    header.classList.add('shrink');
    setHeaderOffset();
    isHeaderShrunken = true;
  } else if (isHeaderShrunken && scrollY < SCROLL_BREAKPOINTS.EXPAND) {
    // Transition to expanded state
    header.classList.remove('shrink');
    setHeaderOffset();
    isHeaderShrunken = false;
  }
  
  isScrollCheckScheduled = false;
}

window.addEventListener('scroll', () => {
  // Use RAF to debounce scroll checks - only run once per frame
  if (!isScrollCheckScheduled) {
    isScrollCheckScheduled = true;
    requestAnimationFrame(checkHeaderShrinkState);
  }
}, { passive: true });

// Custom Scroll Indicator with radiating lines and halo
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

  // Initialize random heights for each line with more variation
  for (let i = 0; i < lineCount; i++) {
    lineHeights[i] = 0.3 + Math.random() * 0.7; // Random height between 0.3x and 1.0x radius
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

    // Get theme color from CSS variable and convert hex to RGB
    const computedStyle = getComputedStyle(document.documentElement);
    const accentColor = computedStyle.getPropertyValue('--accent-blue').trim();
    
    // Helper function to convert hex to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '138, 43, 226';
    };
    
    const rgbColor = hexToRgb(accentColor);
    
    // Calculate dynamic opacity with logarithmic progression: 20% at top, 85% at bottom
    // Log curve makes opacity rise more rapidly towards the bottom
    const logProgress = Math.log(1 + scrollProgress * (Math.E - 1)) / Math.log(Math.E);
    const lineOpacity = 0.2 + logProgress * 0.65;
    
    // Draw radiating lines with clockwise arc sweep based on scroll progress
    ctx.strokeStyle = `rgba(${rgbColor}, ${lineOpacity})`;
    ctx.lineWidth = 2;

    const arcProgress = scrollProgress * Math.PI * 2; // Full circle rotation based on scroll

    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const baseHeight = lineHeights[i];
      
      // Calculate if this line should be visible based on clockwise arc sweep
      let angleOffset = angle - (Math.PI / 2); // Start from top
      if (angleOffset < 0) angleOffset += Math.PI * 2;
      
      // Only draw lines within the arc sweep
      if (angleOffset <= arcProgress) {
        const innerRadius = 30; // Transparent zone radius
        // Scale line extension from innerRadius outward based on baseHeight
        const lineExtension = innerRadius + (radius - innerRadius) * baseHeight;

        ctx.beginPath();
        // Start line from 30px out from center (transparent inner zone)
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

  // Redraw on resize
  window.addEventListener('resize', setCanvasSize);
}

// Initialize scroll indicator on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initScrollIndicator();
  setHeaderOffset();
});

// New Hamburger menu functionality
const nav = document.querySelector('nav');
let hamburger = null;
let isMenuOpen = false;

const updateNavPosition = () => {
  if (!isMenuOpen || !nav) return;
  const headerEl = document.querySelector('header');
  const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 60;
  nav.style.top = `${headerHeight}px`;
};

// Function to toggle menu
const toggleMenu = () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    hamburger.classList.add('active');
    nav.classList.add('active');
    // Elevate dropdown outside header to ensure backdrop blur hits page content
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
    // Restore inline styles and header class
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

// Function to create hamburger button
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

// Function to remove hamburger button
const removeHamburger = () => {
  if (hamburger) {
    if (isMenuOpen) {
      toggleMenu();
    }
    hamburger.remove();
    hamburger = null;
  }
};

// Handle hamburger visibility based on window width
const handleHamburgerVisibility = () => {
  if (window.innerWidth <= 768) {
    createHamburger();
  } else {
    removeHamburger();
  }
};

// Initial check
handleHamburgerVisibility();

// Handle window resize
window.addEventListener('resize', () => {
  handleHamburgerVisibility();
  updateNavPosition();
});

// Keep dropdown aligned to header on scroll while open
window.addEventListener('scroll', () => {
  updateNavPosition();
}, { passive: true });

// Close menu when navigation link clicked (on mobile)
const navItems = document.querySelectorAll('.nav-item a');
navItems.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768 && isMenuOpen) {
      toggleMenu();
    }
  });
});

// Create theme selector with animated squares
const themeContainer = document.createElement('div');
themeContainer.className = 'theme-selector-container';

const toggleBtn = document.createElement('button');
toggleBtn.className = 'theme-toggle';
toggleBtn.id = 'theme-center-btn';
themeContainer.appendChild(toggleBtn);

// Theme array with colors
const themes = [
  { name: 'dark', label: 'D', color: '#050210' },
  { name: 'light', label: 'L', color: '#020202' },
  { name: 'green', label: 'G', color: '#010502' }
];

// Create theme selector squares
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

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
currentThemeIndex = themes.findIndex(t => t.name === savedTheme);
if (currentThemeIndex === -1) currentThemeIndex = 0;

if (savedTheme !== 'dark') {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Handle center button click to show/hide squares
toggleBtn.addEventListener('click', () => {
  themeOptions.classList.toggle('active');
});

// Close on any square click
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
    
    // Close the menu after selection
    setTimeout(() => {
      themeOptions.classList.remove('active');
    }, 100);
  });
});

// Animation for logo class
function animateLogo(logoElement) {
  const targetText = 'JESSE';
  const length = targetText.length;
  const randomLetters = '日月火水木金人口目心山川田中大小本語電時αβγδελμπσωΑΒΔΘΛΞΠΣΦΩ■□◆◇●○▣▧◉◈';

  let index = 0;

  function animateCharacter() {
    if (index < length) {
      let iterations = 8; // Number of random characters to show before settling
      let currentIteration = 0;

      const interval = setInterval(() => {
        const randomChar = randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
        logoElement.textContent = logoElement.textContent.substring(0, index) + randomChar + logoElement.textContent.substring(index + 1);
        currentIteration++;

        if (currentIteration >= iterations) {
          clearInterval(interval);
          logoElement.textContent = logoElement.textContent.substring(0, index) + targetText.charAt(index) + logoElement.textContent.substring(index + 1);
          index++;
          setTimeout(animateCharacter, 100); // Proceed to the next character after a delay
        }
      }, 120); // Change random character every 120ms
    }
  }

  animateCharacter(); // Start the animation
}

// Assuming the logo has a class of 'logo'
const logoElement = document.querySelector('.logo');
if (logoElement) {
  animateLogo(logoElement);
}
