import { getAds } from "./ad-list-model.js";
import { buildAd } from "./ad-list-view.js";

export const adListController = async (adsContainer) => {
  // 1. Lanzamos el evento para que aparezca el Spinner
  adsContainer.dispatchEvent(new CustomEvent("loadAdsStarted"));

  try {
    // 2. Pedimos los anuncios al servidor
    const ads = await getAds();
    
    // 3. Verificamos si ads es un array (por si el servidor devuelve otra cosa)
    if (!ads || ads.length === 0) {
      adsContainer.innerHTML = '<p>No hay anuncios disponibles en este momento.</p>';
    } else {
      // 4. Limpiamos y pintamos
      adsContainer.innerHTML = '';
      ads.forEach(ad => {
        const adElement = buildAd(ad);
        adsContainer.appendChild(adElement);
      });
    }
  } catch (error) {
    // 5. Error para notificaciones
    const errorEvent = new CustomEvent("loadAdsFailed", {
      detail: { 
        message: "Error al cargar los anuncios. ¿Has arrancado el servidor?", 
        type: "error" 
      }
    });
    adsContainer.dispatchEvent(errorEvent);
  } finally {
    // 6. Quitar Spinner
    adsContainer.dispatchEvent(new CustomEvent("loadAdsFinished"));
  }
}