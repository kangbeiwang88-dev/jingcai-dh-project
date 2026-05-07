import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import Tag from "../common/Tag";
import { audiences } from "../../data/audience";

export default function AudiencePreview() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle title="人群入口" />
        <Link to="/audience" className="btn-outline px-5 py-3">探索更多</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {audiences.slice(0, 5).map(({ icon: Icon, title, desc, tags }) => (
          <Link key={title} to="/audience" className="card p-5">
            <Icon className="text-inkgreen" size={34} />
            <h3 className="mt-4 text-lg font-black text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">{tags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
