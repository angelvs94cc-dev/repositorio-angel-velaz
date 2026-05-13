import { createAd } from "./create-ad-model.js";
import { buildAdCreationForm } from "./create-ad-view.js";

export const createAdController = (container) => {
  const token = localStorage.getItem('token');

  if (!token) return;

  container.innerHTML = buildAdCreationForm();

  const form = container.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const adData = {
      name: formData.get('ad-name'),
      price: formData.get('ad-price'),
      description: formData.get('ad-description'),
      image: formData.get('ad-image')
    };

    try {
      await createAd(adData);

      container.dispatchEvent(new CustomEvent('adCreated'));

      form.reset();
    } catch (error) {
      container.dispatchEvent(new CustomEvent('loadAdsFailed', {
        detail: {
          message: error.message,
          type: 'error'
        }
      }));
    }
  });
};