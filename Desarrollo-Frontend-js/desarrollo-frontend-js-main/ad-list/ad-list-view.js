export const buildAd = (ad) => {
  const adElement = document.createElement('a');
  adElement.classList.add('ad-link');
  adElement.setAttribute('href', `ad-detail.html?id=${ad.id}`);

  // 1. Usamos una imagen local que SEGURO existe o un color de fondo
  const imageSrc = ad.foto && ad.foto.trim() !== "" 
    ? ad.foto 
    : 'https://placehold.co/200x200?text=Sin+Foto'; // Cambiamos de via.placeholder a placehold.co que es más estable

  adElement.innerHTML = `
    <article class="ad-card">
      <div class="ad-image-container">
        <!-- Quitamos el onerror temporalmente para que no haya bucles si falla la red -->
        <img src="${imageSrc}" alt="${ad.nombre}" class="ad-image">
      </div>
      <div class="ad-info">
        <h3 class="ad-price">${ad.precio} €</h3>
        <p class="ad-name">${ad.nombre}</p>
        <p class="ad-type">Estado: <span class="type-tag">${ad.tipo}</span></p>
      </div>
    </article>
  `;

  return adElement;
}