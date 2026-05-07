import { Search, X } from "lucide-react";
import { useEffect, useCallback, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { accessiblePlacesFull } from "../data/accessibilityGenerated";
import type { AccessibilityFeatureKey, AccessiblePlaceFull } from "../data/accessibilityTypes";
import { amapSearchUrl } from "../utils/amap";
import { AccessiblePlaceCard } from "./AccessibilityPage";

const featureLabels: Record<AccessibilityFeatureKey, string> = {
  entrance: "无障碍出入口",
  desk: "低位服务台",
  wheelchair: "轮椅服务",
  toilet: "无障碍卫生间",
  signage: "盲文/导览支持",
  parking: "无障碍停车",
};

const featureKeys = Object.keys(featureLabels) as AccessibilityFeatureKey[];

function DetailModal({ place, onClose }: { place: AccessiblePlaceFull | null; onClose: () => void }) {
  if (!place) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#2d2926]/45 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[88vh] w-full max-w-4xl overflow-auto rounded-xl border border-[#e8dcc8] bg-[#fffdf7] p-6 shadow-[0_20px_60px_rgba(45,41,38,0.24)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-[#0f5c4a] px-3 py-1 text-xs font-black text-white">PDF 第 {place.page} 页</span>
            <h2 className="mt-3 text-3xl font-black text-[#2d2926]">{place.name}</h2>
            <p className="mt-2 text-sm text-[#6b6258]">{place.address || "地址待核验"}</p>
          </div>
          <button onClick={onClose} className="rounded-md bg-[#f3e9da] p-2 text-[#2d2926]" aria-label="关闭详情"><X /></button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {place.gallery.slice(0, 3).map((image) => <img key={image} src={image} alt={place.name} className="h-40 w-full rounded-lg object-cover" />)}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <section className="rounded-lg border border-[#e8dcc8] bg-white/70 p-4">
            <h3 className="font-black text-[#2d2926]">无障碍摘要</h3>
            <p className="mt-2 text-sm leading-7 text-[#6b6258]">{place.summary || "该条资料未抽取到摘要，请结合原 PDF 页码核验。"}</p>
          </section>
          <section className="rounded-lg border border-[#e8dcc8] bg-white/70 p-4">
            <h3 className="font-black text-[#2d2926]">游览线路</h3>
            <p className="mt-2 text-sm leading-7 text-[#6b6258]">{place.route || "该条资料未抽取到专门线路。"}</p>
          </section>
          <section className="rounded-lg border border-[#e8dcc8] bg-white/70 p-4">
            <h3 className="font-black text-[#2d2926]">门票/入馆</h3>
            <p className="mt-2 text-sm leading-7 text-[#6b6258]">{place.ticket || "以场馆官方信息为准。"}</p>
          </section>
          <section className="rounded-lg border border-[#e8dcc8] bg-white/70 p-4">
            <h3 className="font-black text-[#2d2926]">开放时间/电话</h3>
            <p className="mt-2 text-sm leading-7 text-[#6b6258]">{place.openTime || "以场馆官方信息为准。"}{place.phone ? ` 电话：${place.phone}` : ""}</p>
          </section>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {featureKeys.filter((key) => place.features[key]).map((key) => <span key={key} className="rounded-md bg-[#eef7f1] px-3 py-2 text-sm font-black text-[#0f5c4a]">{featureLabels[key]}</span>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={amapSearchUrl(`${place.name} ${place.address}`)} target="_blank" rel="noreferrer" className="rounded-md bg-[#0f5c4a] px-5 py-3 text-sm font-black text-white">高德地图</a>
          <a href="mailto:contact@jingcai.example?subject=无障碍资源纠错" className="rounded-md border border-[#0f5c4a] bg-white px-5 py-3 text-sm font-black text-[#0f5c4a]">反馈纠错</a>
        </div>
      </div>
    </div>
  );
}

export default function AccessibilityResourcesPage() {
  const [params, setParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [selectedItem, setSelectedItem] = useState<AccessiblePlaceFull | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 确保 params 同步后再进行数据过滤
  useEffect(() => {
    setIsReady(true);
  }, []);

  // 直接从 URL 获取参数，使用空字符串作为默认值确保首次渲染正确
  const feature = params.get("feature") || undefined;
  const item = params.get("item");

  // 使用 useMemo 计算筛选结果，确保在 params 准备好后计算
  const rows = useMemo(() => {
    if (!isReady) return [];
    return accessiblePlacesFull.filter((place) => {
      const matchFeature = !feature || place.features[feature as AccessibilityFeatureKey];
      const matchKeyword = !keyword || 
        [place.name, place.category, place.address, place.summary, place.route]
          .join(" ").includes(keyword);
      return matchFeature && matchKeyword;
    });
  }, [feature, keyword, isReady]);

  // 当 item 变化时更新选中项
  const open = useCallback((place: AccessiblePlaceFull) => {
    setSelectedItem(place);
    setParams((prev) => {
      prev.set("item", place.id);
      return prev;
    });
  }, [setParams]);

  const close = useCallback(() => {
    setSelectedItem(null);
    setParams((prev) => {
      prev.delete("item");
      return prev;
    });
  }, [setParams]);

  // 当 URL 中的 item 变化时，同步更新 selectedItem
  useEffect(() => {
    if (item) {
      const found = accessiblePlacesFull.find((p) => p.id === item);
      if (found) setSelectedItem(found);
    } else {
      setSelectedItem(null);
    }
  }, [item]);

  return (
    <main className="mx-auto max-w-[1280px] px-4 py-6 lg:px-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link to="/accessibility" className="text-sm font-black text-[#0f5c4a]">&lt; 返回无障碍首页</Link>
          <h1 className="mt-2 text-4xl font-black text-[#06483b]">无障碍资源库</h1>
          <p className="mt-2 text-sm text-[#6b6258]">共 {accessiblePlacesFull.length} 条资料，当前显示 {rows.length} 条。</p>
        </div>
        <label className="flex min-w-[280px] items-center gap-2 rounded-md border border-[#e8dcc8] bg-white px-3 py-2">
          <Search size={18} />
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索场馆、服务、地址" className="w-full bg-transparent outline-none" />
        </label>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <button onClick={() => setParams({})} className={`rounded-md px-3 py-2 text-sm font-black ${!feature ? "bg-[#0f5c4a] text-white" : "bg-white text-[#0f5c4a]"}`}>全部</button>
        {featureKeys.map((key) => (
          <button 
            key={key} 
            onClick={() => {
              setKeyword("");
              setParams({ feature: key });
            }} 
            className={`rounded-md px-3 py-2 text-sm font-black ${feature === key ? "bg-[#0f5c4a] text-white" : "bg-white text-[#0f5c4a]"}`}
          >
            {featureLabels[key]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.length === 0 ? (
          <p className="col-span-full py-10 text-center text-gray-500">暂无数据</p>
        ) : (
          rows.map((place) => (
            <div key={place.id} onClick={() => open(place)} className="cursor-pointer">
              <AccessiblePlaceCard place={place} />
            </div>
          ))
        )}
      </div>

      <DetailModal place={selectedItem} onClose={close} />
    </main>
  );
}
