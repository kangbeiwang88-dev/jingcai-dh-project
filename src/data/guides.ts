export type Guide = {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  tags: string[];
};

export const guides: Guide[] = [
  {
    id: "low-cost-culture",
    title: "低成本文化体验",
    category: "公共文化",
    summary: "从免费展览、公共讲座、文化馆课程和阅读活动开始。",
    content: "京彩优先标注免费资源、公共文化空间和需核验的活动入口。涉及预约、票务和开放时间时，请以官方页面为准。",
    tags: ["免费资源", "公共文化", "适合新手"],
  },
  {
    id: "after-work",
    title: "下班后去哪儿",
    category: "夜间文化",
    summary: "筛选晚上时段的展览、演出、阅读与城市文化活动。",
    content: "演出展览信息可能由主办方安排而变更，购票前请再次确认场次、地点、票务和退改规则。",
    tags: ["上班族", "演出", "夜间活动"],
  },
  {
    id: "family-friendly",
    title: "亲子友好活动地图",
    category: "亲子",
    summary: "关注科普、展览、儿童演出和亲子阅读。",
    content: "亲子活动建议提前确认年龄限制、入场规则、活动时长和是否需要预约。",
    tags: ["亲子友好", "科普", "阅读"],
  },
  {
    id: "accessible-guide",
    title: "无障碍文化出行指南",
    category: "无障碍",
    summary: "出行前确认入口、卫生间、轮椅服务、导览和路线。",
    content: "无障碍设施可能因维护、活动安排或现场管理发生变化，出行前建议联系场馆确认。",
    tags: ["无障碍", "轮椅服务", "导览支持"],
  },
  {
    id: "new-beijinger",
    title: "新北京人入门指南",
    category: "城市文化",
    summary: "快速了解北京公共文化资源和城市文化生活入口。",
    content: "从图书馆、文化馆、博物馆、公园景区和经典演出开始，逐步建立自己的北京文化生活地图。",
    tags: ["新北京人/游客", "城市导览", "必看推荐"],
  },
];
