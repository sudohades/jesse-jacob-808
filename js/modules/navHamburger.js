let hamburger = null;
let isMenuOpen = false;
let backdrop = null;

const updateNavPosition = (nav) => {
  if (!isMenuOpen || !nav) return;
  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 60;
  nav.style.setProperty('--nav-top', `${headerHeight}px`);
};

function openMenu(nav) {
  isMenuOpen = true;
  hamburger.classList.add('active');
  nav.classList.remove('closing');
  nav.classList.add('active');
  const header = document.querySelector('header');
  header && header.classList.add('nav-open');
  updateNavPosition(nav);

  const bd = createBackdrop();
  bd.style.opacity = '1';
  bd.style.pointerEvents = 'auto';
}

function closeMenu(nav) {
  isMenuOpen = false;
  nav.classList.add('closing');
  hamburger.classList.remove('active');
  const header = document.querySelector('header');
  header && header.classList.remove('nav-open');

  if (backdrop) {
    backdrop.style.opacity = '0';
    backdrop.style.pointerEvents = 'none';
  }

  // Wait for the closing transition to finish before removing 'active'
  const onTransitionEnd = () => {
    nav.classList.remove('active');
    nav.classList.remove('closing');
    nav.removeEventListener('transitionend', onTransitionEnd);
  };
  nav.addEventListener('transitionend', onTransitionEnd);
}

function toggleMenu(nav) {
  if (isMenuOpen) {
    closeMenu(nav);
  } else {
    openMenu(nav);
  }
}

function createHamburger(header, nav) {
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
    hamburger.addEventListener('click', () => toggleMenu(nav));
  }
}

function removeHamburger(nav) {
  if (hamburger) {
    if (isMenuOpen) toggleMenu(nav);
    hamburger.remove();
    hamburger = null;
  }
}

export function initHamburger() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  if (!header || !nav) return;

  const handleHamburgerVisibility = () => {
    if (window.innerWidth <= 768) {
      createHamburger(header, nav);
      updateNavPosition(nav);
      nav.classList.add('mobile-nav');
    } else {
      removeHamburger(nav);
      nav.classList.remove('mobile-nav');
    }
  };

  handleHamburgerVisibility();
  window.addEventListener('resize', () => {
    handleHamburgerVisibility();
    updateNavPosition(nav);
  });

  window.addEventListener('scroll', () => {
    updateNavPosition(nav);
  }, { passive: true });

  // On mobile, let link navigation proceed naturally
  document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', (e) => {
      // Let the default navigation proceed
    });
  });
}

function createBackdrop() {
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 10001;
      opacity: 0;
      transition: opacity 0.25s ease;
      pointer-events: none;
    `;
    backdrop.addEventListener('click', (e) => {
      if (isMenuOpen) {
        const nav = document.querySelector('nav');
        if (nav) toggleMenu(nav);
      }
    });
    document.body.appendChild(backdrop);
  }
  return backdrop;
}
