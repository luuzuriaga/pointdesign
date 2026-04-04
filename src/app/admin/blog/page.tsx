import Link from 'next/link';
import { getPosts } from '@/lib/actions/blog.actions';
import Button from '@/components/ui/Button';
import BlogManager from '@/components/admin/BlogManager';

export default async function BlogPage() {
  const posts = await getPosts(false); // get all posts including drafts

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Nunito", sans-serif', color: 'white', marginBottom: '0.5rem' }}>Gestión de Blog</h1>
          <p style={{ color: 'rgba(200, 195, 255, 0.6)' }}>Escribe y publica artículos para tu comunidad.</p>
        </div>
        <Link href="/admin/blog/nuevo">
          <Button variant="primary">
            + Nuevo Artículo
          </Button>
        </Link>
      </div>

      <BlogManager initialPosts={posts || []} />
    </div>
  );
}
