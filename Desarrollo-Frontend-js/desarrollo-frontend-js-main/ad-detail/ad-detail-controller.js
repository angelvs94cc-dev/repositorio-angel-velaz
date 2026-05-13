import {
  getLoggedUserInfo,
  getAdById,
  removeAd,
  updateAd
} from "./ad-detail-model.js"; 

import {
  buildRemoveAdButton,
  buildAdDetail,
  buildEditAdButton
} from "./ad-detail-view.js";

/**
 * Controlador principal para la vista de detalle
 */
export const adDetailController = async (adDetailContainer) => {
  // Obtenemos el ID del anuncio de la URL (ej: detalle.html?id=1)
  const adId = new URLSearchParams(window.location.search).get("id");

  if (!adId) {
    window.location.href = "index.html"; 
    return;
  }

  try {
    // 1. Obtenemos los datos del anuncio
    const ad = await getAdById(adId);
    
    // 2. Pintamos el HTML básico del detalle
    adDetailContainer.innerHTML = buildAdDetail(ad);
    
    // 3. Gestionamos si el usuario puede borrar o editar
    await handleUserActions(ad, adDetailContainer);

  } catch (error) {
    alert(error.message);
    window.location.href = "index.html";
  }
};

/**
 * Lógica para el botón de editar
 */
const handleEditAdButton = (ad, container) => {
  const btn = buildEditAdButton();

  btn.addEventListener("click", async () => {
    const updatedName = prompt("Editar nombre del producto", ad.nombre);
    if (!updatedName) return;

    try {
      // Pasamos el ID y el nuevo objeto con los cambios
      await updateAd(ad.id, { nombre: updatedName });
      window.location.reload();
    } catch {
      alert("No se pudo editar el producto");
    }
  });

  container.appendChild(btn);
};

/**
 * Lógica para el botón de eliminar
 */
const handleRemoveAd = (ad, container) => {
  const btn = buildRemoveAdButton();

  btn.addEventListener("click", async () => {
    const ok = confirm("¿Seguro que quieres borrar este anuncio?");
    if (!ok) return;

    try {
      await removeAd(ad.id);
      window.location.href = "index.html";
    } catch {
      alert("Error al eliminar el anuncio");
    }
  });

  container.appendChild(btn);
};

/**
 * Comprueba si el usuario está logueado y si es el dueño del anuncio
 */
const handleUserActions = async (ad, container) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const user = await getLoggedUserInfo();
    
    // Si el ID del usuario logueado coincide con el userId del anuncio
    if (user && user.id === ad.userId) {
      handleEditAdButton(ad, container);
      handleRemoveAd(ad, container);
    }
  } catch (err) {
    console.error("Error al verificar la autoría del anuncio", err);
  }
};