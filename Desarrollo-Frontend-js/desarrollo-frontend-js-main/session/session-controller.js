import { getLoggedUserInfo } from "./session-model.js";

export const sessionController = async (sessionContainer) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Intentamos obtener la info del usuario para confirmar que el token es válido
      await getLoggedUserInfo();
      
      // Si hay token válido, mostramos opciones de usuario logueado
      sessionContainer.innerHTML = `
        <a href="create-ad.html" class="upload-btn">Subir Anuncio</a>
        <button id="logout-btn" class="delete-button" style="margin-left: 10px;">Cerrar sesión</button>
      `;

      const logoutBtn = sessionContainer.querySelector("#logout-btn");
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
      });

    } catch (error) {
      // Si el token fallara (caducado, etc), limpiamos y mostramos login
      localStorage.removeItem("token");
      renderLoginLinks(sessionContainer);
    }
  } else {
    renderLoginLinks(sessionContainer);
  }
};

// Función auxiliar para no repetir código
const renderLoginLinks = (container) => {
  container.innerHTML = `
    <div class="user-nav">
      <a href="login.html" class="nav-link">Entrar</a>
      <a href="signup.html" class="nav-link">Registro</a>
    </div>
  `;
};