"use client";

import { useState } from 'react';
import { updateSeccion } from '@/lib/actions/secciones.actions';
import styles from './HeroSectionEditor.module.css';

interface HeroSectionEditorProps {
  initialData: any;
}

export default function HeroSectionEditor({ initialData }: HeroSectionEditorProps) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await updateSeccion('hero', data);
      setMessage('✅ Hero actualizado con éxito');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('❌ Error al actualizar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Etiqueta (Tag)</label>
          <input name="tag" value={data.tag} onChange={handleChange} />
        </div>
        
        <div className={styles.field}>
          <label>Título Principal</label>
          <input name="title" value={data.title} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Palabra Resaltada (Highlight)</label>
          <input name="titleHighlight" value={data.titleHighlight} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Subtítulo</label>
          <textarea name="subtitle" value={data.subtitle} onChange={handleChange} rows={3} />
        </div>

        <div className={styles.field}>
          <label>Texto Botón Primario</label>
          <input name="btnPrimaryText" value={data.btnPrimaryText} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Texto Botón Outline</label>
          <input name="btnOutlineText" value={data.btnOutlineText} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.footer}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
        {message && <span className={styles.message}>{message}</span>}
      </div>
    </form>
  );
}
