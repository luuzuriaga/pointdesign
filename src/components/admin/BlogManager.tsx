"use client";

import { useState } from 'react';
import Link from 'next/link';
import { togglePostStatus } from '@/lib/actions/blog.actions';
import DeleteButton from '@/components/ui/DeleteButton';
import styles from './BlogManager.module.css';

interface BlogManagerProps {
  initialPosts: any[];
}

export default function BlogManager({ initialPosts }: BlogManagerProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState('all'); // all, published, drafts
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.publicado;
    if (filter === 'drafts') return !post.publicado;
    return true;
  });

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    try {
      await togglePostStatus(id, currentStatus);
      setPosts(prev => prev.map(p => 
        p.id === id ? { ...p, publicado: !currentStatus } : p
      ));
    } catch (error) {
      console.error(error);
      alert('Error al cambiar el estado');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos <span>{posts.length}</span>
        </button>
        <button 
          className={`${styles.tab} ${filter === 'published' ? styles.active : ''}`}
          onClick={() => setFilter('published')}
        >
          Publicados <span>{posts.filter(p => p.publicado).length}</span>
        </button>
        <button 
          className={`${styles.tab} ${filter === 'drafts' ? styles.active : ''}`}
          onClick={() => setFilter('drafts')}
        >
          Borradores <span>{posts.filter(p => !p.publicado).length}</span>
        </button>
      </div>

      <div className={styles.grid}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className={styles.card}>
              <div className={styles.cardHeader}>
                {post.imagen_url ? (
                  <img src={post.imagen_url} alt={post.titulo} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>📝</div>
                )}
                <div className={`${styles.badge} ${post.publicado ? styles.published : styles.draft}`}>
                  {post.publicado ? 'Publicado' : 'Borrador'}
                </div>
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.title}>{post.titulo}</h3>
                <p className={styles.slug}>/{post.slug}</p>
                <p className={styles.date}>{new Date(post.created_at).toLocaleDateString()}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.mainActions}>
                  <Link href={`/admin/blog/${post.id}/editar`} className={styles.editBtn}>
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleToggleStatus(post.id, post.publicado)}
                    disabled={loadingId === post.id}
                    className={styles.statusBtn}
                  >
                    {loadingId === post.id ? '...' : post.publicado ? 'Despublicar' : 'Publicar'}
                  </button>
                </div>
                <div className={styles.dangerActions}>
                  <DeleteButton onDelete={async () => {
                    // Logic for delete is handled by page refresh usually, 
                    // but for SPA feel we could filter state here too.
                    setPosts(prev => prev.filter(p => p.id !== post.id));
                  }} label="×" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            No se encontraron artículos en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
}
