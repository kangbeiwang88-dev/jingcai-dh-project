import { SearchX } from "lucide-react";

export default function EmptyState({ title = "没有找到匹配资源", description = "可以尝试更换关键词或筛选条件。" }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-14 text-center">
      <SearchX className="text-gilt" size={44} />
      <h3 className="mt-4 text-xl font-black text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
