export const loginUser = async (email, password) => {
  const url = 'http://localhost:8000/auth/login';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email, // Tu servidor espera 'username' aunque el usuario ponga su email
      password: password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    // Si el servidor no manda mensaje, ponemos uno por defecto
    const errorMessage = data.message || 'Error en el login: Usuario o contraseña incorrectos';
    throw new Error(errorMessage);
  }

  // Devolvemos el token para que el controlador lo guarde en localStorage
  return data.accessToken;
}