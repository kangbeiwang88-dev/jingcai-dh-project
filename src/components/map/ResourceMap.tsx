import { LocateFixed, MapPin, Search, Navigation, Filter, X, ChevronDown } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import CultureMapView from "./CultureMapView";
import { 
  cultureMapResources, 
  CultureResource, 
  ResourceType,
  District,
  getResourceTypeColor 
} from "../../data/cultureMapResources";

export default function ResourceMap() {
  // 筛选状态
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState<ResourceType | "全部类型">("全部类型");
  const [district, setDistrict] = useState<District | "全部区域">("全部区域");
  const [freeOnly, setFreeOnly] = useState(false);
  const [selectedResource, setSelectedResource] = useState<CultureResource | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  // 筛选和排序
  const filteredResources = useMemo(() => {
    let result = [...cultureMapResources];

    // 关键词搜索
    if (keyword) {
      const lower = keyword.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(lower) ||
        r.type.toLowerCase().includes(lower) ||
        r.district.toLowerCase().includes(lower) ||
        r.address.toLowerCase().includes(lower) ||
        r.tags?.some(t => t.toLowerCase().includes(lower))
      );
    }

    // 类型筛选
    if (type !== "全部类型") {
      result = result.filter(r => r.type === type);
    }

    // 区域筛选
    if (district !== "全部区域") {
      result = result.filter(r => r.district === district);
    }

    // 免费筛选
    if (freeOnly) {
      result = result.filter(r => r.priceType === "free");
    }

    return result;
  }, [keyword, type, district, freeOnly]);

  // 定位功能
  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("浏览器不支持定位功能");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        alert("定位失败，请检查定位权限");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // 筛选类型列表
  const types: (ResourceType | "全部类型")[] = [
    "全部类型", "博物馆", "美术馆", "公共图书馆", "剧场剧院", 
    "文化馆", "书店", "公园", "公共文化空间"
  ];

  // 区域列表
  const districts: (District | "全部区域")[] = [
    "全部区域", "东城区", "西城区", "朝阳区", "海淀区", 
    "丰台区", "石景山区", "通州区", "昌平区", "房山区"
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
        
        {/* 左侧：筛选 + 瀑布流资源列表 */}
        <aside className="flex h-[calc(100vh-140px)] flex-col rounded-2xl border border-warmline bg-[#fffaf2] overflow-hidden">
          
          {/* 筛选区域 */}
          <div className="border-b border-warmline bg-white p-4">
            {/* 定位按钮 */}
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={handleLocate}
                disabled={locating}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f5c4a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#06483b] disabled:opacity-60"
              >
                <LocateFixed size={16} className={locating ? "animate-pulse" : ""} />
                {locating ? "定位中..." : "获取当前位置"}
              </button>
              {userLocation && (
                <span className="text-xs text-muted">
                  已定位 ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
                </span>
              )}
            </div>

            {/* 搜索框 */}
            <div className="relative mb-3">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索场馆、博物馆、图书馆等"
                className="w-full rounded-xl border border-warmline bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#0f5c4a]"
              />
              {keyword && (
                <button
                  onClick={() => setKeyword("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* 筛选条件 */}
            <div className="flex flex-wrap gap-2">
              {/* 类型筛选 */}
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ResourceType | "全部类型")}
                  className="appearance-none rounded-lg border border-warmline bg-white px-3 py-2 pr-8 text-sm text-ink cursor-pointer"
                >
                  {types.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted" />
              </div>

              {/* 区域筛选 */}
              <div className="relative">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as District | "全部区域")}
                  className="appearance-none rounded-lg border border-warmline bg-white px-3 py-2 pr-8 text-sm text-ink cursor-pointer"
                >
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted" />
              </div>

              {/* 免费筛选 */}
              <label className="flex items-center gap-2 rounded-lg border border-warmline bg-white px-3 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#0f5c4a] focus:ring-[#0f5c4a]"
                />
                <span className="text-sm text-ink">免费资源</span>
              </label>
            </div>
          </div>

          {/* 资源统计 */}
          <div className="border-b border-warmline px-4 py-2.5 flex items-center justify-between bg-sand/30">
            <span className="text-sm text-muted">
              共找到 <span className="font-bold text-cinnabar">{filteredResources.length}</span> 个文化场所
            </span>
            <span className="text-xs text-muted">
              有经纬度 <span className="font-bold text-inkgreen">{filteredResources.filter(r => r.lat && r.lng).length}</span> 个
            </span>
          </div>

          {/* 瀑布流资源列表 */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredResources.length > 0 ? (
              <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                {filteredResources.map(resource => {
                  const isSelected = selectedResource?.id === resource.id;
                  const hasCoords = resource.lat && resource.lng;
                  
                  return (
                    <article
                      key={resource.id}
                      onClick={() => setSelectedResource(resource)}
                      className={`break-inside-avoid rounded-xl border bg-white p-4 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? "border-[#0f5c4a] shadow-lg ring-2 ring-[#0f5c4a]/20" 
                          : "border-warmline hover:border-[#0f5c4a]/50 hover:shadow-md"
                      }`}
                    >
                      {/* 类型标签 */}
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                          style={{ backgroundColor: getResourceTypeColor(resource.type) }}
                        >
                          {resource.type}
                        </span>
                        {resource.priceType === "free" && (
                          <span className="rounded-full bg-[#00695c] px-2 py-0.5 text-xs font-bold text-white">
                            免费
                          </span>
                        )}
                      </div>

                      {/* 名称和地址 */}
                      <h3 className="font-bold text-ink text-base mb-1 line-clamp-2">{resource.name}</h3>
                      <p className="text-xs text-muted line-clamp-1 mb-2">
                        {resource.district} · {resource.address || "地址待补充"}
                      </p>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags?.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="rounded-md bg-sand px-2 py-0.5 text-xs text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 底部信息 */}
                      <div className="flex items-center justify-between pt-2 border-t border-warmline/50">
                        <div className="flex items-center gap-1">
                          <span 
                            className={`w-2 h-2 rounded-full ${hasCoords ? "bg-inkgreen" : "bg-cinnabar"}`}
                          />
                          <span className="text-xs text-muted">
                            {hasCoords ? "已定位" : "待核验"}
                          </span>
                        </div>
                        {resource.phone && (
                          <a 
                            href={`tel:${resource.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-[#0f5c4a] hover:underline"
                          >
                            {resource.phone}
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 rounded-full bg-sand p-4">
                  <Search size={32} className="text-muted" />
                </div>
                <h3 className="mb-2 font-bold text-ink">没有找到符合条件的文化场所</h3>
                <p className="text-sm text-muted">可以尝试放宽筛选条件或更换关键词</p>
              </div>
            )}
          </div>
        </aside>

        {/* 右侧：高德地图 */}
        <div className="h-[calc(100vh-140px)] rounded-2xl border border-warmline overflow-hidden bg-white">
          <CultureMapView 
            selectedResource={selectedResource}
            onResourceSelect={setSelectedResource}
            resources={filteredResources}
          />
        </div>
      </div>
    </section>
  );
}
