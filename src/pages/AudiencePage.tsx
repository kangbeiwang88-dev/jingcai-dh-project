import { useMemo, useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import PageHero from "../components/layout/PageHero";
import ResourceDetailModal from "../components/resources/ResourceDetailModal";
import { images } from "../data/images";
import { Resource, resources } from "../data/resources";
import {
  AudienceKey,
  audienceProfiles,
  getRecommendationsByAudience,
} from "../data/audienceData";
import { amapSearchUrl } from "../utils/amap";
import { getFallbackImage } from "../data/normalize";

// 动画卡片组件
function AnimatedCard({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

// 推荐卡片组件
function AudienceRecommendationCard({ rec, onDetail, delay }: { rec: any; onDetail?: () => void; delay?: number }) {
  const hasValidImage = rec.image && rec.image.startsWith("/");
  const displayImage = hasValidImage ? rec.image : getFallbackImage(rec.type);
  const amapUrl = rec.address ? amapSearchUrl(`${rec.title} ${rec.address}`) : "";

  return (
    <AnimatedCard delay={delay || 0}>
      <article className="card overflow-hidden group">
        <div className="relative h-40 overflow-hidden rounded-t-3xl bg-warmline">
          {displayImage ? (
            <img
              src={displayImage}
              alt={rec.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-[#f4dfbd] via-[#fff8ee] to-[#d7e7df]" />
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-ink text-lg">{rec.title}</h3>
              <p className="mt-1 text-xs text-muted">
                {rec.type}
                {rec.district && <span> · {rec.district}</span>}
              </p>
            </div>
          </div>
          {rec.address && (
            <p className="mt-2 text-xs text-muted line-clamp-2 flex items-start gap-1">
              <MapPin size={14} className="flex-shrink-0 mt-0.5" /> {rec.address}
            </p>
          )}
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted">{rec.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {rec.tags?.slice(0, 3).map((tag: string) => (
              <span key={tag} className="inline-block rounded-full bg-sand px-2 py-1 text-xs text-muted font-bold">
                {tag}
              </span>
            ))}
          </div>
          {rec.reason && (
            <div className="mt-3 rounded-2xl bg-sand px-3 py-2 text-xs text-verify font-bold">
              💡 {rec.reason}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <a
              href={amapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 btn-primary inline-flex items-center justify-center gap-1 px-3 py-2 text-xs whitespace-nowrap"
            >
              <MapPin size={14} /> 导航
            </a>
            <button
              onClick={onDetail}
              className="flex-1 btn-outline px-3 py-2 text-xs whitespace-nowrap"
            >
              详情
            </button>
          </div>
        </div>
      </article>
    </AnimatedCard>
  );
}

export default function AudiencePage() {
  const [audience, setAudience] = useState<AudienceKey>("学生");
  const [detail, setDetail] = useState<Resource | null>(null);

  // 获取推荐内容
  const recommendations = useMemo(() => getRecommendationsByAudience(audience), [audience]);

  // 尝试从 resources 中找到对应的真实资源（用于详情弹窗）
  const handleRecommendationDetail = (rec: any) => {
    const found = resources.find((r) => r.name === rec.title);
    if (found) {
      setDetail(found);
    }
  };

  return (
    <>
      <PageHero
        title="人群入口"
        subtitle="为不同的人，定制专属的文化参与路径。"
        image={images.heroes.audience}
      />
      <main className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
        {/* 人群卡片网格 */}
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {audienceProfiles.map(({ title, subtitle, tags, icon }, index) => (
            <AnimatedCard key={title} delay={index * 60}>
              <button
                onClick={() => setAudience(title)}
                className={`card p-5 text-left transition-all w-full h-full flex flex-col ${
                  audience === title
                    ? "border-cinnabar bg-[#fff2e4] shadow-md"
                    : "hover:shadow-sm"
                }`}
              >
              <div className="flex items-center justify-center h-14 w-14 mx-auto flex-shrink-0">
                {icon ? (
                  <img
                    src={icon}
                    alt={title}
                    className="h-14 w-14 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-sand" />
                )}
              </div>
              <div className="flex-1 flex flex-col mt-4">
                <h3 className="text-lg font-black text-ink text-center">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted line-clamp-2 flex-1">
                  {subtitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-1 justify-center">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-sand px-2 py-1 text-xs text-ink font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-3 inline-flex text-xs font-black text-cinnabar justify-center">
                  探索 →
                </span>
              </div>
            </button>
            </AnimatedCard>
          ))}
        </div>

        {/* 推荐内容部分 */}
        <section className="mt-8">
          <div className="mb-6">
            <h2 className="text-xl font-black text-ink">
              为{audience}推荐
            </h2>
            <p className="mt-2 text-sm text-muted">
              精选适合{audience}的文化资源与活动
            </p>
          </div>
          {recommendations.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((rec, index) => (
                <AudienceRecommendationCard
                  key={rec.id}
                  rec={rec}
                  onDetail={() => handleRecommendationDetail(rec)}
                  delay={index * 80}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
      <ResourceDetailModal resource={detail} onClose={() => setDetail(null)} />
    </>
  );
}
