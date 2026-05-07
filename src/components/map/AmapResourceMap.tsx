import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import type { AccessiblePlaceFull } from "../../data/accessibilityTypes";
import { AMAP_KEY, amapSearchUrl, loadAmap } from "../../utils/amap";

export default function AmapResourceMap({ places }: { places: AccessiblePlaceFull[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState(AMAP_KEY ? "正在加载高德地图..." : "未检测到 VITE_AMAP_KEY，已切换为高德搜索入口。");

  useEffect(() => {
    if (!AMAP_KEY || !ref.current) return;
    let disposed = false;
    let map: any;

    loadAmap()
      .then(() => {
        if (disposed || !ref.current || !window.AMap) return;
        map = new window.AMap.Map(ref.current, {
          center: [116.397428, 39.90923],
          zoom: 10,
          mapStyle: "amap://styles/normal",
        });
        map.addControl(new window.AMap.Scale());
        map.addControl(new window.AMap.ToolBar({ position: "RT" }));
        const geocoder = new window.AMap.Geocoder({ city: "北京" });
        const bounds: any[] = [];

        places.forEach((place) => {
          const query = [place.name, place.address].filter(Boolean).join(" ");
          geocoder.getLocation(query, (state: string, result: any) => {
            if (disposed || state !== "complete" || !result?.geocodes?.length) return;
            const loc = result.geocodes[0].location;
            const marker = new window.AMap.Marker({
              position: loc,
              title: place.name,
              extData: place,
            });
            marker.on("click", () => {
              const info = new window.AMap.InfoWindow({
                content: `<div style="font-size:13px;line-height:1.7;max-width:240px"><strong>${place.name}</strong><br/>${place.address || "地址待核验"}<br/><a target="_blank" href="${amapSearchUrl(place.name)}">打开高德详情</a></div>`,
                offset: new window.AMap.Pixel(0, -28),
              });
              info.open(map, loc);
            });
            map.add(marker);
            bounds.push(loc);
            if (bounds.length > 1) map.setFitView();
          });
        });

        setStatus(`已调用高德地图 JS API，正在为 ${places.length} 个资源点做地址解析。`);
      })
      .catch(() => setStatus("高德地图加载失败，已保留每个资源的高德搜索入口。"));

    return () => {
      disposed = true;
      if (map) map.destroy();
    };
  }, [places]);

  return (
    <section className="rounded-lg border border-[#d9e7df] bg-[#f6fbf8] p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0f5c4a]">高德地图导航</h2>
          <p className="mt-1 text-sm text-[#6b6258]">{status}</p>
        </div>
        <a href={amapSearchUrl("北京 无障碍 文化场馆")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#0f5c4a] px-4 py-2 text-sm font-black text-white">
          <MapPin size={16} /> 高德打开
        </a>
      </div>
      {AMAP_KEY ? (
        <div ref={ref} className="h-[420px] overflow-hidden rounded-lg border border-[#d9e7df] bg-white" />
      ) : (
        <div className="grid min-h-[260px] place-items-center rounded-lg border border-dashed border-[#9ab9ad] bg-white p-6 text-center">
          <p className="max-w-xl text-sm leading-7 text-[#6b6258]">
            在项目根目录添加 `.env.local`，写入 `VITE_AMAP_KEY=你的高德Web端Key` 后重启开发服务，这里会直接调用高德地图 JS API 并展示全量资源点。
          </p>
        </div>
      )}
    </section>
  );
}
