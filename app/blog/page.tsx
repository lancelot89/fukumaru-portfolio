import { BlogList } from '@/components/blog/BlogList';
import { getAllContent } from '@/lib/content';

export default function BlogPage() {
  const items = getAllContent('blog');
  return (
    <section aria-labelledby="blog-title" className="space-y-4">
      <h1 id="blog-title" className="text-3xl font-semibold">
        ブログ
      </h1>
      <BlogList items={items} />
    </section>
  );
}
