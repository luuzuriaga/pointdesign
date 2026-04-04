import { logout } from '@/lib/actions/auth.actions';
import { createClient } from '@/lib/supabase/server';
import { getPosts } from '@/lib/actions/blog.actions';
import { getProyectos } from '@/lib/actions/proyectos.actions';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Obtener mensajes de contacto
  const { data: mensajes } = await supabase
    .from('mensajes_contacto')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  // Obtener counts rápidos
  const { count: proyectosCount } = await supabase
    .from('proyectos')
    .select('*', { count: 'exact', head: true });

  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  // Obtener últimos artículos y proyectos
  const posts = await getPosts(false);
  const proyectos = await getProyectos();

  const sinLeer = mensajes?.filter(m => !m.leido).length || 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Nunito", sans-serif', color: 'white', marginBottom: '0.5rem' }}>Bienvenido 👋</h1>
          <p style={{ color: 'rgba(200, 195, 255, 0.6)' }}>Esto es lo que está pasando en Point Design.</p>
        </div>
        <form action={logout}>
          <button 
            type="submit" 
            style={{ padding: '0.8rem 1.5rem', background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', border: '1px solid rgba(255, 77, 79, 0.3)', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            Cerrar Sesión
          </button>
        </form>
      </div>

      {/* Estadísticas Rápidas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #110f28 0%, #1a1645 100%)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Mensajes Sin Leer</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', fontFamily: '"Nunito", sans-serif' }}>{sinLeer}</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #110f28 0%, #1a1645 100%)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <h3 style={{ color: '#9b8cff', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Artículos Publicados</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', fontFamily: '"Nunito", sans-serif' }}>{postsCount || 0}</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #110f28 0%, #1a1645 100%)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <h3 style={{ color: '#ff8cc6', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Proyectos en Portafolio</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', fontFamily: '"Nunito", sans-serif' }}>{proyectosCount || 0}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Sección de Blogs */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 800 }}>Últimos Blogs</h2>
            <Link href="/admin/blog" style={{ color: 'var(--color-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Ver todos →</Link>
          </div>
          <div style={{ background: '#110f28', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            {posts && posts.slice(0, 5).map((post) => (
              <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.titulo}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(200, 195, 255, 0.4)' }}>{new Date(post.created_at).toLocaleDateString()}</div>
                </div>
                <Link 
                  href={`/admin/blog/${post.id}/editar`}
                  style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(64, 224, 208, 0.2)', color: 'var(--color-secondary)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, background: 'rgba(64, 224, 208, 0.05)' }}
                >
                  Editar
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Proyectos */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 800 }}>Últimos Proyectos</h2>
            <Link href="/admin/proyectos" style={{ color: 'var(--color-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Ver todos →</Link>
          </div>
          <div style={{ background: '#110f28', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            {proyectos && proyectos.slice(0, 5).map((p) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.titulo}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(200, 195, 255, 0.4)' }}>{p.cliente} • {p.anio}</div>
                </div>
                <Link 
                  href={`/admin/proyectos/${p.id}/editar`}
                  style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(64, 224, 208, 0.2)', color: 'var(--color-secondary)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, background: 'rgba(64, 224, 208, 0.05)' }}
                >
                  Editar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1.5rem', fontWeight: 800 }}>Bandeja de Entrada</h2>
        <div style={{ background: '#150d3a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          {mensajes && mensajes.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '1.2rem', color: 'rgba(200,195,255,0.6)', fontWeight: 600, fontSize: '0.85rem' }}>Fecha</th>
                  <th style={{ padding: '1.2rem', color: 'rgba(200,195,255,0.6)', fontWeight: 600, fontSize: '0.85rem' }}>Nombre</th>
                  <th style={{ padding: '1.2rem', color: 'rgba(200,195,255,0.6)', fontWeight: 600, fontSize: '0.85rem' }}>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {mensajes.map((msg) => (
                  <tr key={msg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: msg.leido ? 'transparent' : 'rgba(61, 217, 192, 0.05)' }}>
                    <td style={{ padding: '1.2rem', color: 'rgba(200, 195, 255, 0.6)', fontSize: '0.85rem' }}>
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1.2rem', color: 'white' }}>
                      <div style={{ fontWeight: 600 }}>{msg.nombre}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>{msg.email}</div>
                    </td>
                    <td style={{ padding: '1.2rem', color: 'rgba(200,195,255,0.8)', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}>
                      {msg.mensaje}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(200, 195, 255, 0.4)' }}>
              No hay mensajes en tu bandeja de entrada todavía.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

