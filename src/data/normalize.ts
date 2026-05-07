// 禁止显示字段清单
export const HIDDEN_FIELDS = [
  "PDF页码",
  "PDF页-半页定位",
  "介绍_raw",
  "实用信息_raw",
  "参观/入馆指南_raw",
  "无障碍信息_raw",
  "全文_raw",
  "数据备注",
  "二维码图片路径",
  "普通图片/地图路径",
  "页面渲染图路径",
  "source_pdf",
  "render_path",
  "file_path",
  "bbox_on_page",
  "image_index",
  "xref",
];

const HIDDEN_KEYWORDS = [
  "PDF页码",
  "来源PDF",
  "source_pdf",
  "render_path",
  "bbox",
  "image_index",
  "xref",
  "介绍_raw",
  "实用信息_raw",
  "无障碍信息_raw",
  "全文_raw",
  "数据备注",
];

// 清除多余空格、换行、制表符和开发痕迹
export function cleanText(text: string | undefined | null): string {
  if (!text) return "";

  let result = String(text);

  // 删除 PDF/图片/开发痕迹相关文本
  HIDDEN_KEYWORDS.forEach((keyword) => {
    result = result.replace(new RegExp(`${keyword}[：:]*[^\n]*`, "g"), "");
  });

  // 删除 PDF 页码模式
  result = result.replace(/PDF页码[：:]*\d+/g, "");
  result = result.replace(/页码[：:]*\d+/g, "");

  // 删除图片路径
  result = result.replace(/images?\/?[\w\-\/\.]*\.(?:png|jpg|jpeg|gif|webp)/gi, "");

  // 删除通用抽取痕迹
  result = result.replace(/来源PDF[：:]*[\w\-\/.]*\.pdf/gi, "");
  result = result.replace(/render_path[：:]*[\w\-\/.]*\.(?:png|jpg|jpeg)/gi, "");
  result = result.replace(/bbox_on_page[：:]*[\d\s,\[\]\.]*(?=\n|$)/gi, "");

  // 删除 √ 符号
  result = result.replace(/√/g, "");

  // 删除多余的字段名前缀
  result = result.replace(/[来自源字段]?[：:]*(?=[\u4e00-\u9fa5])/g, "");

  // 清理多余空格和换行
  result = result
    .replace(/\n+/g, " ") // 多个换行转成一个空格
    .replace(/\s+/g, " ") // 多个空格转成一个
    .replace(/\t+/g, " ") // 制表符转成空格
    .trim();

  // 去掉重复的标点
  result = result.replace(/[，、；：。]*[，、；：。]{2,}/g, "。");
  result = result.replace(/[，、]/g, "、"); // 统一逗号格式

  return result;
}

// 规范化布尔标记（√ → true, × → false）
export function normalizeBoolMark(value: unknown): boolean {
  if (!value) return false;

  const str = String(value).toLowerCase().trim();
  const trueValues = ["√", "是", "支持", "有", "提供", "可用", "true", "yes"];
  const falseValues = ["×", "否", "无", "不支持", "暂无", "false", "no"];

  if (trueValues.includes(str)) return true;
  if (falseValues.includes(str)) return false;

  return false;
}

// 展示布尔值
export function displayBool(value: boolean | unknown): string {
  return normalizeBoolMark(value) ? "提供" : "暂无明确说明";
}

// 从原始文本中提取适合公众阅读的简介
export function extractSummary(
  rawText: string | undefined | null,
  maxLength: number = 120
): string {
  if (!rawText) {
    return "暂无简介，开放信息请以官方渠道为准。";
  }

  const cleaned = cleanText(rawText);
  if (!cleaned) {
    return "暂无简介，开放信息请以官方渠道为准。";
  }

  // 取第一个句子或指定长度
  const sentences = cleaned.split(/[。！？]/);
  let summary = sentences[0] || cleaned;

  // 裁剪到指定长度
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength).replace(/[、，。；：]*$/, "") + "…";
  }

  return summary;
}

