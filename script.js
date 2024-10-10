document.addEventListener('mousemove', function (e) {
  // Criando o elemento span para o emoji
  let emoji = document.createElement('span');
  emoji.innerText = '🎶';
  emoji.classList.add('emoji');
  
  // Posição do emoji com base no movimento do mouse
  emoji.style.left = e.pageX + 'px';
  emoji.style.top = e.pageY + 'px';

  // Adicionando o emoji ao body
  document.body.appendChild(emoji);

  // Removendo o emoji após 1.5 segundos (tempo da animação)
  setTimeout(function () {
    emoji.remove();
  }, 1500);
});
  // Peixe
const fish = document.querySelector('.fish');

function randomizeMovement() {
    const randomY = Math.random() * window.innerHeight;
    const randomTime = Math.random() * 5000 + 5000; // Entre 5 e 10 segundos

    fish.style.top = randomY + 'px';
    fish.style.animationDuration = randomTime + 'ms';
}

setInterval(randomizeMovement, 8000); // A cada 8 segundos, muda a posição Y
