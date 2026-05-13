import { adDetailController } from "./ad-detail/ad-detail-controller.js";
import { notificationsController } from "./notifications/notification-controller.js";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Seleccionamos los contenedores usando los IDs de tu HTML
  const adDetailContainer = document.querySelector('#ad-detail-container');
  const notificationsContainer = document.querySelector('#notifications');

  // 2. Inicializamos el controlador de notificaciones
  // Esto permite que el sistema nos avise si algo falla
  const { showNotification } = notificationsController(notificationsContainer);

  // 3. Capturamos la ID del anuncio desde la barra de direcciones (URL)
  // Si la URL es ad-detail.html?id=1, adId valdrá "1"
  const params = new URLSearchParams(window.location.search);
  const adId = params.get('id');

  // 4. Verificación de seguridad: si no hay ID, volvemos al inicio
  if (!adId) {
    showNotification("No se ha proporcionado un ID de producto válido", "error");
    setTimeout(() => { 
        window.location.href = 'index.html'; 
    }, 2000);
    return;
  }

  // 5. Arrancamos el controlador principal
  // Le pasamos DONDE pintar (container) y QUÉ anuncio buscar (adId)
  adDetailController(adDetailContainer, adId);
});