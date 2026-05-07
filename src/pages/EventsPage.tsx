import { useState, useMemo, useEffect, useRef } from "react";
import PageHero from "../components/layout/PageHero";
import EventCard from "../components/events/EventCard";
import EventFilters, { defaultEventFilters, EventFilterState } from "../components/events/EventFilters";
import EventDetailModal from "../components/events/EventDetailModal";
import FadeInSection from "../components/common/FadeInSection";
import { images } from "../data/images";
import { events, EventItem } from "../data/events";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

// 周历配置（2026年5月）
const WEEK_DATES = [
  { date: "2026-05-04", label: "5月4日", weekday: "周一" },
  { date: "2026-05-05", label: "5月5日", weekday: "周二" },
  { date: "2026-05-06", label: "5月6日", weekday: "周三" },
  { date: "2026-05-07", label: "5月7日", weekday: "周四" },
  { date: "2026-05-08", label: "5月8日", weekday: "周五" },
  { date: "2026-05-09", label: "5月9日", weekday: "周六" },
  { date: "2026-05-10", label: "5月10日", weekday: "周日" },
];

export default function EventsPage() {
  const [event, setEvent] = useState<EventItem | null>(null);
  const [filters, setFilters] = useState<EventFilterState>(defaultEventFilters);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // 筛选活动
  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (filters.keyword && ![e.title, e.venue, e.district || ""].join(" ").includes(filters.keyword)) return false;
      if (filters.genre !== "全部类型" && e.genre !== filters.genre) return false;
      if (filters.district !== "全部区域" && e.district !== filters.district) return false;
      if (filters.period !== "全部时段" && !e.time?.includes(filters.period)) return false;
      if (filters.date !== "全部日期" && e.date !== filters.date) return false;
      return true;
    });
  }, [filters]);
  
  // 流动轮播
  const carouselItems = useMemo(() => {
    return filtered.slice(0, 12);
  }, [filtered]);
  
  // 自动滚动
  useEffect(() => {
    if (isPaused || carouselItems.length <= 4) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, carouselItems.length]);
  
  const scrollLeft = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };
  
  const scrollRight = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  // 重置显示数量当筛选变化时
  useEffect(() => {
    setDisplayCount(PAGE_SIZE);
  }, [filters]);

  // 获取要显示的活动（按日期分组，但限制总数）
  const displayedEvents = useMemo(() => {
    let count = 0;
    const result: EventItem[] = [];
    for (const event of filtered) {
      if (count >= displayCount) break;
      result.push(event);
      count++;
    }
    return result;
  }, [filtered, displayCount]);

  // 按日期分组（用于显示）
  const groupedByDate = useMemo(() => {
    const groups: Record<string, EventItem[]> = {};
    for (const item of displayedEvents) {
      const dateKey = item.date;
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    }
    return groups;
  }, [displayedEvents]);

  // 获取所有日期
  const allDates = useMemo(() => {
    const dateSet = new Set(filtered.map((e) => e.date));
    return Array.from(dateSet).sort();
  }, [filtered]);

  // 获取要显示的周历日期（按配置顺序）
  const weekDates = useMemo(() => {
    return WEEK_DATES.filter((w) => allDates.includes(w.date));
  }, [allDates]);

  // 获取总数量
  const totalCount = filtered.length;

  return (
    <>
      <PageHero title="演出展览" subtitle="北京最新演出、展览与公共文化活动，一站式发现精彩现场。" image={images.heroes.events} />
      <main className="mx-auto max-w-[1280px] space-y-4 px-4 py-8 lg:px-6">
        {/* 流动轮播展示 */}
        {carouselItems.length >= 4 && (
          <div 
            className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f5c4a] to-[#2d8b6e]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center px-4 py-3">
              <span className="mr-4 whitespace-nowrap text-sm font-bold text-white">热门活动</span>
              <div className="flex-1 overflow-hidden">
                <div 
                  ref={carouselRef}
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${carouselIndex * 25}%)` }}
                >
                  {[...carouselItems, ...carouselItems].map((item, idx) => (
                    <div 
                      key={`${item.id}-${idx}`} 
                      className="w-1/4 flex-shrink-0 cursor-pointer"
                      onClick={() => setEvent(item)}
                    >
                      <div className="rounded-xl bg-white/10 p-3 transition-all hover:bg-white/20">
                        <div className="mb-2 truncate text-sm font-medium text-white">{item.title}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/70">{item.venue}</span>
                          <span className="rounded bg-white/20 px-2 py-0.5 text-xs text-white">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-4 flex gap-2">
                <button 
                  onClick={scrollLeft}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={scrollRight}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
        
        <EventFilters
          value={filters}
          dates={allDates}
          onChange={(newFilters) => {
            setFilters(newFilters);
            setDisplayCount(PAGE_SIZE);
          }}
          onReset={() => { setFilters(defaultEventFilters); setDisplayCount(PAGE_SIZE); }}
        />

        {/* 活动列表 */}
        <div className="space-y-6">
          {weekDates.map((weekDay) => {
            const dayEvents = groupedByDate[weekDay.date] || [];
            if (dayEvents.length === 0) return null;
            return (
              <div key={weekDay.date}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-cinnabar px-4 py-1.5 text-sm font-black text-white">{weekDay.label}</span>
                  <span className="text-sm text-muted">{weekDay.weekday}</span>
                  <span className="text-xs text-muted">共 {dayEvents.length} 场活动</span>
                </div>
                <div className="space-y-3">
                  {dayEvents.map((item, idx) => (
                    <FadeInSection key={item.id} delay={idx * 40}>
                      <EventCard event={item} onDetail={setEvent} />
                    </FadeInSection>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {totalCount === 0 && (
          <div className="card p-12 text-center text-muted">暂无符合条件的演出展览</div>
        )}

        {totalCount > displayCount && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setDisplayCount((prev) => prev + PAGE_SIZE)}
              className="rounded-full border-2 border-cinnabar px-8 py-3 font-bold text-cinnabar transition hover:bg-cinnabar hover:text-white"
            >
              加载更多 ({totalCount - displayCount} 场)
            </button>
          </div>
        )}
      </main>
      <EventDetailModal event={event} onClose={() => setEvent(null)} />
    </>
  );
}
