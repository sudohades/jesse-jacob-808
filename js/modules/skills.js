export function initializeSkillBars() {
  const skillItems = document.querySelectorAll('.item[data-skill-level]');
  skillItems.forEach(item => {
    const skillLevel = item.getAttribute('data-skill-level');
    const progressBar = item.querySelector('.skill-progress');
    if (progressBar && skillLevel) {
      progressBar.style.width = skillLevel + '%';
    }
  });
}
