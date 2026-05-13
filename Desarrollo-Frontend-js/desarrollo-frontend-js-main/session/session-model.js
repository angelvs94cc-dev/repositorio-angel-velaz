export const getLoggedUserInfo = async () => {
  const url = 'http://localhost:8000/auth/me';
  const token = localStorage.getItem('token');

  // Si ni siquiera hay token, no perdemos el tiempo con el fetch
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Importante: la "B" de Bearer suele ir en mayúscula
      }
    });

    if (!response.ok) {
      throw new Error('Token no válido o sesión caducada');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Error al obtener info del usuario:", error);
    return null; // Devolvemos null para que el controlador sepa que no hay usuario real
  }
}