import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('style');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert('Por favor, introduce un precio válido mayor que 0.');
      return;
    }

    try {
      // Intentamos enviarlo al servidor real
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price: numericPrice, description, type }),
      });

      if (!response.ok) {
        throw new Error('Forzando modo local por falta de token');
      }

      navigate('/products');
    } catch (err) {
      // Si el servidor falla por el token, lo guardamos en local temporal
      console.log('Guardando en local para la simulación de la práctica...', err);
      
      const localProduct = {
        id: Math.floor(Math.random() * 1000) + 10,
        name,
        price: numericPrice,
        description,
        type
      };

      const existing = sessionStorage.getItem('local_products');
      const list = existing ? JSON.parse(existing) : [];
      list.push(localProduct);
      sessionStorage.setItem('local_products', JSON.stringify(list));

      // Redirigimos al catálogo directamente
      navigate('/products');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <Link to="/products" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
        ← VOLVER AL CATÁLOGO
      </Link>

      <h2 style={{ marginTop: '20px', fontWeight: 900, fontSize: '28px', borderBottom: '2px solid black', paddingBottom: '10px' }}>
        NUEVA PRENDA / ARTÍCULO 🛹
      </h2>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Artículo:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ej: Sudadera Zip Hoodie Grey"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Precio (€):</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Ej: 45.99"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categoría:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', background: 'white' }}
          >
            <option value="style">Ropa / Apparel</option>
            <option value="snkrs">Zapatillas / Sneakers</option>
          </select>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción de la prenda:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Detalla el material, tipo de corte..."
            rows={4}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', resize: 'vertical', fontFamily: 'sans-serif' }}
          />
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '12px', background: 'black', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          PUBLICAR ARTÍCULO
        </button>
      </form>
    </div>
  );
}