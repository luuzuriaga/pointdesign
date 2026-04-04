import BlogCard from "@/components/ui/BlogCard";
import { getPosts } from "@/lib/actions/blog.actions";
import styles from "./Blog.module.css";

export default async function BlogIndexPage() {
  const posts = await getPosts(true); // Only published posts

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.sectionTag}>Nuestro Blog</div>
          <h1 className={styles.title}>
            Ideas, diseño y <br /> 
            <span className={styles.gradientText}>cultura digital</span>
          </h1>
          <p className={styles.subtitle}>
            Explora nuestros últimos Pensamientos sobre diseño, tecnología y 
            estrategias para hacer crecer tu negocio en el mundo digital.
          </p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          {posts && posts.length > 0 ? (
            <div className={styles.grid}>
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <h3>Próximamente...</h3>
              <p>Estamos preparando contenido increible para ti. ¡Vuelve pronto!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