// 从无障碍相关原始文本中提取服务标签
export function extractAccessibilityFeatures(rawText: string | undefined | null): string[] {
  if (!rawText) return ["无障碍信息待核验"];

  const text = String(rawText).toLowerCase();
  const keywords: Record<string, string[]> = {
    "无障碍出入口": ["出入口", "entrance"],
    "无障碍坡道": ["坡道", "ramp"],
    "无障碍卫生间": ["卫生间", "toilet", "厕所"],
    "轮椅服务": ["轮椅", "wheelchair"],
    "轮椅席位": ["轮椅席", "wheelchair seating"],
    "低位服务台": ["低位", "lowcounter"],
    "无障碍停车": ["停车", "parking"],
    "无障碍路线": ["路线", "route"],
    "电梯": ["电梯", "elevator"],
    "扶手": ["扶手", "handrail"],
    "导览图": ["导览图", "guide map"],
    "盲文导览": ["盲文", "braille"],
    "语音导览": ["语音", "audio guide"],
    "手语服务": ["手语", "sign language"],
    "母婴室": ["母婴室", "baby room"],
    "紧急医疗箱": ["医疗", "first aid"],
    "服务咨询": ["咨询", "consultation"],
    "导引服务": ["导引", "guidance"],
  };

  const features: string[] = [];
  for (const [feature, keywordList] of Object.entries(keywords)) {
    if (keywordList.some((kw: string) => text.includes(kw))) {
      features.push(feature);
    }
  }

  // 去重、限制数量
  const unique = [...new Set(features)];
  if (unique.length === 0) return ["无障碍信息待核验"];

  return unique.slice(0, 6);
}

// 清洗开放时间字段
export function cleanOpenTime(text: string | undefined | null): string {
  if (!text) return "开放时间请以官方公告为准。";

  const cleaned = cleanText(text);
  if (!cleaned) return "开放时间请以官方公告为准。";

  return cleaned;
}

// 清洗门票和政策字段
export function cleanTicket(text: string | undefined | null): string {
  if (!text) return "票务信息请以官方公告为准。";

  let result = cleanText(text);
  if (!result) return "票务信息请以官方公告为准。";

  // 规范化优惠政策表述
  if (/残疾人|残障/.test(result)) {
    result = "残障人士凭有效证件可享相应优惠或免票政策，具体以官方公告为准。";
  }

  return result;
}

// 根据地址提取北京市行政区
export function getDistrict(address: string | undefined | null): string {
  if (!address) return "北京市";

  const text = String(address);
  const districts = [
    "东城区",
    "西城区",
    "朝阳区",
    "海淀区",
    "丰台区",
    "石景山区",
    "通州区",
    "昌平区",
    "大兴区",
    "顺义区",
    "房山区",
    "门头沟区",
    "怀柔区",
    "平谷区",
    "密云区",
    "延庆区",
  ];

  for (const district of districts) {
    if (text.includes(district)) {
      return district;
    }
  }

  return "北京市";
}

// 根据资源类型返回兜底图片
export function getFallbackImage(type: string | undefined, index: number = 0): string {
  if (!type) {
    return "/assets/placeholders/resource-default.png";
  }

  // 按类型匹配对应的 fallback 图片
  if (type.includes("图书馆") || type.includes("阅读")) {
    const readingImages = [
      "/assets/placeholders/reading-1.png",
      "/assets/placeholders/reading-2.png",
      "/assets/placeholders/reading-3.png",
    ];
    return readingImages[index % readingImages.length];
  }

  if (type.includes("文化馆")) {
    const culturalImages = [
      "/assets/placeholders/cultural-1.png",
      "/assets/placeholders/cultural-2.png",
    ];
    return culturalImages[index % culturalImages.length];
  }

  if (type.includes("博物馆") || type.includes("美术馆")) {
    const museumImages = [
      "/assets/placeholders/museum-1.png",
      "/assets/placeholders/museum-2.png",
    ];
    return museumImages[index % museumImages.length];
  }

  if (type.includes("剧场") || type.includes("演出") || type.includes("电影")) {
    const eventImages = [
      "/assets/placeholders/event-1.png",
      "/assets/placeholders/event-2.png",
    ];
    return eventImages[index % eventImages.length];
  }

  if (type.includes("公园") || type.includes("景区")) {
    const parkImages = [
      "/assets/placeholders/park-1.png",
      "/assets/placeholders/park-2.png",
    ];
    return parkImages[index % parkImages.length];
  }

  if (type.includes("非遗")) {
    return "/assets/placeholders/heritage.png";
  }

  return "/assets/placeholders/resource-default.png";
}

// 构建统一来源提示
export function buildSourceNotice(): string {
  return "资料来源：公开资料整理，开放时间、票务政策与服务设施请以官方公告或场馆现场信息为准。";
}

// 构建路线来源提示
export function buildRouteSourceNotice(): string {
  return "资料来源：公开资料整理，路线与服务情况请以官方公告或现场信息为准。";
}

// 检查图片是否为有效的 public 路径
export function isValidImagePath(path: string | undefined): boolean {
  if (!path) return false;

  const str = String(path).toLowerCase();

  // 黑名单：不可用的路径模式
  const invalidPatterns = [
    /^images\//,
    /xref/,
    /render_path/,
    /bbox/,
    /temp/,
    /draft/,
    /_raw/,
  ];

  return !invalidPatterns.some((pattern) => pattern.test(str));
}
