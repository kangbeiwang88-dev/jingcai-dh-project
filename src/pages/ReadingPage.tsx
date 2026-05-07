import { useState } from "react";
import { images } from "../data/images";
import { resources } from "../data/resources";
import PageHero from "../components/layout/PageHero";
import ResourceCard from "../components/resources/ResourceCard";
import ResourceDetailModal from "../components/resources/ResourceDetailModal";
import FadeInSection from "../components/common/FadeInSection";
import type { Resource } from "../data/resources";

const FILTER_TYPES = [
  { label: "全部", value: "all" },
  { label: "图书馆", value: "library" },
  { label: "独立书店", value: "bookstore" },
  { label: "自习室", value: "study" },
];

const LIBRARY_DISTRICTS = ["全部", "东城区", "西城区", "朝阳区", "海淀区", "丰台区", "石景山区", "通州区", "顺义区", "大兴区", "昌平区", "房山区", "门头沟区", "平谷区", "怀柔区", "密云区", "延庆区"];

export default function ReadingPage() {
  const [filterType, setFilterType] = useState("all");
  const [libraryDistrict, setLibraryDistrict] = useState("全部");
  const [detail, setDetail] = useState<Resource | null>(null);

  const getFiltered = () => {
    if (filterType === "library" || filterType === "all") {
      const libs = resources.filter((r) => r.type === "图书馆");
      if (filterType === "library") {
        return libraryDistrict === "全部" ? libs : libs.filter((r) => r.district === libraryDistrict);
      }
      return libs;
    }
    return null; // 独立书店和自习室暂不开放
  };

  const filtered = getFiltered();

  return (
    <div className="min-h-screen bg-cream">
      <PageHero
        title="阅读空间"
        subtitle="北京市公共图书馆与阅读空间，发现身边的知识殿堂。"
        image={images.heroes.reading}
      />
      <main className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
        {/* 类型筛选 */}
        <div className="mb-4 flex flex-wrap gap-2">
          {FILTER_TYPES.map((ft) => (
            <button
              key={ft.value}
              onClick={() => setFilterType(ft.value)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                filterType === ft.value
                  ? "bg-cinnabar text-white"
                  : "bg-sand text-ink hover:bg-cinnabar/10"
              }`}
            >
              {ft.label}
            </button>
          ))}
        </div>

        {/* 图书馆城区筛选 */}
        {filterType === "library" && (
          <div className="mb-6 flex flex-wrap gap-2">
            {LIBRARY_DISTRICTS.map((d) => (
              <button
                key={d}
                onClick={() => setLibraryDistrict(d)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  libraryDistrict === d
                    ? "bg-ink text-white"
                    : "bg-warmline text-ink hover:bg-warmline/80"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {filtered === null ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 text-5xl opacity-30">🔒</div>
            <p className="text-lg font-bold text-muted">敬请期待</p>
            <p className="mt-1 text-sm text-muted/60">该板块正在建设中，即将上线</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <FadeInSection key={item.id} delay={index * 50}>
                <ResourceCard resource={item} onDetail={setDetail} />
              </FadeInSection>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted">暂无符合条件的图书馆</p>
        )}
      </main>
      {detail && <ResourceDetailModal resource={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}
