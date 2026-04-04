import { Database } from './supabase';

export type Post = Database['public']['Tables']['posts']['Row'];
export type Proyecto = Database['public']['Tables']['proyectos']['Row'];
export type MensajeContacto = Database['public']['Tables']['mensajes_contacto']['Row'];
