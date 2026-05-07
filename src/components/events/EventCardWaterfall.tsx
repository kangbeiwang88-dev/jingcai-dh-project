import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import Badge from "../common/Badge";
import Tag from "../common/Tag";
import { EventItem } from "../../data/events";

// 判断是否为"真实资源"（不是真正的活动）
const isResourceType = (event: EventItem): boolean => {
  return event.date === "长期活动" || event.time === "详见官网";
};

// 瀑布流卡片尺寸 - 统一尺寸
const cardSize = { width: 320, height: 220 };

// 根据类型获取颜色
const typeColors: Record<string, string> = {
  "演出": "from-red-100 via-orange-50 to-yellow-50",
  "展览": "from-blue-100 via-indigo-50 to-purple-50",
  "讲座": "from-green-100 via-emerald-50 to-teal-50",
  "活动": "from-pink-100 via-rose-50 to-red-50",
  "default": "from-amber-100 via-orange-50 to-yellow-50",
};

function EventCardWaterfall({ event, onDetail, size }: { 
  event: EventItem; 
  onDetail: (event: EventItem) => void; 
  size: { width: number; height: number };
}) {
  const colorClass = typeColors[event.type] || typeColors["default"];
  const isResource = isResourceType(event);
  
  return (
    <article 
      className={`card group shrink-0 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${isResource ? "opacity-85" : ""}`}
      style={{ width: size.width, height: size.height }}
      onClick={() => onDetail(event)}
    >
      <div className="h-full flex flex-col">
        {/* 顶部渐变背景 */}
        <div className={`h-24 bg-gradient-to-br ${colorClass} flex items-center justify-center relative overflow-hidden shrink-0`}>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <circle cx="80" cy="20" r="30" fill="currentColor" className="text-cinnabar/20" />
              <circle cx="20" cy="80" r="20" fill="currentColor" className="text-inkgreen/20" />
            </svg>
          </div>
          <span className="relative text-3xl font-black text-cinnabar/80">{event.type}</span>
          <div className="absolute top-2 left-2">
            <Badge status={event.verifyStatus} />
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-ink text-sm line-clamp-2 leading-tight">{event.title}</h3>
          <div className="mt-2 flex-1">
            <p className="text-xs text-muted flex items-center gap-1">
              <MapPin size={12} /> {event.venue}
            </p>
            <p className="text-xs text-muted flex items-center gap-1 mt-1">
              <CalendarDays size={12} /> {event.date} {event.weekday || ""}
            </p>
            <p className="text-xs font-bold text-cinnabar mt-1">
              {isResource ? (event.genre || "常设场馆") : `¥${event.price || "以官方为准"}`}
            </p>
          </div>
          <div className="mt-auto flex items-center justify-between">
            {event.tags.length > 0 ? (
              <div className="flex gap-1">
                {event.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-sand rounded text-muted">{tag}</span>
                ))}
              </div>
            ) : (
              <span className="text-[10px] text-muted">{isResource ? "常设场馆" : "标签待补充"}</span>
            )}
            <Tag>{isResource ? (event.genre || "场馆") : event.genre}</Tag>
          </div>
        </div>
      </div>
    </article>
  );
}

// 横向自动滚动瀑布流
export function EventWaterfallScroll({ events, onDetail }: { 
  events: EventItem[]; 
  onDetail: (event: EventItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);

  const getCardSize = () => cardSize;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || events.length === 0) return;

    const speed = 0.5; // 每帧移动的像素

    const scroll = () => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(scroll);
        return;
      }

      positionRef.current += speed;
      const totalWidth = container.scrollWidth / 2; // 因为内容重复了两份

      // 如果滚完一轮，重置位置
      if (positionRef.current >= totalWidth) {
        positionRef.current = 0;
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = positionRef.current;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [events.length, isPaused]);

  // 鼠标悬停暂停
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // 手动滚动
  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const step = 340 * 3 + 16 * 3; // 卡片宽度 + gap
    containerRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth'
    });
  };

  // 复制数据实现无缝滚动
  const duplicatedEvents = [...events, ...events, ...events];

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 左渐变遮罩 */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      
      {/* 右渐变遮罩 */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      {/* 左箭头 */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/95 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-ink hover:bg-cinnabar hover:text-white transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>
      
      {/* 滚动容器 */}
      <div 
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden py-2"
      >
        {duplicatedEvents.map((event, index) => (
          <EventCardWaterfall 
            key={`${event.id}-${index}`}
            event={event} 
            onDetail={onDetail} 
            size={getCardSize()} 
          />
        ))}
      </div>
      
      {/* 右箭头 */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/95 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-ink hover:bg-cinnabar hover:text-white transition-all duration-200"
      >
        <ChevronRight size={24} />
      </button>

      {/* 暂停提示 */}
      {isPaused && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted bg-white/80 px-2 py-1 rounded z-20">
          悬停暂停 · 移开恢复
        </div>
      )}
    </div>
  );
}

export default EventCardWaterfall;
