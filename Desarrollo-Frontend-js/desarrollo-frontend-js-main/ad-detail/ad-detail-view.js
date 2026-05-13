export const buildAdDetail = (ad) => {
  // 1. Manejo de fecha: si falla updatedAt, usamos la actual para que no explote
  const dateValue = ad.updatedAt ? new Date(ad.updatedAt) : new Date();
  const readableDate = dateValue.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // 2. Control de imagen: igual que en la lista para ser coherentes
  const imageSrc = ad.foto && ad.foto.trim() !== "" 
    ? ad.foto 
    : 'https://via.placeholder.com/400?text=Imagen+no+disponible';

  return `
    <article class="ad-detail-card">
      <div class="ad-detail-image">
        <img src="${imageSrc}" alt="${ad.nombre}" onerror="this.src='https://via.placeholder.com/400?text=Error+al+cargar+imagen'">
      </div>
      
      <div class="ad-detail-info">
        <div class="price-row">
          <h1 class="ad-detail-price">${ad.precio} €</h1>
          <span class="type-badge ${ad.tipo}">${ad.tipo}</span>
        </div>
        
        <h2 class="ad-detail-name">${ad.nombre}</h2>
        <p class="ad-detail-date">Publicado el ${readableDate}</p>
        
        <hr>
        
        <p class="ad-detail-description">${ad.descripcion || 'El vendedor no ha añadido una descripción para este producto.'}</p>
        
        <div class="seller-info">
          <p class="ad-detail-user">Vendedor ID: <strong>${ad.userId}</strong></p>
        </div>
      </div>
    </article>
  `;
}

// Estos se quedan igual, están perfectos
export const buildRemoveAdButton = () => {
  const removeAdButton = document.createElement('button');
  removeAdButton.textContent = 'Eliminar producto';
  removeAdButton.classList.add('delete-button');
  return removeAdButton;
}

export const buildEditAdButton = () => {
  const editAdButton = document.createElement('button');
  editAdButton.textContent = 'Editar producto';
  editAdButton.classList.add('edit-button');
  return editAdButton;
}