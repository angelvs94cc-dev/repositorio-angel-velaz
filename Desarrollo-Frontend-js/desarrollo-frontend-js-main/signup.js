import { signupController } from "./signup/signup-controller.js";
import { notificationsController } from "./notifications/notification-controller.js";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Usamos el ID que pusimos en el HTML para ser más precisos
  const signupForm = document.querySelector('#signup-form');
  const notificationsContainer = document.querySelector('.notifications-container');

  // 2. Si no existen los elementos, paramos para evitar errores en consola
  if (!signupForm || !notificationsContainer) return;

  // 3. Inicializamos las notificaciones
  const { showNotification } = notificationsController(notificationsContainer);

  // 4. Escuchamos los eventos de éxito o error
  signupForm.addEventListener('userCreated', (event) => {
    showNotification(event.detail.message, event.detail.type);
    
    // Opcional: Redirigir al login tras 2 segundos si el registro es éxito
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  });

  signupForm.addEventListener('userNotCreated', (event) => {
    showNotification(event.detail.message, event.detail.type);
  });

  // 5. Arrancamos el controlador pasándole el formulario
  signupController(signupForm);
});