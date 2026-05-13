export const getAdById = async (adId) => {
  const url = `http://localhost:8000/api/ads/${adId}?_expand=user`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Este anuncio ya no está disponible');
  }

  return await response.json();
};

export const getLoggedUserInfo = async () => {
  const url = 'http://localhost:8000/auth/me';
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener el usuario');
  }

  return await response.json();
};

export const removeAd = async (adId) => {
  const url = `http://localhost:8000/api/ads/${adId}`;
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar el anuncio');
  }
};

export const updateAd = async (adId, data) => {
  const url = `http://localhost:8000/api/ads/${adId}`;
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el anuncio');
  }

  return await response.json();
};