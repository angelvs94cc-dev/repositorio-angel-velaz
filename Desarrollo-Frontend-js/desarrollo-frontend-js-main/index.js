import { createAdController } from "./create-ad/create-ad-controller.js";
import { notificationsController } from "./notifications/notification-controller.js";
import { sessionController } from "./session/session-controller.js";
import { spinnerController } from "./spinner/spinner-controller.js";
import { adListController } from "./ad-list/ad-list-controller.js";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Selectores de los contenedores
  const adsContainer = document.querySelector('.ads-container');
  const spinnerContainer = document.querySelector('.spinner-container');
  const notificationsContainer = document.querySelector('.notifications-container');
  const createAdContainer = document.querySelector('.create-ad-container');
  const sessionContainer = document.querySelector('.session-container');

  // 2. Inicialización de Notificaciones (Fundamental que sea lo primero)
  const { showNotification } = notificationsController(notificationsContainer);

  // 3. Inicialización del Spinner (Solo si existe el contenedor)
  if (spinnerContainer && adsContainer) {
    const { showSpinner, hideSpinner } = spinnerController(spinnerContainer);
    
    // Escuchamos los eventos que lanza el adListController
    adsContainer.addEventListener("loadAdsStarted", showSpinner);
    adsContainer.addEventListener("loadAdsFinished", hideSpinner);
  }

  // 4. Manejo de errores de carga
  if (adsContainer) {
    adsContainer.addEventListener("loadAdsFailed", (event) => {
      showNotification(event.detail.message, event.detail.type);
    });

    // 5. Refresco de la lista tras crear un anuncio
    if (createAdContainer) {
      createAdContainer.addEventListener('adCreated', () => {
        adListController(adsContainer);
      });
    }

    // Arrancamos la lista de anuncios
    adListController(adsContainer);
  }

  // 6. Arrancamos controladores de sesión y creación
  if (sessionContainer) {
    sessionController(sessionContainer);
  }
  
  if (createAdContainer) {
    createAdController(createAdContainer);
  }
});