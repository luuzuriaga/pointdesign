"use server";

import { createClient } from "../supabase/server";

import { revalidatePath } from "next/cache";

export async function getProyectos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .order('orden', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching proyectos:', error);
    return [];
  }
  return data;
}

export async function getProyectoById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function getProyectoBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

export async function saveProyecto(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get('id') as string;
  const proyectoData = {
    titulo: formData.get('titulo') as string,
    slug: formData.get('slug') as string,
    descripcion: formData.get('descripcion') as string,
    descripcion_larga: formData.get('descripcion_larga') as string,
    imagen_url: formData.get('imagen_url') as string,
    galeria_urls: (formData.get('galeria_urls') as string)?.split(',').filter(Boolean) || [],
    categorias: (formData.get('categorias') as string)?.split(',').filter(Boolean) || [],
    cliente: formData.get('cliente') as string,
    anio: parseInt(formData.get('anio') as string) || new Date().getFullYear(),
    destacado: formData.get('destacado') === 'true',
    orden: parseInt(formData.get('orden') as string) || 0,
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('proyectos').update(proyectoData).eq('id', id));
  } else {
    ({ error } = await supabase.from('proyectos').insert([proyectoData]));
  }

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'El slug ya existe. Los proyectos destacados o antiguos pueden estar usando este slug.' };
    }
    throw error;
  }

  revalidatePath('/admin/proyectos');
  revalidatePath('/');
  return { success: true };
}


export async function deleteProyecto(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('proyectos').delete().eq('id', id);

  if (error) throw error;

  revalidatePath('/admin/proyectos');
  revalidatePath('/');
  return { success: true };
}

export async function toggleProyectoDestacado(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('proyectos')
    .update({ destacado: !currentStatus })
    .eq('id', id);

  if (error) throw error;

  revalidatePath('/admin/proyectos');
  revalidatePath('/');
  return { success: true };
}

