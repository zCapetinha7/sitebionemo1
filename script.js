// Defina o emoji que deseja usar como rastro
const emoji = '💤'; 

// Função para criar o rastro
function createEmojiTrail(e) {
  const span = document.createElement('span'); // Cria um elemento <span>
  span.textContent = emoji; // Adiciona o emoji
  span.classList.add('emoji'); // Adiciona a classe 'emoji' para estilizar
  document.body.appendChild(span); // Adiciona o span no corpo da página

  // Posiciona o emoji na posição do mouse
  span.style.left = e.pageX + 'px';
  span.style.top = e.pageY + 'px';

  // Remove o emoji após 1 segundo
  setTimeout(() => {
    span.remove();
  }, 1000);
}

// Adiciona o listener para o evento de movimento do mouse
document.addEventListener('mousemove', createEmojiTrail);
