const target = document.getElementById('target');
const gun = document.getElementById('gun');
const scoreDisplay = document.getElementById('score');
const shotSound = document.getElementById('shotSound');
const hitSound1 = document.getElementById('hitSound1');
const hitSound2 = document.getElementById('hitSound2');

let score = 0;
let lastSound = 1;
let originalTargetSrc = target.src; // Salva imagem original do alvo

function moveTarget() {
  const gameArea = document.getElementById('gameArea');
  const maxX = window.innerWidth - target.clientWidth;
  const maxY = window.innerHeight - target.clientHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  target.style.left = randomX + 'px';
  target.style.top = randomY + 'px';
}

// Quando clicar no alvo
target.addEventListener('click', (e) => {
  e.stopPropagation();
  
  // Toca o som de tiro
  shotSound.currentTime = 0;
  shotSound.play();
  
  score++;
  scoreDisplay.textContent = "Pontuação: " + score;

  // Alternar entre sons de acerto
  if (lastSound === 1) {
    hitSound1.currentTime = 0;
    hitSound1.play();
    lastSound = 2;
  } else {
    hitSound2.currentTime = 0;
    hitSound2.play();
    lastSound = 1;
  }

  // Efeito de explosão
  target.src = 'images/explosion.gif'; // troca pela imagem de explosão
  setTimeout(() => {
    target.src = originalTargetSrc; // volta o alvo
    moveTarget();
  }, 500);
});

// Quando clicar em qualquer lugar (tiro)
document.addEventListener('click', (e) => {
  shotSound.currentTime = 0;
  shotSound.play();
});

// Atualiza posição da arma com o mouse
document.addEventListener('mousemove', (e) => {
  gun.style.left = e.clientX + 'px';
  gun.style.top = e.clientY + 'px';
});

setInterval(moveTarget, 1000);
moveTarget();
