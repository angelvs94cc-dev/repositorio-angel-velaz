import { loginController } from "./login/login-controller.js";
import { notificationsController } from './notifications/notification-controller.js';

document.addEventListener('DOMContentLoaded', () => {
  const notificationsContainer = document.querySelector('.notifications-container');
  const loginForm = document.querySelector('#login-form'); // Usando el ID que pusimos en el HTML

  // 1. Inicializamos notificaciones y capturamos la función de mostrar mensajes
  const { showNotification } = notificationsController(notificationsContainer);

  // 2. Escuchamos eventos personalizados que lance el loginController
  if (loginForm) {
    
    // Si el login es correcto
    loginForm.addEventListener('loginSuccess', () => {
      showNotification('¡Bienvenido de nuevo!', 'success');
      // Redirigimos a la home después de un segundo
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });

    // Si el login falla (contraseña mal, usuario no existe...)
    loginForm.addEventListener('loginError', (event) => {
      showNotification(event.detail.message, event.detail.type);
    });

    // 3. Arrancamos el controlador
    loginController(loginForm);
  }
});