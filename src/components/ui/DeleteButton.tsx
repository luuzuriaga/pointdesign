"use client";

import { useState } from 'react';
import styles from './DeleteButton.module.css';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  label?: string;
}

export default function DeleteButton({ onDelete, label = "Borrar" }: DeleteButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 3000); // Reset after 3s
      return;
    }

    try {
      setLoading(true);
      await onDelete();
    } catch (error) {
      console.error(error);
      alert('Error al borrar');
    } finally {
      setLoading(false);
      setIsConfirming(false);
    }
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={loading}
      className={`${styles.button} ${isConfirming ? styles.confirming : ''}`}
      type="button"
    >
      {loading ? '...' : isConfirming ? '¿Seguro?' : label}
    </button>
  );
}
