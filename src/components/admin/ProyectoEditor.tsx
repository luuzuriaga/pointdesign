"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ProyectoEditor.module.css';
import Button from '../ui/Button';
import { saveProyecto } from '@/lib/actions/proyectos.actions';

interface ProyectoEditorProps {
  proyecto?: any;
}

export default function ProyectoEditor({ proyecto }: ProyectoEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // States for live preview and auto-slug
  const [titulo, setTitulo] = useState(proyecto?.titulo || '');
  const [slug, setSlug] = useState(proyecto?.slug || '');
  const [imagenUrl, setImagenUrl] = useState(proyecto?.imagen_url || '');
  const [galeriaInput, setGaleriaInput] = useState(proyecto?.galeria_urls?.join(', ') || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!proyecto?.slug);

  // Helper to slugify text
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  // Auto-generate slug
  useEffect(() => {
    if (!isSlugManuallyEdited && !proyecto?.id) {
      setSlug(slugify(titulo));
    }
  }, [titulo, isSlugManuallyEdited, proyecto?.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');

    const formData = new FormData(e.currentTarget);
    if (proyecto?.id) {
      formData.append('id', proyecto.id);
    }

    try {
      const result = await saveProyecto(formData);
      if (result.success) {
        router.push('/admin/proyectos');
        router.refresh();
      } else {
        setSubmitError(result.error || 'Ocurrió un error al guardar');
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Error de servidor al intentar guardar');
    } finally {
      setLoading(false);
    }
  };


  const galleryPreviews = galeriaInput.split(',').map((url: string) => url.trim()).filter(Boolean);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {submitError && (
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(255, 71, 87, 0.1)', 
          border: '1px solid rgba(255, 71, 87, 0.2)', 
          borderRadius: '12px', 
          color: '#ff4757',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>⚠️ {submitError}</span>
        </div>
      )}
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Título del Proyecto</label>
          <input 
            type="text" 
            name="titulo" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={styles.input} 
            placeholder="Ej: Rediseño E-commerce"
            required 
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Slug (URL única)</label>
          <input 
            type="text" 
            name="slug" 
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setIsSlugManuallyEdited(true);
            }}
            className={styles.input} 
            placeholder="ej-rediseno-ecommerce"
            required 
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Cliente</label>
          <input 
            type="text" 
            name="cliente" 
            defaultValue={proyecto?.cliente} 
            className={styles.input} 
            placeholder="Nombre de la marca"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Año</label>
          <input 
            type="number" 
            name="anio" 
            defaultValue={proyecto?.anio || new Date().getFullYear()} 
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Descripción Corta (Resumen)</label>
        <textarea 
          name="descripcion" 
          defaultValue={proyecto?.descripcion} 
          className={styles.textarea} 
          placeholder="Breve resumen del proyecto..."
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.8rem' }}>
          <label className={styles.label} style={{ marginBottom: 0 }}>Content (Markdown / Text)</label>
          <div style={{ fontSize: '0.75rem', color: 'rgba(200, 195, 255, 0.4)', background: 'rgba(155, 140, 255, 0.05)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(155, 140, 255, 0.1)' }}>
            Tip: Use `![left](url)` or `![small](url)` to integrate images in text
          </div>
        </div>
        <div style={{ marginBottom: '1rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {['**Bold**', '*Italic*', '# Heading', '![alt](url)'].map(tag => (
            <code key={tag} style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', background: 'rgba(255, 255, 255, 0.03)', padding: '4px', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              {tag}
            </code>
          ))}
        </div>
        <textarea 
          name="descripcion_larga" 
          defaultValue={proyecto?.descripcion_larga} 
          className={styles.textarea} 
          placeholder="Detalles del proceso, retos y solución..."
          rows={12}
          style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>URL Imagen Principal</label>
          <input 
            type="text" 
            name="imagen_url" 
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            className={styles.input} 
            placeholder="https://..."
          />
          {imagenUrl && (
            <div className={styles.mainPreview}>
              <img src={imagenUrl} alt="Preview" />
              <button type="button" className={styles.clearBtn} onClick={() => setImagenUrl('')}>×</button>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Categorías (Separadas por coma)</label>
          <input 
            type="text" 
            name="categorias" 
            defaultValue={proyecto?.categorias?.join(', ')} 
            className={styles.input} 
            placeholder="Web, Branding, UI/UX"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Galería de Imágenes (URLs separadas por coma)</label>
        <input 
          type="text" 
          name="galeria_urls" 
          value={galeriaInput}
          onChange={(e) => setGaleriaInput(e.target.value)}
          className={styles.input} 
          placeholder="url1, url2, url3..."
        />
        {galleryPreviews.length > 0 && (
          <div className={styles.galleryGrid}>
            {galleryPreviews.map((url: string, index: number) => (
              <div key={index} className={styles.galleryItem}>
                <img src={url} alt={`Gallery ${index}`} />
              </div>
            ))}
          </div>
        )}
      </div>


      <div className={styles.actions}>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              name="destacado" 
              value="true" 
              defaultChecked={proyecto?.destacado} 
            />
            <span className={styles.checkboxCustom}></span>
            Proyecto Destacado
          </label>
        </div>

        <div className={styles.formGroup} style={{ width: '120px' }}>
          <label className={styles.label}>Orden</label>
          <input 
            type="number" 
            name="orden" 
            defaultValue={proyecto?.orden || 0} 
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.submitContainer}>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          className={styles.cancelBtn}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading}
        >
          {loading ? 'Guardando...' : proyecto?.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        </Button>
      </div>
    </form>
  );
}

