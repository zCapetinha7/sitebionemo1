document.addEventListener('mousemove', function (e) {
  // Criando o elemento span para o emoji
  let emoji = document.createElement('span');
  emoji.innerText = '💸';
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
