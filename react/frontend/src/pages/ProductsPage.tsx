import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  type: 'style' | 'snkrs';
  photo?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then((res) => res.json())
      .then((data) => {
        // Cargamos la ropa inicial con fotos reales de streetwear
        let baseProducts = (!data || data.length === 0) ? [
          {
            id: 1,
            name: 'Sudadera Oversize Black Gothic',
            price: 59.99,
            description: 'Algodón 100% pesado, corte drop shoulder con gráfico gótico.',
            type: 'style',
            photo: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80' // Sudadera guapa
          },
          {
            id: 2,
            name: 'Camiseta Streetwear Skate Eagle',
            price: 29.99,
            description: 'Camiseta blanca de skate con logo de águila vintage.',
            type: 'style',
            photo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80' // Camiseta Streetwear
          },
          {
            id: 3,
            name: 'Sneakers Retro Street Wave',
            price: 120.00,
            description: 'Zapatillas urbanas suela track con detalles reflectantes.',
            type: 'snkrs',
            photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' // Zapatillas
          }
        ] : data;

        const localSaved = sessionStorage.getItem('local_products');
        if (localSaved) {
          const extra = JSON.parse(localSaved);
          baseProducts = [...baseProducts, ...extra];
        }

        setProducts(baseProducts);
      })
      .catch((err) => {
        console.error('Error al traer productos:', err);
        const localSaved = sessionStorage.getItem('local_products');
        if (localSaved) {
          setProducts(JSON.parse(localSaved));
        }
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid black', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, fontWeight: 900 }}>STREETWEAR CLUB 🛹</h1>
        <Link to="/products/new" style={{ padding: '10px 20px', background: 'black', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          + AÑADIR PRENDA
        </Link>
      </header>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px', width: '300px', border: '1px solid #ccc' }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ccc', background: 'white' }}
        >
          <option value="all">Ver todo</option>
          <option value="style">Ropa</option>
          <option value="snkrs">Zapatillas</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ background: 'white', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Aquí cargamos la imagen real o un placeholder si el producto creado no tiene foto */}
              <div style={{ width: '100%', height: '220px', marginBottom: '15px', overflow: 'hidden', borderRadius: '4px', backgroundColor: '#e9e9e9' }}>
                <img 
                  src={product.photo || (product.type === 'style' ? 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80' : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80')} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{product.description}</p>
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '15px 0' }}>{product.price.toFixed(2)} €</div>
              <Link to={`/products/${product.id}`} style={{ display: 'block', textAlign: 'center', padding: '10px', border: '1px solid black', color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                VER DETALLE
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>No se encontró ningún artículo.</p>
      )}
    </div>
  );
}