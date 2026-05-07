import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import PageHero from "../components/layout/PageHero";
import ResourceCard from "../components/resources/ResourceCard";
import ResourceDetailModal from "../components/resources/ResourceDetailModal";
import ResourceFilters, { defaultResourceFilters, ResourceFilterState } from "../components/resources/ResourceFilters";
import FadeInSection from "../components/common/FadeInSection";
import { images } from "../data/images";
import { Resource, resources, ResourceType } from "../data/resources";
import { buildSourceNotice } from "../data/normalize";

// 特色资源名称列表
const FEATURED_NAMES = [
  "故宫博物院",
  "国家大剧院",
  "首都图书馆",
  "中国美术馆",
  "北京市文化馆",
  "北海公园",
  "751 D·PARK",
];

// 获取资源优先级（用于默认排序）
function getResourcePriority(resource: Resource, index: number): number {
  const featuredIndex = FEATURED_NAMES.findIndex((name) => resource.name.includes(name));
  if (featuredIndex >= 0) {
    return featuredIndex * 10000;
  }

  const typeOrder: Record<string, number> = {
    "博物馆/美术馆": 10000,
    "剧场/演出": 20000,
    "图书馆": 30000,
    "文化馆": 40000,
    "公园/景区": 50000,
    "阅读空间": 60000,
  };

  return (typeOrder[resource.type] || 90000) + index;
}

// 获取混合排序的资源
function getMixedOrderedResources(resourceList: Resource[]): Resource[] {
  const sorted = [...resourceList].sort((a, b) => {
    const aIndex = resources.findIndex((r) => r.id === a.id);
    const bIndex = resources.findIndex((r) => r.id === b.id);
    const aPriority = getResourcePriority(resources[aIndex], aIndex);
    const bPriority = getResourcePriority(resources[bIndex], bIndex);
    return aPriority - bPriority;
  });

  // 按类型交替排序
  const typeMap: Record<string, Resource[]> = {};
  for (const resource of sorted) {
    if (!typeMap[resource.type]) {
      typeMap[resource.type] = [];
    }
    typeMap[resource.type].push(resource);
  }

  const result: Resource[] = [];
  let typeIndex = 0;
  const types = Object.keys(typeMap);

  while (result.length < sorted.length && types.length > 0) {
    const type = types[typeIndex % types.length];
    if (typeMap[type].length > 0) {
      result.push(typeMap[type].shift()!);
    }
    typeIndex++;
  }

  return result;
}

// 获取 TOP 资源（不同类型）
function getTopResources(resourceList: Resource[], count: number = 5): Resource[] {
  const typeMap: Record<string, Resource[]> = {};

  for (const resource of resourceList) {
    if (!typeMap[resource.type]) {
      typeMap[resource.type] = [];
    }
    typeMap[resource.type].push(resource);
  }

  const result: Resource[] = [];
  const types = Object.keys(typeMap).sort();

  // 交替取每种类型的第一个资源
  let typeIndex = 0;
  while (result.length < count && types.length > 0) {
    const type = types[typeIndex % types.length];
    if (typeMap[type].length > 0) {
      result.push(typeMap[type].shift()!);
    }
    typeIndex++;
  }

  return result;
}

const PAGE_SIZE = 12;

export default function ResourcesPage() {
  const [params] = useSearchParams();
  const [detail, setDetail] = useState<Resource | null>(null);
  const [filters, setFilters] = useState<ResourceFilterState>({
    ...defaultResourceFilters,
    keyword: params.get("q") || "",
    type: (params.get("type") as ResourceType | null) || "全部类型",
  });
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      resources
        .filter((r) => !filters.keyword || [r.name, r.type, r.district, r.intro, ...r.tags].join(" ").includes(filters.keyword))
        .filter((r) => filters.type === "全部类型" || r.type === filters.type)
        .filter((r) => filters.district === "全部区域" || r.district === filters.district)
        .filter((r) => filters.audience === "全部人群" || r.audiences.includes(filters.audience as never)),
    [filters]
  );

  // 获取混合排序的列表
  const orderedFiltered = useMemo(() => getMixedOrderedResources(filtered), [filtered]);

  // 获取 TOP 资源
  const topResources = useMemo(() => getTopResources(resources), []);

  // 重置显示数量当筛选变化时
  useEffect(() => {
    setDisplayCount(PAGE_SIZE);
  }, [filters]);

  return (
    <>
      <PageHero title="文化资源" subtitle="发现博物馆、文化场馆、图书馆、演出、景区与公共文化空间，感受北京深厚的历史底蕴与多彩的文化生活。" image={images.heroes.resources} />
      <main className="mx-auto grid max-w-[1280px] gap-5 px-4 py-8 lg:grid-cols-[1fr_280px] lg:px-6">
        <div>
          <FadeInSection delay={80}>
            <ResourceFilters value={filters} onChange={setFilters} onReset={() => setFilters(defaultResourceFilters)} />
          </FadeInSection>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {orderedFiltered.slice(0, displayCount).map((resource, index) => (
              <FadeInSection key={resource.id} delay={index * 50}>
                <ResourceCard resource={resource} onDetail={setDetail} />
              </FadeInSection>
            ))}
          </div>
          {orderedFiltered.length === 0 ? (
            <div className="mt-5">
              <EmptyState />
            </div>
          ) : displayCount < orderedFiltered.length ? (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setDisplayCount((prev) => prev + PAGE_SIZE)}
                className="rounded-full border-2 border-cinnabar px-8 py-3 font-bold text-cinnabar transition hover:bg-cinnabar hover:text-white"
              >
                加载更多 ({orderedFiltered.length - displayCount} 条)
              </button>
            </div>
          ) : null}
        </div>
        <aside className="space-y-5">
          <FadeInSection delay={300}>
            <div className="card p-5">
              <h3 className="font-black text-ink">精选推荐</h3>
              <p className="mt-3 text-sm leading-7 text-muted">精选公共文化空间与近期适合前往的文化资源。推荐内容根据资源类型、展示完整度与公共文化属性综合排序。</p>
            </div>
          </FadeInSection>
          <FadeInSection delay={250}>
            <div className="card p-5">
              <h3 className="font-black text-ink">精选资源</h3>
              <div className="mt-4 grid gap-3">
                {topResources.map((item) => (
                  <button key={item.id} onClick={() => setDetail(item)} className="rounded-2xl bg-sand p-3 text-left text-sm font-bold text-ink transition hover:text-cinnabar">
                    {item.name}
                    <span className="ml-2 text-xs text-verify">推荐</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeInSection>
          <FadeInSection delay={320}>
            <div className="card p-5 text-xs leading-5 text-muted">
              <strong>资料来源：</strong>{buildSourceNotice()}
            </div>
          </FadeInSection>
        </aside>
      </main>
      <ResourceDetailModal resource={detail} onClose={() => setDetail(null)} />
    </>
  );
}
