export const buildAdCreationForm = () => {
  return `
    <form class="create-ad-form">
      <div class="field-group">
        <label for="ad-name">¿Qué vendes?</label>
        <input type="text" name="ad-name" id="ad-name" placeholder="Ej. Bicicleta de montaña" required>
      </div>

      <div class="field-group">
        <label for="ad-price">Precio (€)</label>
        <input type="number" name="ad-price" id="ad-price" placeholder="0" required>
      </div>

      <div class="field-group">
        <label for="ad-image">URL de la foto</label>
        <input type="url" name="ad-image" id="ad-image" placeholder="http://imagen.com/foto.jpg">
      </div>

      <div class="field-group">
        <label for="ad-description">Descripción</label>
        <textarea name="ad-description" id="ad-description" rows="4" placeholder="Describe tu producto..." required></textarea>
      </div>

      <button type="submit" class="submit-button">Subir producto</button>
    </form>
  `;
}