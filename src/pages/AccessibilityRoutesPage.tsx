import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { accessibleRoutesFull } from "../data/accessibilityGenerated";
import { amapSearchUrl } from "../utils/amap";

export default function AccessibilityRoutesPage() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 py-6 lg:px-6">
      <Link to="/accessibility" className="text-sm font-black text-[#0f5c4a]">&lt; 返回无障碍首页</Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#06483b]">无障碍路线库</h1>
          <p className="mt-2 text-sm text-[#6b6258]">已接入资料包中的 {accessibleRoutesFull.length} 条线路、{accessibleRoutesFull.reduce((sum, route) => sum + route.stops.length, 0)} 个线路节点。</p>
        </div>
        <a href={amapSearchUrl("北京 无障碍 文化旅游路线")} target="_blank" rel="noreferrer" className="rounded-md bg-[#0f5c4a] px-5 py-3 text-sm font-black text-white">高德路线搜索</a>
      </div>

      <div className="mt-6 grid gap-5">
        {accessibleRoutesFull.map((route) => (
          <article key={route.id} className="overflow-hidden rounded-lg border border-[#e8dcc8] bg-[#fffdf7] shadow-[0_8px_24px_rgba(69,45,22,0.08)]">
            <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
              <img src={route.image} alt={route.name} className="h-full min-h-[260px] w-full object-cover" />
              <div className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="rounded-full bg-[#0f5c4a] px-3 py-1 text-xs font-black text-white">{route.audience}</span>
                    <h2 className="mt-3 text-2xl font-black text-[#2d2926]">{route.name}</h2>
                  </div>
                  <span className="text-sm font-black text-[#6b6258]">PDF 第 {route.page} 页</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {route.tags.map((tag) => <span key={tag} className="rounded-md bg-[#eef7f1] px-3 py-2 text-xs font-black text-[#0f5c4a]">{tag}</span>)}
                </div>
                <div className="mt-5 grid gap-4">
                  {route.stops.map((stop, index) => (
                    <section key={`${route.id}-${stop.place}`} className="grid gap-4 rounded-lg border border-[#e8dcc8] bg-white/80 p-4 md:grid-cols-[120px_1fr_auto]">
                      <div>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0f5c4a] text-sm font-black text-white">{index + 1}</span>
                        <p className="mt-2 flex items-center gap-1 text-xs font-black text-[#6b6258]"><Clock3 size={14} /> {stop.time}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-[#2d2926]">{stop.place}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#6b6258]">{stop.highlight}</p>
                      </div>
                      <a href={amapSearchUrl(stop.place)} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#0f5c4a] px-4 text-sm font-black text-[#0f5c4a]">
                        <MapPin size={16} /> 高德
                      </a>
                    </section>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/accessibility/resources" className="inline-flex items-center gap-2 rounded-md bg-[#0f5c4a] px-5 py-3 text-sm font-black text-white">查看相关资源 <ArrowRight size={16} /></Link>
                  <a href="mailto:contact@jingcai.example?subject=无障碍路线建议" className="rounded-md border border-[#0f5c4a] bg-white px-5 py-3 text-sm font-black text-[#0f5c4a]">反馈路线建议</a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
