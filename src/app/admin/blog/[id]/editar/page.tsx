import PostEditor from "@/components/admin/PostEditor";
import Link from "next/link";
import { getPostById } from "@/lib/actions/blog.actions";
import { notFound } from "next/navigation";

interface EditarPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarPostPage({ params }: EditarPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <Link 
          href="/admin/blog" 
          style={{ 
            color: 'var(--color-secondary)', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '1rem'
          }}
        >
          ← Volver al blog
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Nunito", sans-serif', color: 'white' }}>
          Editar Artículo
        </h1>
        <p style={{ color: 'rgba(200,195,255,0.6)' }}>ID: {post.id}</p>
      </div>

      <PostEditor post={post} />
    </div>
  );
}
