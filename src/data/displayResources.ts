import {
  cleanText,
  extractSummary,
  extractAccessibilityFeatures,
  cleanOpenTime,
  cleanTicket,
  getDistrict,
  getFallbackImage,
  buildSourceNotice,
  isValidImagePath,
} from "./normalize";
import { Resource } from "./resources";

export type DisplayResource = {
  id: string;
  name: string;
  type: string;
  district: string;
  address: string;
  summary: string;
  highlights: string[];
  openTime: string;
  ticket: string;
  phone?: string;
  accessibilityFeatures: string[];
  routeSummary?: string;
  image: string;
  sourceLabel: string;
  sourceNotice: string;
  verifyStatus: "官方来源" | "已核验" | "需人工核验" | "Mock示例";
  debug?: Record<string, unknown>;
};

// 特色资源列表 - 用于默认排序优先显示
const FEATURED_RESOURCES = [
  "故宫博物院",
  "国家大剧院",
  "首都图书馆",
  "中国美术馆",
  "北京市文化馆",
  "北海公园",
  "751 D·PARK",
];

// 为资源分配优先级
function getPriority(resource: Resource, index: number): number {
  const featuredIndex = FEATURED_RESOURCES.findIndex((name) => resource.name.includes(name));
  if (featuredIndex >= 0) {
    return featuredIndex * 1000; // 特色资源优先
  }

  // 按类型分组排序
  const typeOrder: Record<string, number> = {
    "博物馆/美术馆": 10000,
    "剧场/演出": 20000,
    图书馆: 30000,
    文化馆: 40000,
    "公园/景区": 50000,
    "阅读空间": 60000,
    非遗空间: 70000,
  };

  return (typeOrder[resource.type] || 90000) + index;
}

// 从原始 Resource 转换为 DisplayResource
function convertResourceToDisplay(resource: Resource, index: number): DisplayResource {
  const phone = cleanText(resource.phone);
  const address = cleanText(resource.address) || "地址信息待核验";
  const district = getDistrict(address);

  // 提取简介
  const summary = extractSummary(resource.intro, 120);

  // 提取高亮标签
  const highlights: string[] = [];
  if (resource.type) highlights.push(resource.type);
  highlights.push(...(resource.tags || []).slice(0, 3));
  if (resource.isFree) highlights.push("免费开放");
  if (resource.accessibility) highlights.push("无障碍服务");

  // 去重、限制长度
  const uniqueHighlights = [...new Set(highlights)].slice(0, 4);

  // 提取无障碍特性
  const accessibilityFeatures = resource.accessibility
    ? extractAccessibilityFeatures(
        Object.entries(resource.accessibility)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(", ")
      )
    : ["无障碍信息待核验"];

  // 获取或生成图片
  let image = "/assets/placeholders/resource-default.png";
  if (resource.image && isValidImagePath(resource.image)) {
    image = resource.image;
  } else {
    image = getFallbackImage(resource.type, index);
  }

  return {
    id: resource.id,
    name: cleanText(resource.name) || "未命名文化资源",
    type: resource.type || "文化资源",
    district,
    address,
    summary,
    highlights: uniqueHighlights,
    openTime: cleanOpenTime(resource.openTime),
    ticket: cleanTicket(resource.openTime || ""), // 从 openTime 或其他字段提取
    phone: phone || undefined,
    accessibilityFeatures,
    routeSummary: undefined, // 路线信息在 displayRoutes 中
    image,
    sourceLabel: "公开资料整理",
    sourceNotice: buildSourceNotice(),
    verifyStatus: (resource.verifyStatus as DisplayResource["verifyStatus"]) || "需人工核验",
    debug: {
      source_pdf: (resource as any).source_pdf,
      "PDF页码": (resource as any).PDF页码,
      raw_intro: resource.intro,
    },
  };
}

// 生成展示用资源列表
export function generateDisplayResources(resources: Resource[]): DisplayResource[] {
  const displayResources = resources.map(convertResourceToDisplay);

  // 按优先级排序
  displayResources.sort((a, b) => {
    const aIndex = resources.findIndex((r) => r.id === a.id);
    const bIndex = resources.findIndex((r) => r.id === b.id);
    const aPriority = getPriority(resources[aIndex], aIndex);
    const bPriority = getPriority(resources[bIndex], bIndex);
    return aPriority - bPriority;
  });

  return displayResources;
}

// 按类型混排显示（用于默认列表）
export function getMixedDisplayResources(
  displayResources: DisplayResource[],
  count: number = 9
): DisplayResource[] {
  const typeMap: Record<string, DisplayResource[]> = {};

  // 按类型分组
  for (const resource of displayResources) {
    if (!typeMap[resource.type]) {
      typeMap[resource.type] = [];
    }
    typeMap[resource.type].push(resource);
  }

  // 交替取每种类型的资源
  const result: DisplayResource[] = [];
  let typeIndex = 0;
  const types = Object.keys(typeMap);

  while (result.length < count && types.length > 0) {
    const type = types[typeIndex % types.length];
    if (typeMap[type].length > 0) {
      result.push(typeMap[type].shift()!);
    }
    typeIndex++;
  }

  return result;
}
