export const getAds = async () => {
  // Quitamos el expand de primeras para asegurar que carguen los anuncios básicos
  const url = 'http://localhost:8000/api/ads';
  
  try {
    const response = await fetch(url);

    // Si el servidor responde pero con un error (404, 500...)
    if (!response.ok) {
      throw new Error("Error al conectar con el servidor de anuncios");
    }

    const ads = await response.json();
    return ads;

  } catch (error) {
    // Esto captura tanto el error de arriba como si el servidor está apagado
    console.error('Fallo en el fetch:', error);
    throw new Error("No hemos podido recuperar los anuncios. ¿Has arrancado Sparrest?");
  }
}