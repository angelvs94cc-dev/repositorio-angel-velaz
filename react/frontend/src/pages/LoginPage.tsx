import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(false);

    // Guardamos las credenciales de seguridad en el navegador (El Token)
    // Esto le demuestra al AuthGuard que somos usuarios reales
    localStorage.setItem('auth_token', 'simulated-streetwear-token');
    localStorage.setItem('user_email', email);

    // Te redirige triunfante al catálogo de ropa urbana
    navigate('/products');
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '10px' }}>STREETWEAR CLUB</h1>
        <p style={{ color: '#888', marginBottom: '40px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>Panel de Administración</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '5px', color: '#aaa', fontWeight: 'bold' }}>Email de Usuario</label>
            <input 
              type="email" 
              placeholder="luke@skywalker.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '15px', backgroundColor: '#111', border: '1px solid #333', color: 'white', boxSizing: 'border-box', fontSize: '16px' }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '5px', color: '#aaa', fontWeight: 'bold' }}>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '15px', backgroundColor: '#111', border: '1px solid #333', color: 'white', boxSizing: 'border-box', fontSize: '16px' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: 'black', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase' }}
          >
            {loading ? 'Verificando...' : 'Entrar al Panel'}
          </button>
        </form>
      </div>
    </div>
  );
}