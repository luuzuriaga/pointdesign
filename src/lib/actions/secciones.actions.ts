"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function getSeccion(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('secciones')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching section ${id}:`, error);
    return null;
  }
  return data;
}

export async function updateSeccion(id: string, contenido: any) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from('secciones')
    .update({ 
      contenido,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) throw error;

  revalidatePath('/');
  revalidatePath('/admin/dashboard');
  return { success: true };
}
