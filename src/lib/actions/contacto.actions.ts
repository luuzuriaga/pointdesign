"use server";

import { createClient } from "../supabase/server";

export async function submitContacto(formData: FormData) {
  const supabase = await createClient();
  
  const payload = {
    nombre: formData.get('nombre') as string,
    email: formData.get('email') as string,
    servicio: formData.get('servicio') as string,
    mensaje: formData.get('mensaje') as string,
  };

  const { error } = await supabase
    .from('mensajes_contacto')
    .insert([payload]);

  if (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Hubo un error al enviar el mensaje.' };
  }

  return { success: true };
}
