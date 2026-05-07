import { useEffect, useRef, useState } from "react";
import { Layers, Filter, Locate, Plus, Minus, Navigation } from "lucide-react";
import { MapPin } from "lucide-react";
import type { CultureResource } from "../../data/cultureMapResources";
import { AMAP_KEY, loadAmap, amapSearchUrl } from "../../utils/amap";

interface CultureMapViewProps {
  selectedResource: CultureResource | null;
  onResourceSelect: (resource: CultureResource) => void;
  resources: CultureResource[];
}

export default function CultureMapView({ 
  selectedResource, 
  onResourceSelect,
  resources 
}: CultureMapViewProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<string>("");
  const [zoom, setZoom] = useState(12);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const disposedRef = useRef(false);

  // 初始化高德地图
  useEffect(() => {
    disposedRef.current = false;
    
    if (!AMAP_KEY || !mapRef.current) {
      setStatus("未检测到 VITE_AMAP_KEY，请添加环境变量后使用完整地图功能。");
      return;
    }

    let map: any;

    loadAmap()
      .then(() => {
        // 检查组件是否已卸载或容器是否还存在
        if (disposedRef.current || !mapRef.current || !window.AMap) return;
        
        // 创建地图实例
        map = new window.AMap.Map(mapRef.current, {
          center: [116.397428, 39.90923],
          zoom: 12,
          mapStyle: "amap://styles/normal",
          viewMode: "2D",
          showLabel: true,
        });
        
        // 添加比例尺控件
        map.addControl(new window.AMap.Scale({ position: "LB" }));
        
        // 存储地图实例引用
        mapInstanceRef.current = map;
        
        // 地址解析器
        const geocoder = new window.AMap.Geocoder({ city: "北京" });
        
        // 清除旧标记
        markersRef.current.forEach(m => {
          try { map.remove(m); } catch (e) { /* ignore */ }
        });
        markersRef.current = [];

        // 添加资源点位
        let addedCount = 0;
        resources.forEach((resource) => {
          // 如果有经纬度直接使用，否则解析地址
          if (resource.lat && resource.lng) {
            addMarker(resource, [resource.lng, resource.lat], map);
            addedCount++;
          } else if (resource.address) {
            geocoder.getLocation(resource.address, (status: string, result: any) => {
              if (disposedRef.current || status !== "complete" || !result?.geocodes?.length) return;
              const loc = result.geocodes[0].location;
              addMarker(resource, loc, map);
              addedCount++;
            });
          }
        });

        setStatus(`高德地图已加载，共 ${addedCount} 个文化资源`);
        
        // 如果有选中资源，定位到该点
        if (selectedResource) {
          panToResource(selectedResource, map, geocoder);
        }
      })
      .catch(() => {
        if (!disposedRef.current) {
          setStatus("高德地图加载失败，请检查网络或 VITE_AMAP_KEY 配置。");
        }
      });

    function addMarker(resource: CultureResource, position: any, mapInstance: any) {
      // 使用统一的墨绿色圆形标记，简洁美观
      const marker = new window.AMap.Marker({
        position: position,
        title: resource.name,
        icon: new window.AMap.Icon({
          size: new window.AMap.Size(24, 24),
          image: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#0f5c4a" stroke="white" stroke-width="2"/>
            </svg>
          `),
          imageSize: new window.AMap.Size(24, 24),
        }),
        offset: new window.AMap.Pixel(-12, -12),
        extData: resource,
      });

      // 点击标记
      marker.on("click", () => {
        onResourceSelect(resource);
        showInfoWindow(resource, position, mapInstance);
      });

      mapInstance.add(marker);
      markersRef.current.push(marker);
    }

    function showInfoWindow(resource: CultureResource, position: any, mapInstance: any) {
      const infoWindow = new window.AMap.InfoWindow({
        content: `
          <div style="padding: 12px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: bold; color: #2d2926;">${resource.name}</h3>
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #6b6258;">${resource.type} · ${resource.district}</p>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b6258;">${resource.address || "地址待补充"}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px;">
              ${resource.tags.slice(0, 3).map((tag: string) => `<span style="background: #f3e9da; padding: 2px 6px; border-radius: 4px; font-size: 11px; color: #6b6258;">${tag}</span>`).join("")}
            </div>
            <a href="${amapSearchUrl(resource.name + " " + resource.address)}" target="_blank" rel="noreferrer" style="display: inline-block; background: #b91c1c; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; text-decoration: none;">查看详情</a>
          </div>
        `,
        offset: new window.AMap.Pixel(0, -28),
        closeWhenClickMap: true,
      });
      infoWindow.open(mapInstance, position);
    }

    function panToResource(resource: CultureResource, mapInstance: any, geocoder: any) {
      if (resource.lat && resource.lng) {
        mapInstance.setCenter([resource.lng, resource.lat]);
        mapInstance.setZoom(15);
      } else if (resource.address) {
        geocoder.getLocation(resource.address, (status: string, result: any) => {
          if (disposedRef.current) return;
          if (status === "complete" && result?.geocodes?.length) {
            const loc = result.geocodes[0].location;
            mapInstance.setCenter(loc);
            mapInstance.setZoom(15);
          }
        });
      }
    }

    return () => {
      disposedRef.current = true;
      // 清理地图实例
      if (map) {
        markersRef.current.forEach(m => {
          try { map.remove(m); } catch (e) { /* ignore */ }
        });
        markersRef.current = [];
        try { 
          map.destroy(); 
        } catch (e) { /* ignore */ }
      }
      // 清除引用
      mapInstanceRef.current = null;
    };
  }, [resources, selectedResource]);

  // 当地图实例存在且选中资源变化时，定位到该资源
  useEffect(() => {
    if (!selectedResource || !mapInstanceRef.current || disposedRef.current) return;
    
    const map = mapInstanceRef.current;
    if (!map || typeof map.setCenter !== 'function') return;
    
    const geocoder = new window.AMap.Geocoder({ city: "北京" });
    if (selectedResource.lat && selectedResource.lng) {
      try {
        map.setCenter([selectedResource.lng, selectedResource.lat]);
        map.setZoom(15);
      } catch (e) {
        // 地图可能已销毁
      }
    } else if (selectedResource.address) {
      geocoder.getLocation(selectedResource.address, (status: string, result: any) => {
        if (disposedRef.current || !mapInstanceRef.current) return;
        if (status === "complete" && result?.geocodes?.length) {
          const loc = result.geocodes[0].location;
          try {
            map.setCenter(loc);
            map.setZoom(15);
          } catch (e) {
            // 地图可能已销毁
          }
        }
      });
    }
  }, [selectedResource]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      const newZoom = Math.min(mapInstanceRef.current.getZoom() + 1, 18);
      mapInstanceRef.current.setZoom(newZoom);
      setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      const newZoom = Math.max(mapInstanceRef.current.getZoom() - 1, 4);
      mapInstanceRef.current.setZoom(newZoom);
      setZoom(newZoom);
    }
  };

  const handleLocate = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter([116.397428, 39.90923]);
      mapInstanceRef.current.setZoom(12);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#faf5eb]">
      {AMAP_KEY ? (
        <>
          {/* 地图容器 */}
          <div ref={mapRef} className="h-full w-full" />
          
          {/* 状态提示 */}
          {status && (
            <div className="absolute left-4 top-4 z-20 rounded-lg bg-white/95 px-3 py-2 text-xs text-muted shadow-md backdrop-blur-sm">
              {status}
            </div>
          )}

          {/* 地图工具按钮 - 左上 */}
          <div className="absolute left-4 top-4 z-20 mt-12 flex flex-col gap-2">
            <button
              onClick={handleLocate}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-colors hover:bg-gray-50"
              title="回到中心"
            >
              <Locate size={18} className="text-ink" />
            </button>
          </div>

          {/* 地图控制按钮 - 右下 */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-colors hover:bg-gray-50"
              title="放大"
            >
              <Plus size={18} className="text-ink" />
            </button>
            <button
              onClick={handleZoomOut}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-colors hover:bg-gray-50"
              title="缩小"
            >
              <Minus size={18} className="text-ink" />
            </button>
          </div>

          {/* 选中资源提示 */}
          {selectedResource && (
            <div className="absolute bottom-4 left-4 z-20 max-w-xs rounded-xl bg-white p-3 shadow-lg">
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cinnabar">
                  <MapPin size={16} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-bold text-ink">{selectedResource.name}</h4>
                  <p className="text-xs text-muted">{selectedResource.address || "地址待补充"}</p>
                  <a
                    href={amapSearchUrl(selectedResource.name + " " + selectedResource.address)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cinnabar hover:underline"
                  >
                    <Navigation size={12} />
                    导航到此处
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* 无高德Key时的占位显示 */
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#faf5eb] to-[#f3e9da] p-8">
          <div className="mb-6 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0f5c4a]/10">
              <MapPin size={32} className="text-inkgreen" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-ink">文化地图</h3>
            <p className="text-sm text-muted">接入高德地图 API，展示北京文化资源分布</p>
          </div>
          
          <div className="w-full max-w-md rounded-xl border border-dashed border-[#c9b896] bg-white p-6 text-center">
            <p className="text-sm leading-7 text-muted">
              要启用地图功能，请在项目根目录添加 <code className="rounded bg-sand px-1.5 py-0.5 font-mono text-xs">.env.local</code> 文件：
            </p>
            <pre className="rounded-lg bg-[#2d2926] p-4 text-left text-xs text-white">
{`VITE_AMAP_KEY=你的高德Web端Key`}
            </pre>
            <p className="mt-4 text-xs text-muted">
              获取 Key：<a href="https://lbs.amap.com" target="_blank" rel="noreferrer" className="text-cinnabar hover:underline">https://lbs.amap.com</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
