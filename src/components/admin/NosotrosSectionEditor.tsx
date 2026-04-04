"use client";

import { useState } from 'react';
import { updateSeccion } from '@/lib/actions/secciones.actions';
import styles from './HeroSectionEditor.module.css'; // Reusing base styles

interface NosotrosSectionEditorProps {
  initialData: any;
}

export default function NosotrosSectionEditor({ initialData }: NosotrosSectionEditorProps) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData((prev: any) => ({ ...prev, stats: newStats }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await updateSeccion('nosotros', data);
      setMessage('✅ Sección Nosotros actualizada');
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
      <div className={styles.field} style={{ marginBottom: '1.5rem' }}>
        <label>Título de la Sección</label>
        <input name="title" value={data.title} onChange={handleChange} />
      </div>

      <div className={styles.field} style={{ marginBottom: '2rem' }}>
        <label>Descripción</label>
        <textarea name="description" value={data.description} onChange={handleChange} rows={4} />
      </div>

      <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>Estadísticas (Stats)</h3>
      <div className={styles.grid}>
        {data.stats?.map((stat: any, index: number) => (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className={styles.field}>
              <label>Valor (ej: +50)</label>
              <input value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Etiqueta</label>
              <input value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} />
            </div>
          </div>
        ))}
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
