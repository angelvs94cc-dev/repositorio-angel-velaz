import { loginUser } from "./login-model.js";

export const loginController = (loginForm) => {

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // 1. Recogemos los datos del formulario
    const loginData = new FormData(loginForm);
    const email = loginData.get('email');
    const password = loginData.get('password');
  
    try {
      // 2. Intentamos el login
      const token = await loginUser(email, password);
      
      // 3. Si todo va bien, guardamos el token y mandamos a la home
      localStorage.setItem('token', token);
      window.location.href = 'index.html'; // Es más seguro poner el nombre del archivo
      
    } catch (error) {
      // 4. Si hay error, lanzamos un evento personalizado para tus notificaciones
      const event = new CustomEvent('error-notificacion', {
        detail: {
          message: error.message,
          type: 'error'
        }
      });
      loginForm.dispatchEvent(event);
      
      // O si prefieres un alert rápido para terminar ya:
      // alert(error.message);
    }
  });
}