import { login, signup } from '@/lib/actions/auth.actions';

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0e0a24', color: '#fff' }}>
      <form 
        style={{ padding: '2.5rem', background: '#150d3a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', width: '100%', maxWidth: '400px' }}
      >
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontFamily: '"Nunito", sans-serif', fontWeight: 800 }}>Admin Access</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(200, 195, 255, 0.65)' }}>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', outline: 'none' }}
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(200, 195, 255, 0.65)' }}>Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', outline: 'none' }}
          />
        </div>
        <button 
          formAction={login}
          style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #5533ff, #40e0d0)', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, fontFamily: '"DM Sans", sans-serif', marginBottom: '1rem' }}
        >
          Iniciar Sesión
        </button>
        <button 
          formAction={signup}
          style={{ width: '100%', padding: '1rem', background: 'transparent', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
