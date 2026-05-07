import { MapPin } from "lucide-react";
import { useState } from "react";
import Badge from "../common/Badge";
import Tag from "../common/Tag";
import { Resource } from "../../data/resources";

const typeImages: Record<string, string> = {
  "博物馆/美术馆": "/assets/category-museum.png",
  "图书馆": "/assets/category-library.png",
  "文化馆": "/assets/category-culture-center.png",
  "剧场/演出": "/assets/category-performance.png",
  "公园/景区": "/assets/category-park.png",
  "阅读空间": "/assets/category-intangible-culture.png",
};

export default function ResourceCard({ resource, onDetail }: { resource: Resource; onDetail: (r: Resource) => void }) {
  const [imageError, setImageError] = useState(false);
  const typeImage = typeImages[resource.type];

  return (
    <article className="card overflow-hidden">
      <button onClick={() => onDetail(resource)} className="h-full w-full text-left">
        {/* 图片区域 */}
        <div className="relative h-44 overflow-hidden bg-sand">
          {!imageError && typeImage ? (
            <img
              src={typeImage}
              alt={resource.type}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand to-gilt/50">
              <span className="text-6xl opacity-40">📍</span>
            </div>
          )}

          {/* 类型标签 */}
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-paper/95 px-3 py-1 text-xs font-bold text-ink shadow-soft">
              {resource.type}
            </span>
          </div>

          {/* 免费标签 */}
          {resource.isFree && (
            <div className="absolute right-3 top-3">
              <span className="rounded-full bg-accessible/90 px-2 py-1 text-[10px] font-bold text-white shadow-soft">
                免费
              </span>
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-black text-ink line-clamp-1">
              {resource.name}
            </h3>
            <Badge status={resource.verifyStatus} />
          </div>

          <p className="mt-2 flex items-center gap-1 text-xs text-muted">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{resource.district}</span>
          </p>

          {resource.intro && (
            <p className="mt-2 text-xs leading-5 text-muted line-clamp-2">
              {resource.intro}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-1">
            {resource.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {resource.accessibility && (
            <div className="mt-3 flex items-center gap-2 text-xs text-accessible">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accessible/10 text-accessible">♿</span>
              <span>无障碍友好</span>
            </div>
          )}
        </div>
      </button>
    </article>
  );
}
