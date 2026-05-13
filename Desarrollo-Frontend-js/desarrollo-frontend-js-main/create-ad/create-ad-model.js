export const createAd = async (adData) => {
  const url = 'http://localhost:8000/api/ads';
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: adData.name,
      precio: Number(adData.price),
      descripcion: adData.description,
      foto: adData.image,
      updatedAt: new Date().toISOString()
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'No se ha podido crear el anuncio');
  }

  return await response.json();
};