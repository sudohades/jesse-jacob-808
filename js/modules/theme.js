export function initThemeSelector() {
  const themeContainer = document.createElement('div');
  themeContainer.className = 'theme-selector-container';

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.id = 'theme-center-btn';
  themeContainer.appendChild(toggleBtn);

  const themes = [
    { name: 'dark', label: 'D', color: '#050210' },
    { name: 'red', label: 'R', color: '#ff0040' },
    { name: 'green', label: 'G', color: '#010502' }
  ];

  const themeOptions = document.createElement('div');
  themeOptions.className = 'theme-options';

  themes.forEach((theme) => {
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
  let savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') savedTheme = 'red'; // migrate old light slot to red theme
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
      setTimeout(() => { themeOptions.classList.remove('active'); }, 100);
    });
  });
}
