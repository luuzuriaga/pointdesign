"use client";

import { useRef } from 'react';
import styles from './Hero.module.css';
import { useHeroScene } from '@/hooks/useHeroScene';

export default function Hero({ data }: { data?: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useHeroScene(canvasRef);

  const content = data || {
    tag: "Agencia Digital",
    title: "Diseño digital que conecta y convierte",
    titleHighlight: "conecta",
    subtitle: "En Point Design creamos experiencias digitales únicas — desde sitios web hasta identidad de marca — que hacen crecer tu negocio.",
    btnPrimaryText: "Ver nuestro trabajo",
    btnOutlineText: "Cotiza tu proyecto"
  };

  const formattedTitle = content.title.replace(
    content.titleHighlight, 
    `<span class="${styles.titleHighlight}">${content.titleHighlight}</span>`
  );

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef} />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={`${styles.content} reveal`}>
          <div className={styles.heroTag}>{content.tag}</div>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: formattedTitle }} />
          <p className={styles.subtitle}>
            {content.subtitle}
          </p>
          <div className={styles.buttons}>
            <a className={styles.btnPrimary} href="#portafolio">{content.btnPrimaryText}</a>
            <a className={styles.btnOutline} href="#contacto">{content.btnOutlineText}</a>
          </div>
        </div>
      </div>
      <div className={styles.heroScroll}>
        <div className={styles.scrollLine}></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
