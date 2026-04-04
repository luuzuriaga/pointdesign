import PostEditor from "@/components/admin/PostEditor";
import Link from "next/link";

export default function NuevoPostPage() {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <Link 
          href="/admin/blog" 
          style={{ 
            color: 'var(--color-secondary)', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '1rem'
          }}
        >
          ← Volver al blog
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Nunito", sans-serif', color: 'white' }}>
          Escribir Nuevo Artículo
        </h1>
      </div>

      <PostEditor />
    </div>
  );
}
