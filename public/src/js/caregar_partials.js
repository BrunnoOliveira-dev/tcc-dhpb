// Função genérica para carregar parciais
async function carregarParcial(url, destino, callback) {
  const response = await fetch(url);
  const data = await response.text();

  const container = document.getElementById(destino);
  if (!container) return;

  // Se tiver template
  if (data.includes('<template')) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;

    const template = tempDiv.querySelector('template');
    if (template) {
      container.appendChild(template.content.cloneNode(true));
    }
  } else {
    container.innerHTML = data;
  }

  // Executa callback opcional
  if (typeof callback === 'function') {
    callback();
  }
}

// Disponibiliza globalmente
window.carregarParcial = carregarParcial;
