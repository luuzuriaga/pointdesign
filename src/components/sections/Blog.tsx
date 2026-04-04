import { getPosts } from "@/lib/actions/blog.actions";
import BlogCard from "../ui/BlogCard";
import Button from "../ui/Button";
import Link from "next/link";
import styles from "./Blog.module.css";

export default async function BlogSection() {
  const posts = await getPosts(true);
  const recentPosts = posts.slice(0, 3);

  return (
    <section className={`${styles.section} reveal`} id="blog">
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.sectionTag}>Novedades</div>
            <h2 className={styles.title}>Ideas y Cultura Digital</h2>
          </div>
          <Link href="/blog">
            <Button variant="outline">Ver Blog Completo</Button>
          </Link>
        </div>

        <div className={styles.grid}>
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <p className={styles.empty}>Estaremos publicando contenido muy pronto.</p>
          )}
        </div>
      </div>
    </section>
  );
}
