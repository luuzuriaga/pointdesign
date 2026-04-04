"use server";

import { createClient } from "../supabase/server";

import { revalidatePath } from "next/cache";

export async function getPosts(onlyPublished = true) {
  const supabase = await createClient();
  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (onlyPublished) {
    query = query.eq('publicado', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data;
}

export async function getPostById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

export async function savePost(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get('id') as string;
  const postData = {
    titulo: formData.get('titulo') as string,
    slug: formData.get('slug') as string,
    resumen: formData.get('resumen') as string,
    contenido: formData.get('contenido') as string,
    imagen_url: formData.get('imagen_url') as string,
    publicado: formData.get('publicado') === 'true',
    autor_id: user.id,
    updated_at: new Date().toISOString(),
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('posts').update(postData).eq('id', id));
  } else {
    ({ error } = await supabase.from('posts').insert([postData]));
  }

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'El slug ya existe. Por favor usa un título diferente o edita el slug.' };
    }
    throw error;
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { success: true };
}


export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) throw error;

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { success: true };
}

export async function togglePostStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('posts')
    .update({ publicado: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { success: true };
}

