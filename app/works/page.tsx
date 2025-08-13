import { getAllContent } from '@/lib/content';
import { WorkList } from '@/components/works/WorkList';

export default function WorksPage() {
  const items = getAllContent('works');
  return (
    <section aria-labelledby="works-title" className="space-y-4">
      <h1 id="works-title" className="text-3xl font-semibold">実績</h1>
      <WorkList items={items} />
    </section>
  );
}

