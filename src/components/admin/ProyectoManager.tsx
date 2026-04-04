"use client";

import { useState } from 'react';
import Link from 'next/link';
import { toggleProyectoDestacado } from '@/lib/actions/proyectos.actions';
import DeleteButton from '@/components/ui/DeleteButton';
import styles from './ProyectoManager.module.css';

interface ProyectoManagerProps {
  initialProyectos: any[];
}

export default function ProyectoManager({ initialProyectos }: ProyectoManagerProps) {
  const [proyectos, setProyectos] = useState(initialProyectos);
  const [filter, setFilter] = useState('all'); // all, featured, regular
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredProyectos = proyectos.filter(proyecto => {
    if (filter === 'featured') return proyecto.destacado;
    if (filter === 'regular') return !proyecto.destacado;
    return true;
  });

  const handleToggleDestacado = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    try {
      await toggleProyectoDestacado(id, currentStatus);
      setProyectos(prev => prev.map(p => 
        p.id === id ? { ...p, destacado: !currentStatus } : p
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
          Todos <span>{proyectos.length}</span>
        </button>
        <button 
          className={`${styles.tab} ${filter === 'featured' ? styles.active : ''}`}
          onClick={() => setFilter('featured')}
        >
          Destacados <span>{proyectos.filter(p => p.destacado).length}</span>
        </button>
        <button 
          className={`${styles.tab} ${filter === 'regular' ? styles.active : ''}`}
          onClick={() => setFilter('regular')}
        >
          Sencillos <span>{proyectos.filter(p => !p.destacado).length}</span>
        </button>
      </div>

      <div className={styles.grid}>
        {filteredProyectos.length > 0 ? (
          filteredProyectos.map((proyecto) => (
            <div key={proyecto.id} className={styles.card}>
              <div className={styles.cardHeader}>
                {proyecto.imagen_url ? (
                  <img src={proyecto.imagen_url} alt={proyecto.titulo} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>🎨</div>
                )}
                {proyecto.destacado && (
                  <div className={styles.featuredBadge}>
                    ★ Destacado
                  </div>
                )}
              </div>
              
              <div className={styles.cardBody}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 className={styles.title}>{proyecto.titulo}</h3>
                  <span className={styles.year}>{proyecto.anio}</span>
                </div>
                <p className={styles.client}>{proyecto.cliente}</p>
                <div className={styles.categories}>
                  {proyecto.categorias?.slice(0, 3).map((cat: string) => (
                    <span key={cat} className={styles.catTag}>{cat}</span>
                  ))}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.mainActions}>
                  <Link href={`/admin/proyectos/${proyecto.id}/editar`} className={styles.editBtn}>
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleToggleDestacado(proyecto.id, proyecto.destacado)}
                    disabled={loadingId === proyecto.id}
                    className={styles.statusBtn}
                  >
                    {loadingId === proyecto.id ? '...' : proyecto.destacado ? 'Quitar Destacado' : 'Destacar'}
                  </button>
                </div>
                <div className={styles.dangerActions}>
                  <DeleteButton onDelete={async () => {
                    setProyectos(prev => prev.filter(p => p.id !== proyecto.id));
                  }} label="×" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            No se encontraron proyectos en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
}
