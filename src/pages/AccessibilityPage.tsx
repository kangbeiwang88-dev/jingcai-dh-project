import { Accessibility, ArrowRight, BookOpenText, DoorOpen, MapPinned, Megaphone, MessageSquareText, Table2, Toilet, Armchair } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";
import { accessibilityServices } from "../data/accessibility";
import { accessiblePlacesFull, accessibleRoutesFull, accessibilitySourceStats } from "../data/accessibilityGenerated";
import type { AccessibilityFeatureKey, AccessiblePlaceFull } from "../data/accessibilityTypes";
import { images } from "../data/images";
import { amapSearchUrl } from "../utils/amap";

const services = accessibilityServices.filter((service) => service.key !== "entrance" || service.title !== "无障碍路线");

function Pill({ children }: { children: string }) {
  return <span className="rounded-md border border-[#cfded6] bg-[#f7fbf8] px-2 py-1 text-xs font-bold text-[#0f5c4a]">{children}</span>;
}

export function AccessiblePlaceCard({ place, index = 0 }: { place: AccessiblePlaceFull; index?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tags = services.filter((s) => place.features[s.key]).slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`transform transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <article className="group overflow-hidden rounded-lg border border-[#e8dcc8] bg-[#fffdf7] shadow-[0_8px_24px_rgba(69,45,22,0.08)] transition hover:-translate-y-2 hover:shadow-[0_18px_44px_rgba(69,45,22,0.14)]">
        <div className="relative h-40 overflow-hidden bg-[#f4ead9]">
          <img 
            src={place.image} 
            alt={place.name} 
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.08]" 
          />
          <span className="absolute right-3 top-3 rounded-full bg-[#0f5c4a] px-3 py-1 text-xs font-black text-white">{place.category}</span>
          
          {/* 悬停时显示的功能标签 */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-[#0f5c4a] to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag.key} className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-black text-[#2d2926] group-hover:text-[#0f5c4a] transition-colors">{place.name}</h3>
          <p className="mt-1 text-sm text-[#6b6258]">{place.address || "地址待核验"}</p>
          <div className="mt-3 flex flex-wrap gap-2">{tags.map((tag) => <Pill key={tag.key}>{tag.title}</Pill>)}</div>
          <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#6b6258]">{place.summary || place.route || "资料来自无障碍文化旅游资源手册，详情请查看资源库。"}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to={`/accessibility/resources?item=${place.id}`} className="rounded-md border border-[#9ab9ad] bg-white px-3 py-2 text-center text-sm font-black text-[#0f5c4a] transition hover:bg-[#eef7f1]">查看详情</Link>
            <Link to={`/accessibility/resources?feature=${tags[0]?.key || "entrance"}`} className="rounded-md border border-[#e8dcc8] bg-[#fff7ea] px-3 py-2 text-center text-sm font-black text-[#6b4b1f] transition hover:bg-[#f3e9da]">同类服务</Link>
            <a href={amapSearchUrl(`${place.name} ${place.address}`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0f5c4a] px-4 py-2 text-sm font-black text-white transition hover:bg-[#06483b]">
              导航 <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

// 服务图标带动画
function ServiceCard({ featureKey, title, desc, icon: Icon, image, count, delay }: { 
  featureKey: string; 
  title: string; 
  desc: string; 
  icon: any; 
  image?: string;
  count: number;
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 页面加载时自动触发动画
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div ref={cardRef}>
      <Link 
        to={`/accessibility/resources?feature=${featureKey}`} 
        className={`group block overflow-hidden rounded-lg border border-[#e8dcc8] bg-[#fffdf7] shadow-[0_8px_24px_rgba(69,45,22,0.08)] transition hover:-translate-y-2 hover:shadow-[0_18px_44px_rgba(69,45,22,0.14)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f4ead9]">
          {image ? (
            <img src={image} alt={title} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.08]" onError={(event) => { event.currentTarget.style.display = "none"; }} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#eef7f1] to-[#d4e8de]">
              <Icon className="text-[#0f5c4a]" size={28} strokeWidth={2.2} />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default function AccessibilityPage() {
  const featured = accessiblePlacesFull.slice(0, 6);
  const firstRoute = accessibleRoutesFull[0];
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <>
      <section 
        ref={heroRef}
        className="relative overflow-hidden border-b border-[#e8dcc8] bg-[#fff8ee]"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
      >
        <img 
          src={images.heroes.accessibilityInclusive} 
          alt="无障碍友好文化生活插画" 
          className="absolute inset-y-0 right-0 hidden h-[120%] w-[70%] object-cover opacity-85 lg:block transition-transform duration-300 ease-out" 
          style={{
            transform: `translate(${(mousePos.x - 50) * -0.02}%, ${(mousePos.y - 50) * -0.02}%)`,
          }}
          onError={(event) => { event.currentTarget.style.display = "none"; }} 
        />
        <div className="relative mx-auto max-w-[1280px] px-4 py-12 lg:px-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black leading-tight text-[#06483b] md:text-7xl">无障碍友好</h1>
            <p className="mt-4 text-2xl font-black text-[#0f5c4a]">让每一个人都能便捷、舒适地参与文化生活</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#6b6258]">
              已接入你提供的无障碍资料包：{accessibilitySourceStats.placeCount} 个资源点、{accessibilitySourceStats.routeCount} 条推荐线路、{accessibilitySourceStats.routeStopCount} 个线路节点。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/accessibility/resources" className="rounded-md bg-[#0f5c4a] px-5 py-3 text-sm font-black text-white hover:bg-[#06483b] hover:scale-105 transition-all">查看全部资源</Link>
              <Link to="/accessibility/routes" className="rounded-md border border-[#0f5c4a] bg-white px-5 py-3 text-sm font-black text-[#0f5c4a] hover:bg-[#eef7f1] transition-all">查看全部线路</Link>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
        {/* 无障碍服务一览 - 动画网格 */}
        <section className="rounded-lg border border-[#e8dcc8] bg-[#fffdf7]/95 p-6 shadow-[0_8px_24px_rgba(69,45,22,0.08)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f5c4a]/10">
              <Accessibility className="text-[#0f5c4a]" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#2d2926]">无障碍服务一览</h2>
              <p className="text-xs text-[#6b6258]">点击服务类型查看相关场馆</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {services.map(({ key, title, desc, icon, image }, index) => (
              <ServiceCard 
                key={key} 
                featureKey={key}
                title={title}
                desc={desc}
                icon={icon}
                image={image}
                count={accessibilitySourceStats.serviceStats[key]}
                delay={index * 80}
              />
            ))}
          </div>
        </section>

        {/* 场馆推荐 + 路线推荐 */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* 无障碍友好场馆推荐 */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b91c1c]/10">
                  <MapPinned className="text-[#b91c1c]" size={16} />
                </div>
                <h2 className="text-xl font-black text-[#2d2926]">无障碍友好场馆推荐</h2>
              </div>
              <Link to="/accessibility/resources" className="text-sm font-bold text-[#0f5c4a] hover:underline">查看全部 &gt;</Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((place, index) => <AccessiblePlaceCard key={place.id} place={place} index={index} />)}
            </div>
          </section>

          {/* 无障碍路线推荐 */}
          <aside className="rounded-lg border border-[#e8dcc8] bg-[#fffdf7] p-5 shadow-[0_8px_24px_rgba(69,45,22,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpenText className="text-[#0f5c4a]" size={18} />
                <h2 className="text-xl font-black text-[#2d2926]">精选路线</h2>
              </div>
              <Link to="/accessibility/routes" className="text-sm font-bold text-[#0f5c4a] hover:underline">查看全部 &gt;</Link>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img src={firstRoute.image} alt={firstRoute.name} className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f5c4a]/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-lg font-black text-white">{firstRoute.name}</h3>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-[#0f5c4a] font-medium">
              <Accessibility size={16} /> 适合：{firstRoute.audience}
            </p>
            <div className="mt-4 space-y-3">
              {firstRoute.stops.slice(0, 4).map((stop, index) => (
                <div key={stop.place} className="flex gap-3 items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0f5c4a] text-xs font-black text-white">{index + 1}</span>
                  <p className="text-sm leading-6 text-[#6b6258]"><strong className="text-[#0f5c4a]">{stop.place}</strong> · {stop.highlight}</p>
                </div>
              ))}
            </div>
            {firstRoute.stops.length > 4 && (
              <p className="mt-2 text-xs text-[#6b6258]">...共 {firstRoute.stops.length} 个站点</p>
            )}
            <Link to="/accessibility/routes" className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-[#e8dcc8] bg-[#fff7ea] px-4 py-3 text-sm font-black text-[#6b4b1f] hover:bg-[#f3e9da] hover:scale-[1.02] transition-all">
              查看路线详情 <ArrowRight size={17} />
            </Link>
          </aside>
        </div>

        {/* 提示信息 */}
        <section className="mt-8 flex flex-col gap-4 rounded-lg border border-[#e7cda6] bg-[#fff4df] px-6 py-5 text-[#2d2926] md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <Megaphone className="mt-1 shrink-0 text-[#d9801f]" size={36} />
            <div>
              <p className="font-bold text-[#6b4b1f]">出行提示</p>
              <p className="mt-1 text-sm leading-6 text-[#6b6258]">
                无障碍设施和服务可能因场馆改造、维护或现场管理调整而变化。出行前请通过场馆官网、电话或高德地图详情页确认。
              </p>
            </div>
          </div>
          <a href="mailto:contact@jingcai.example?subject=无障碍服务反馈" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#0f5c4a] px-5 py-3 text-sm font-black text-white hover:bg-[#06483b] hover:scale-105 transition-all">
            <MessageSquareText size={18} /> 使用反馈
          </a>
        </section>
      </main>
    </>
  );
}
