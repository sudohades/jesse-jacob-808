export function animateLogo() {
  const logoElement = document.querySelector('.logo');
  if (!logoElement) return;

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
