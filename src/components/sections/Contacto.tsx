"use client";

import styles from './Contacto.module.css';
import Button from '../ui/Button';

import { submitContacto } from '@/lib/actions/contacto.actions';

export default function Contacto() {

  const actionHandler = async (formData: FormData) => {
    const result = await submitContacto(formData);
    if (result.success) {
      alert('Mensaje enviado. Te contactaremos pronto.');
    } else {
      alert(result.error);
    }
  };

  return (
    <section className={`${styles.section} reveal`} id="contacto">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.info}>
            <div className={styles.sectionTag}>Hablemos</div>
            <h2 className={styles.title}>¿Listo para tu próximo proyecto?</h2>
            <p className={styles.subtitle}>
              Cuéntanos tu idea y la hacemos realidad juntos. Respondemos en menos de 24 horas.
            </p>
            
            <div style={{ marginTop: '2.5rem' }}>
              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}>📍</div>
                <div className={styles.contactItemText}>Lima, Perú</div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}>✉️</div>
                <div className={styles.contactItemText}>hola@pointdesign.pe</div>
              </div>
              <a 
                href="https://www.instagram.com/point.design.peru/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.contactItem}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className={styles.contactItemIcon}>📸</div>
                <div className={styles.contactItemText}>@point.design.peru</div>
              </a>
            </div>
          </div>


          <form className={styles.form} action={actionHandler}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" className={styles.input} placeholder="Tu nombre completo" required />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Correo</label>
              <input type="email" id="email" name="email" className={styles.input} placeholder="tu@correo.com" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="servicio">Servicio</label>
              <select id="servicio" name="servicio" className={styles.select} required>
                <option value="">¿Qué necesitas?</option>
                <option value="web">Diseño Web</option>
                <option value="app">Identidad de Marca</option>
                <option value="uiux">Redes Sociales</option>
                <option value="otro">SEO & Performance</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" className={styles.textarea} placeholder="Cuéntanos sobre tu proyecto..." required></textarea>
            </div>

            <Button type="submit" variant="primary" className={styles.submitBtn}>
              Enviar mensaje →
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
