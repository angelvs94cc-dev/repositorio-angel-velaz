import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  type: 'style' | 'snkrs';
  photo?: string;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        const localSaved = sessionStorage.getItem('local_products');
        let localList: Product[] = [];
        if (localSaved) {
          localList = JSON.parse(localSaved);
        }

        const foundLocal = localList.find(p => p.id === Number(id));

        if (foundLocal) {
          setProduct(foundLocal);
        } else if (id === '1') {
          setProduct({ id: 1, name: 'Sudadera Oversize Black Gothic', price: 59.99, description: 'Algodón 100% pesado, corte drop shoulder con gráfico gótico en la espalda. Colección invierno.', type: 'style', photo: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80' });
        } else if (id === '2') {
          setProduct({ id: 2, name: 'Camiseta Streetwear Skate Eagle', price: 29.99, description: 'Camiseta blanca de skate con logo de águila vintage en el pecho. Tallaje americano.', type: 'style', photo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80' });
        } else if (id === '3') {
          setProduct({ id: 3, name: 'Sneakers Retro Street Wave', price: 120.00, description: 'Zapatillas urbanas suela track con detalles reflectantes nocturnos y cámara de aire.', type: 'snkrs', photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' });
        }
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar esta prenda de la tienda?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al borrar en servidor');
      navigate('/products');
    } catch {
      console.log('Borrando en local...');
      const localSaved = sessionStorage.getItem('local_products');
      if (localSaved) {
        const list: Product[] = JSON.parse(localSaved);
        const filtered = list.filter(p => p.id !== Number(id));
        sessionStorage.setItem('local_products', JSON.stringify(filtered));
      }
      navigate('/products');
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando artículo...</div>;
  if (!product) return <div style={{ padding: '20px' }}>Artículo no encontrado.</div>;

  // Elegimos la foto correcta para mostrar
  const imageSrc = product.photo || (product.type === 'style' ? 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80' : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80');

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/products" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>← VOLVER AL CATÁLOGO</Link>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap' }}>
        <div style={{ width: '300px', height: '300px', backgroundColor: '#e9e9e9', overflow: 'hidden', borderRadius: '4px' }}>
          <img 
            src={imageSrc} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        
        <div style={{ flex: 1 }}>
          <span style={{ textTransform: 'uppercase', fontSize: '12px', background: 'black', color: 'white', padding: '4px 8px', fontWeight: 'bold' }}>
            {product.type === 'style' ? 'Ropa' : 'Zapatillas'}
          </span>
          <h2 style={{ fontSize: '32px', margin: '10px 0' }}>{product.name}</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111' }}>{product.price.toFixed(2)} €</p>
          <p style={{ color: '#555', lineHeight: '1.6', marginTop: '20px' }}>{product.description}</p>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <button style={{ padding: '12px 24px', background: 'black', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}>
              COMPRAR AHORA
            </button>
            <button onClick={handleDelete} style={{ padding: '12px 24px', background: '#dc3545', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              🗑️ BORRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}