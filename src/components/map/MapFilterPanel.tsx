import { useState, useMemo } from "react";
import { 
  LocateFixed, 
  Search, 
  MapPin, 
  ChevronDown, 
  MapPinOff, 
  DollarSign,
  SlidersHorizontal,
  Star,
  Navigation
} from "lucide-react";
import { 
  Resource, 
  resources, 
  resourceTypes, 
  districts, 
  ResourceType
} from "../../data/resources";
import { amapRouteUrl } from "../../utils/amap";

interface MapFilterPanelProps {
  onResourceSelect: (resource: Resource | null) => void;
  selectedResource: Resource | null;
  onResourceScroll?: (resource: Resource) => void;
}

type SortOption = "综合排序" | "距离最近" | "热度最高" | "评分最高" | "免费优先";

export default function MapFilterPanel({ 
  onResourceSelect, 
  selectedResource,
  onResourceScroll 
}: MapFilterPanelProps) {
  // 筛选状态
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState<ResourceType | "全部类型">("全部类型");
  const [district, setDistrict] = useState<string>("全部区域");
  const [accessibilityOnly, setAccessibilityOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("综合排序");
  const [isLocating, setIsLocating] = useState(false);
  const [locatedDistrict, setLocatedDistrict] = useState<string>("东城区");

  // 定位功能
  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocatedDistrict("东城区");
      setIsLocating(false);
    }, 1500);
  };

  // 筛选和排序逻辑
  const filteredResources = useMemo(() => {
    let result = [...resources];

    // 关键词搜索
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(lowerKeyword) ||
        r.type.toLowerCase().includes(lowerKeyword) ||
        r.district.toLowerCase().includes(lowerKeyword) ||
        r.tags?.some(t => t.toLowerCase().includes(lowerKeyword)) ||
        r.address?.toLowerCase().includes(lowerKeyword)
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
      result = result.filter(r => r.tags?.some((t: string) => t.includes("免费")));
    }

    // 无障碍筛选（如果有相关标签）
    if (accessibilityOnly) {
      result = result.filter(r => 
        r.tags?.some((t: string) => t.includes("无障碍") || t.includes("轮椅"))
      );
    }

    // 排序
    switch (sortBy) {
      case "距离最近":
        result.sort((a, b) => {
          if (!a.lat && !b.lat) return 0;
          if (!a.lat) return 1;
          if (!b.lat) return -1;
          return 0; // 需要用户位置才能计算距离，这里简化处理
        });
        break;
      case "热度最高":
        result.sort((a, b) => (b.tags?.length || 0) - (a.tags?.length || 0));
        break;
      case "评分最高":
        result.sort((a, b) => {
          const scoreA = (a.tags?.length || 0) * 0.2;
          const scoreB = (b.tags?.length || 0) * 0.2;
          return scoreB - scoreA;
        });
        break;
      case "免费优先":
        result.sort((a, b) => {
          const aFree = a.tags?.some((t: string) => t.includes("免费")) ? 0 : 1;
          const bFree = b.tags?.some((t: string) => t.includes("免费")) ? 0 : 1;
          return aFree - bFree;
        });
        break;
    }

    return result;
  }, [keyword, type, district, accessibilityOnly, freeOnly, sortBy]);

  // 地图导航提示
  const handleNavigate = (resource: Resource, e: React.MouseEvent) => {
    e.stopPropagation();
    const dest = resource.address || resource.name;
    const url = amapRouteUrl(dest);
    window.open(url, "_blank");
  };

  // 获取类型对应的颜色
  const getTypeColor = (resourceType: string) => {
    switch (resourceType) {
      case "图书馆":
      case "阅读空间":
        return "#00695c"; // 墨绿色
      case "博物馆/美术馆":
        return "#b91c1c"; // 中国红
      case "文化馆":
      case "公园/景区":
        return "#d97706"; // 橙色
      case "剧场/演出":
        return "#7c3aed"; // 紫色
      default:
        return "#6b7280"; // 灰色
    }
  };

  return (
    <aside className="flex h-full w-[420px] flex-shrink-0 flex-col border-r border-warmline bg-[#fffaf2]">
      {/* 定位区域 */}
      <div className="border-b border-warmline p-4">
        <button
          onClick={handleLocate}
          disabled={isLocating}
          className="btn-outline inline-flex items-center gap-2 px-4 py-2.5 text-sm"
        >
          <LocateFixed size={16} className={isLocating ? "animate-pulse" : ""} />
          {isLocating ? "定位中..." : "获取当前位置"}
        </button>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted">
          <MapPin size={14} className="text-cinnabar" />
          <span>已定位到：北京市 · {locatedDistrict}</span>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="border-b border-warmline p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索场馆、书店、图书馆等"
              className="w-full rounded-xl border border-warmline bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-cinnabar"
            />
          </div>
          <button className="btn-primary rounded-xl px-4 py-3 text-sm font-medium">
            搜索
          </button>
        </div>
      </div>

      {/* 筛选条件 */}
      <div className="border-b border-warmline p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
          <SlidersHorizontal size={14} />
          筛选条件
        </div>
        
        {/* 下拉筛选 */}
        <div className="mb-3 flex flex-wrap gap-2">
          {/* 类型 */}
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ResourceType | "全部类型")}
              className="appearance-none rounded-lg border border-warmline bg-white px-3 py-2 pr-8 text-sm text-ink"
            >
              <option value="全部类型">全部类型</option>
              {resourceTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted" />
          </div>

          {/* 区域 */}
          <div className="relative">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="appearance-none rounded-lg border border-warmline bg-white px-3 py-2 pr-8 text-sm text-ink"
            >
              <option value="全部区域">全部区域</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </div>

        {/* 开关筛选 */}
        <div className="flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <div className="relative">
              <input
                type="checkbox"
                checked={accessibilityOnly}
                onChange={(e) => setAccessibilityOnly(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-cinnabar"></div>
              <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
            </div>
            <span className="flex items-center gap-1 text-sm text-ink">
              <MapPinOff size={14} className="text-inkgreen" />
              无障碍友好
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <div className="relative">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-inkgreen"></div>
              <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
            </div>
            <span className="flex items-center gap-1 text-sm text-ink">
              <DollarSign size={14} className="text-gilt" />
              免费资源
            </span>
          </label>
        </div>
      </div>

      {/* 资源数量和排序 */}
      <div className="flex items-center justify-between border-b border-warmline px-4 py-3">
        <span className="text-sm text-muted">
          共找到 <span className="font-semibold text-cinnabar">{filteredResources.length}</span> 个文化场所
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none rounded-lg border border-warmline bg-white px-3 py-1.5 pr-8 text-sm text-ink"
          >
            <option value="综合排序">综合排序</option>
            <option value="距离最近">距离最近</option>
            <option value="热度最高">热度最高</option>
            <option value="评分最高">评分最高</option>
            <option value="免费优先">免费优先</option>
          </select>
          <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted" />
        </div>
      </div>

      {/* 资源列表 */}
      <div className="flex-1 overflow-y-auto">
        {filteredResources.length > 0 ? (
          <div className="space-y-3 p-4">
            {filteredResources.map(resource => {
              const isSelected = selectedResource?.id === resource.id;
              const isFree = resource.tags?.some((t: string) => t.includes("免费"));
              const hasAccessibility = resource.tags?.some((t: string) => t.includes("无障碍") || t.includes("轮椅"));
              
              return (
                <article
                  key={resource.id}
                  onClick={() => {
                    onResourceSelect(resource);
                    onResourceScroll?.(resource);
                  }}
                  className={`group cursor-pointer rounded-xl border bg-white p-4 transition-all duration-200 ${
                    isSelected 
                      ? "border-cinnabar shadow-lg ring-2 ring-cinnabar/20" 
                      : "border-warmline hover:border-cinnabar/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex gap-3">
                    {/* 类型图标 */}
                    <div 
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: getTypeColor(resource.type) }}
                    >
                      <MapPin size={22} />
                    </div>

                    {/* 内容 */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-ink line-clamp-1">{resource.name}</h3>
                      </div>
                      
                      {/* 标签 */}
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        <span 
                          className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                          style={{ backgroundColor: getTypeColor(resource.type) }}
                        >
                          {resource.type}
                        </span>
                        <span className="rounded-full bg-sand px-2 py-0.5 text-xs text-muted">
                          {resource.district}
                        </span>
                        {isFree && (
                          <span className="rounded-full bg-inkgreen px-2 py-0.5 text-xs font-medium text-white">
                            免费
                          </span>
                        )}
                      </div>

                      {/* 地址 */}
                      <p className="mt-2 text-xs text-muted line-clamp-1">
                        {resource.address || "地址待补充"}
                      </p>
                    </div>
                  </div>

                  {/* 标签列表 */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {resource.tags?.slice(0, 3).map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="rounded-md bg-[#f7efe3] px-2 py-0.5 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                    {hasAccessibility && (
                      <span className="flex items-center gap-1 rounded-md bg-[#eef7f1] px-2 py-0.5 text-xs text-inkgreen">
                        <Star size={10} />
                        无障碍
                      </span>
                    )}
                  </div>

                  {/* 导航按钮 */}
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={(e) => handleNavigate(resource, e)}
                      className="btn-primary whitespace-nowrap px-4 py-1.5 text-xs"
                    >
                      <Navigation size={12} className="mr-1 inline" />
                      导航
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-sand p-4">
              <Search size={32} className="text-muted" />
            </div>
            <h3 className="mb-2 font-bold text-ink">没有找到符合条件的文化场所</h3>
            <p className="text-sm text-muted">
              可以尝试放宽筛选条件或更换关键词
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
