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

export function highlightCurrentPageLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-item a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPath || href === currentPath + '/') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function handleRouting(href, pushHistory = true) {
  let targetFile = href;
  let displayRoute = href;

  if (fileToRoute[href]) {
    targetFile = href;
    displayRoute = fileToRoute[href];
  } else if (routeToFile[href]) {
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

export function initializeRouting() {
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

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.file) {
    window.location.href = e.state.file;
  }
});
