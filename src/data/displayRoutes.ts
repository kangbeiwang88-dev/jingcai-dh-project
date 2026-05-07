import { cleanText, buildRouteSourceNotice, getFallbackImage } from "./normalize";

export type DisplayRoute = {
  id: string;
  routeName: string;
  audience: string;
  order?: number;
  time?: string;
  place: string;
  highlight: string;
  image: string;
  sourceNotice: string;
  debug?: Record<string, unknown>;
};

// 暂时为空数组，项目可根据需要添加路线数据
export const displayRoutes: DisplayRoute[] = [];

// 根据目标人群筛选路线
export function getRoutesByAudience(audience: string): DisplayRoute[] {
  return displayRoutes.filter((route) => route.audience === audience || route.audience === "全部");
}

// 从原始路线数据转换为展示格式
export function convertRouteToDisplay(routeData: any, index: number = 0): DisplayRoute {
  const place = cleanText(routeData.place || routeData.location) || "场地信息待补充";
  const highlight = cleanText(routeData.highlight || routeData.description);

  // 限制 highlight 在 80 字以内
  const limitedHighlight =
    highlight.length > 80 ? highlight.substring(0, 80).replace(/[、，。；：]*$/, "") + "…" : highlight;

  let image = "/assets/placeholders/route-default.png";
  if (routeData.image && routeData.image.startsWith("/")) {
    image = routeData.image;
  } else {
    image = getFallbackImage("路线", index);
  }

  return {
    id: routeData.id || `route-${Date.now()}-${index}`,
    routeName: cleanText(routeData.routeName || routeData.name) || "未命名路线",
    audience: routeData.audience || "全部",
    order: routeData.order,
    time: cleanText(routeData.time),
    place,
    highlight: limitedHighlight,
    image,
    sourceNotice: buildRouteSourceNotice(),
    debug: {
      raw_highlight: routeData.highlight || routeData.description,
      source_pdf: routeData.source_pdf,
    },
  };
}
