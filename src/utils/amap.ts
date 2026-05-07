export const AMAP_KEY = import.meta.env.VITE_AMAP_KEY || "";

export const amapSearchUrl = (keyword: string) =>
  `https://uri.amap.com/search?keyword=${encodeURIComponent(keyword)}&city=北京&src=jingcai&coordinate=gaode&callnative=1`;

export const amapRouteUrl = (destination: string) =>
  `https://uri.amap.com/navigation?to=,,${encodeURIComponent(destination)}&mode=car&policy=1&src=jingcai&coordinate=gaode&callnative=1`;

let loader: Promise<void> | null = null;

export function loadAmap() {
  if (!AMAP_KEY) return Promise.reject(new Error("missing-amap-key"));
  if (window.AMap) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}&plugin=AMap.Geocoder,AMap.Scale`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("amap-load-failed"));
    document.head.appendChild(script);
  });

  return loader;
}

declare global {
  interface Window {
    AMap?: any;
  }
}
