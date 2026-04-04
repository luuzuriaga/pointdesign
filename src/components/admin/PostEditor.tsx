"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PostEditor.module.css';
import Button from '../ui/Button';
import { savePost } from '@/lib/actions/blog.actions';

interface PostEditorProps {
  post?: any;
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [titulo, setTitulo] = useState(post?.titulo || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [imagenUrl, setImagenUrl] = useState(post?.imagen_url || '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!post?.slug);

  // Helper to slugify text
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w-]+/g, '')  // Remove all non-word chars
      .replace(/--+/g, '-');    // Replace multiple - with single -
  };

  // Auto-generate slug when title changes
  useEffect(() => {
    if (!isSlugManuallyEdited && !post?.id) {
      setSlug(slugify(titulo));
    }
  }, [titulo, isSlugManuallyEdited, post?.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');

    const formData = new FormData(e.currentTarget);
    if (post?.id) {
      formData.append('id', post.id);
    }

    try {
      const result = await savePost(formData);
      if (result.success) {
        router.push('/admin/blog');
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
          <label className={styles.label}>Título del Artículo</label>
          <input 
            type="text" 
            name="titulo" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={styles.input} 
            placeholder="Ej: El futuro del diseño 3D"
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
            placeholder="ej-futuro-diseno-3d"
            required 
          />
        </div>
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
            placeholder="https://images.unsplash.com/..."
          />
        </div>
        <div className={styles.previewContainer}>
          {imagenUrl ? (
            <div className={styles.imagePreview}>
              <img src={imagenUrl} alt="Preview" />
              <button type="button" className={styles.clearBtn} onClick={() => setImagenUrl('')}>×</button>
            </div>
          ) : (
            <div className={styles.noImage}>Sin imagen</div>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Resumen (Meta descripción)</label>
        <textarea 
          name="resumen" 
          defaultValue={post?.resumen} 
          className={styles.textarea} 
          placeholder="Un breve adelanto de lo que trata el post..."
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
          name="contenido" 
          defaultValue={post?.contenido} 
          className={styles.textarea} 
          placeholder="# Título del post..."
          rows={15}
          style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
      </div>


      <div className={styles.actions}>
        <label className={styles.checkboxLabel}>
          <input 
            type="checkbox" 
            name="publicado" 
            value="true" 
            defaultChecked={post?.publicado} 
          />
          <span className={styles.checkboxCustom}></span>
          Publicado (Visible en el sitio)
        </label>
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
          {loading ? 'Guardando...' : post?.id ? 'Actualizar Artículo' : 'Publicar Artículo'}
        </Button>
      </div>
    </form>
  );
}

