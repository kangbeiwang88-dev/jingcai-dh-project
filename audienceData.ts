export type AudienceKey = "学生" | "上班族" | "老年人" | "亲子家庭" | "残障人士" | "新北京人/游客";

export type AudienceProfile = {
  key: AudienceKey;
  title: string;
  subtitle: string;
  icon: string;
  tags: string[];
  defaultTabLabel: string;
};

export type AudienceRecommendation = {
  id: string;
  audience: AudienceKey;
  sourceType: "resource" | "event" | "accessibility";
  title: string;
  type: string;
  district: string;
  address: string;
  time: string;
  summary: string;
  reason: string;
  tags: string[];
  image: string;
  actionText: string;
  mapUrl?: string;
  officialUrl?: string;
  verifyStatus: "official" | "verified" | "needs_check";
  sourceLabel: string;
  priority: number;
};

export const audienceProfiles: AudienceProfile[] = [
  {
    "key": "学生",
    "title": "学生",
    "subtitle": "低成本文化体验、公共阅读、讲座与实践活动",
    "icon": "/assets/icons/audiences/student.png",
    "tags": [
      "学术讲座",
      "公益实践",
      "文艺活动"
    ],
    "defaultTabLabel": "为学生推荐"
  },
  {
    "key": "上班族",
    "title": "上班族",
    "subtitle": "下班后来一场展览、演出或夜间阅读",
    "icon": "/assets/icons/audiences/worker.png",
    "tags": [
      "展览",
      "演出",
      "夜间活动"
    ],
    "defaultTabLabel": "为上班族推荐"
  },
  {
    "key": "老年人",
    "title": "老年人",
    "subtitle": "节奏舒缓、交通便利、适合长辈的文化活动",
    "icon": "/assets/icons/audiences/senior.png",
    "tags": [
      "健康养生",
      "戏曲曲艺",
      "书法绘画"
    ],
    "defaultTabLabel": "为老年人推荐"
  },
  {
    "key": "亲子家庭",
    "title": "亲子家庭",
    "subtitle": "寓教于乐的亲子活动、科普体验与自然探索",
    "icon": "/assets/icons/audiences/family.png",
    "tags": [
      "亲子活动",
      "科普体验",
      "自然探索"
    ],
    "defaultTabLabel": "为亲子家庭推荐"
  },
  {
    "key": "残障人士",
    "title": "残障人士",
    "subtitle": "关注无障碍服务、导览支持与友好路线",
    "icon": "/assets/icons/audiences/disabled.png",
    "tags": [
      "无障碍场馆",
      "导览支持",
      "轮椅服务"
    ],
    "defaultTabLabel": "为残障人士推荐"
  },
  {
    "key": "新北京人/游客",
    "title": "新北京人/游客",
    "subtitle": "了解北京文化，体验地道城市生活",
    "icon": "/assets/icons/audiences/tourist.png",
    "tags": [
      "文化体验",
      "城市导览",
      "必看推荐"
    ],
    "defaultTabLabel": "为新北京人/游客推荐"
  }
];

export const audienceRecommendations: AudienceRecommendation[] = [
  {
    "id": "aud-学生-BJ-CULT-001",
    "audience": "学生",
    "sourceType": "resource",
    "title": "北京市东城区图书馆",
    "type": "公共图书馆",
    "district": "东城区",
    "address": "北京市东城区交道口东大街85号",
    "time": "周二至周日9:00-21:00（每周一闭馆） 法定节假日开放时间 9:00-17:00",
    "summary": "晚间开放到21:00，适合课后阅读、自习和参加公共讲座。",
    "reason": "晚间开放到21:00，适合课后阅读、自习和参加公共讲座。",
    "tags": [
      "阅读学习",
      "免费低价",
      "学生友好"
    ],
    "image": "/assets/placeholders/reading-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%20%E5%AE%98%E6%96%B9%E7%BD%91%E7%AB%99",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 90
  },
  {
    "id": "aud-学生-BJ-CULT-008",
    "audience": "学生",
    "sourceType": "resource",
    "title": "北京市西城区图书馆（北址）",
    "type": "公共图书馆",
    "district": "西城区",
    "address": "西城区后广平胡同26号",
    "time": "周一：闭馆；周二至周五：09:00-20:30、周六、周日：09:00-17:30",
    "summary": "工作日开放到20:30，适合论文资料查找和稳定自习。",
    "reason": "工作日开放到20:30，适合论文资料查找和稳定自习。",
    "tags": [
      "阅读空间",
      "学习友好",
      "地铁友好"
    ],
    "image": "/assets/placeholders/reading-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E5%8C%97%E4%BA%AC%E5%B8%82%E8%A5%BF%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%EF%BC%88%E5%8C%97%E5%9D%80%EF%BC%89%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E5%B8%82%E8%A5%BF%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%EF%BC%88%E5%8C%97%E5%9D%80%EF%BC%89%20%E5%AE%98%E6%96%B9%E7%BD%91%E7%AB%99",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 86
  },
  {
    "id": "aud-学生-BJ-CULT-029",
    "audience": "学生",
    "sourceType": "resource",
    "title": "北京市东城区文化馆",
    "type": "文化馆",
    "district": "东城区",
    "address": "北京市东城区交道口东大街111号",
    "time": "常年免费开放时间为每日9:00至21:30（双休日、节假日正常开放）",
    "summary": "常年免费开放，适合学生参与公益课程、展览和社群文化活动。",
    "reason": "常年免费开放，适合学生参与公益课程、展览和社群文化活动。",
    "tags": [
      "公益实践",
      "文艺活动",
      "免费活动"
    ],
    "image": "/assets/placeholders/resource-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E6%96%87%E5%8C%96%E9%A6%86%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.bjwhy.org.cn/p_index.html#/index/venue",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 84
  },
  {
    "id": "aud-学生-BJ-CULT-004",
    "audience": "学生",
    "sourceType": "resource",
    "title": "北京市东城区图书馆王府井书店分馆",
    "type": "公共图书馆",
    "district": "东城区",
    "address": "北京市东城区王府井大街218号",
    "time": "周一至周日 10:00-20:00 节假日 10:00-18:00",
    "summary": "位于王府井商圈，适合逛街前后顺路阅读与轻学习。",
    "reason": "位于王府井商圈，适合逛街前后顺路阅读与轻学习。",
    "tags": [
      "阅读空间",
      "城市漫游",
      "学生友好"
    ],
    "image": "/assets/placeholders/reading-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%E7%8E%8B%E5%BA%9C%E4%BA%95%E4%B9%A6%E5%BA%97%E5%88%86%E9%A6%86%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%E7%8E%8B%E5%BA%9C%E4%BA%95%E4%B9%A6%E5%BA%97%E5%88%86%E9%A6%86%20%E5%AE%98%E6%96%B9%E7%BD%91%E7%AB%99",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 75
  },
  {
    "id": "aud-学生-event-17",
    "audience": "学生",
    "sourceType": "event",
    "title": "2026北京亲子儿童音乐会",
    "type": "儿童亲子",
    "district": "北京市",
    "address": "三里屯爱乐汇艺术空间城市演奏厅",
    "time": "2026-05-04 10:30（一）",
    "summary": "三里屯爱乐汇艺术空间城市演奏厅 · 儿童音乐会。适合作为课余文化体验或艺术通识拓展。",
    "reason": "适合作为课余文化体验或艺术通识拓展。",
    "tags": [
      "学生研学",
      "音乐爱好",
      "课余活动"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/三里屯爱乐汇艺术空间城市演奏厅",
    "officialUrl": "https://www.baidu.com/s?wd=三里屯爱乐汇艺术空间城市演奏厅 2026北京亲子儿童音乐会",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 70
  },
  {
    "id": "aud-学生-event-71",
    "audience": "学生",
    "sourceType": "event",
    "title": "男儿当自强·燃动起势——国潮破界·中西乐器和鸣音乐",
    "type": "音乐现场",
    "district": "北京市",
    "address": "梅兰芳大剧院大剧场",
    "time": "2026-05-04 14:00（一）",
    "summary": "梅兰芳大剧院大剧场 · 音乐会。适合作为课余文化体验或艺术通识拓展。",
    "reason": "适合作为课余文化体验或艺术通识拓展。",
    "tags": [
      "学生研学",
      "音乐爱好",
      "课余活动"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/梅兰芳大剧院大剧场",
    "officialUrl": "https://www.baidu.com/s?wd=梅兰芳大剧院大剧场 男儿当自强·燃动起势——国潮破界·中西乐器和鸣音乐",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 70
  },
  {
    "id": "aud-上班族-BJ-CULT-001",
    "audience": "上班族",
    "sourceType": "resource",
    "title": "北京市东城区图书馆",
    "type": "公共图书馆",
    "district": "东城区",
    "address": "北京市东城区交道口东大街85号",
    "time": "周二至周日9:00-21:00（每周一闭馆） 法定节假日开放时间 9:00-17:00",
    "summary": "晚间开放时间较长，适合下班后阅读、充电或短暂停留。",
    "reason": "晚间开放时间较长，适合下班后阅读、充电或短暂停留。",
    "tags": [
      "下班后",
      "阅读空间",
      "低成本"
    ],
    "image": "/assets/placeholders/reading-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%20%E5%AE%98%E6%96%B9%E7%BD%91%E7%AB%99",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 88
  },
  {
    "id": "aud-上班族-BJ-CULT-008",
    "audience": "上班族",
    "sourceType": "resource",
    "title": "北京市西城区图书馆（北址）",
    "type": "公共图书馆",
    "district": "西城区",
    "address": "西城区后广平胡同26号",
    "time": "周一：闭馆；周二至周五：09:00-20:30、周六、周日：09:00-17:30",
    "summary": "工作日晚间可用，适合通勤后安静阅读和自我提升。",
    "reason": "工作日晚间可用，适合通勤后安静阅读和自我提升。",
    "tags": [
      "下班后",
      "安静阅读",
      "学习充电"
    ],
    "image": "/assets/placeholders/reading-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E5%8C%97%E4%BA%AC%E5%B8%82%E8%A5%BF%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%EF%BC%88%E5%8C%97%E5%9D%80%EF%BC%89%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.baidu.com/s?wd=%E5%8C%97%E4%BA%AC%E5%B8%82%E8%A5%BF%E5%9F%8E%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%EF%BC%88%E5%8C%97%E5%9D%80%EF%BC%89%20%E5%AE%98%E6%96%B9%E7%BD%91%E7%AB%99",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 84
  },
  {
    "id": "aud-上班族-BJ-CULT-030",
    "audience": "上班族",
    "sourceType": "resource",
    "title": "北京市西城区文化馆",
    "type": "文化馆",
    "district": "西城区",
    "address": "西城区西直门内大街147号",
    "time": "周一至周日：08:00-22:00",
    "summary": "开放至晚间，适合下班后参与文艺课程、展览或社区文化活动。",
    "reason": "开放至晚间，适合下班后参与文艺课程、展览或社区文化活动。",
    "tags": [
      "夜间活动",
      "公共文化",
      "低成本"
    ],
    "image": "/assets/placeholders/resource-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E5%8C%97%E4%BA%AC%E5%B8%82%E8%A5%BF%E5%9F%8E%E5%8C%BA%E6%96%87%E5%8C%96%E9%A6%86%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.bjwhy.org.cn/p_index.html#/index/venue",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 82
  },
  {
    "id": "aud-上班族-BJ-CULT-031",
    "audience": "上班族",
    "sourceType": "resource",
    "title": "朝阳区文化馆",
    "type": "文化馆",
    "district": "朝阳区",
    "address": "朝阳区朝外小庄金台里17号",
    "time": "9:00—21：00",
    "summary": "面向公众开放，适合在工作生活圈附近参加文化体验。",
    "reason": "面向公众开放，适合在工作生活圈附近参加文化体验。",
    "tags": [
      "工作圈",
      "公共文化",
      "轻参与"
    ],
    "image": "/assets/placeholders/resource-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E6%9C%9D%E9%98%B3%E5%8C%BA%E6%96%87%E5%8C%96%E9%A6%86%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.bjwhy.org.cn/p_index.html#/index/venue",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 76
  },
  {
    "id": "aud-上班族-event-202",
    "audience": "上班族",
    "sourceType": "event",
    "title": "周中开放麦周末精选秀",
    "type": "喜剧脱口秀",
    "district": "北京市",
    "address": "南阳共享际剧场",
    "time": "2026-05-04 18:00（一）",
    "summary": "南阳共享际剧场 · 脱口秀。晚间场次更适合下班后放松和社交。",
    "reason": "晚间场次更适合下班后放松和社交。",
    "tags": [
      "下班后",
      "轻松社交",
      "夜间演出"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/南阳共享际剧场",
    "officialUrl": "https://www.baidu.com/s?wd=南阳共享际剧场 周中开放麦周末精选秀",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 72
  },
  {
    "id": "aud-上班族-event-206",
    "audience": "上班族",
    "sourceType": "event",
    "title": "【前门脱口秀】爆笑解压专场",
    "type": "喜剧脱口秀",
    "district": "北京市",
    "address": "三喜剧场(曼联梦剧场店)",
    "time": "2026-05-04 18:00（一）",
    "summary": "三喜剧场(曼联梦剧场店) · 脱口秀。晚间场次更适合下班后放松和社交。",
    "reason": "晚间场次更适合下班后放松和社交。",
    "tags": [
      "下班后",
      "轻松社交",
      "夜间演出"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/三喜剧场(曼联梦剧场店)",
    "officialUrl": "https://www.baidu.com/s?wd=三喜剧场(曼联梦剧场店) 【前门脱口秀】爆笑解压专场",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 72
  },
  {
    "id": "aud-上班族-event-209",
    "audience": "上班族",
    "sourceType": "event",
    "title": "精品脱口秀《喜剧专场》",
    "type": "喜剧脱口秀",
    "district": "北京市",
    "address": "爱笑喜剧三里屯店1号厅",
    "time": "2026-05-04 18:00（一）",
    "summary": "爱笑喜剧三里屯店1号厅 · 脱口秀。晚间场次更适合下班后放松和社交。",
    "reason": "晚间场次更适合下班后放松和社交。",
    "tags": [
      "下班后",
      "轻松社交",
      "夜间演出"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/爱笑喜剧三里屯店1号厅",
    "officialUrl": "https://www.baidu.com/s?wd=爱笑喜剧三里屯店1号厅 精品脱口秀《喜剧专场》",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 72
  },
  {
    "id": "aud-老年人-acc-北京市西城区第一文化馆",
    "audience": "老年人",
    "sourceType": "accessibility",
    "title": "北京市西城区第一文化馆",
    "type": "文化馆",
    "district": "西城区",
    "address": "北京市西城区西直门内大街147 号 信息名称 是 否",
    "time": "9：00——17：00，全年开放开不闭馆。 常年的活动有演出、展览、电影、辅导、排练、公益 培训等，是文化部授予的地市级“一级文化馆”。特 色品牌活动有：“看大",
    "summary": "适合参与书画、曲艺、合唱等社区文化活动。",
    "reason": "适合参与书画、曲艺、合唱等社区文化活动。",
    "tags": [
      "适合长辈",
      "公共文化",
      "书画曲艺"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/北京市西城区第一文化馆",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 88
  },
  {
    "id": "aud-老年人-acc-天坛公园",
    "audience": "老年人",
    "sourceType": "accessibility",
    "title": "天坛公园",
    "type": "景区",
    "district": "东城区",
    "address": "北京市东城区天坛内东里7 号",
    "time": "旺季 4.1-10.31 淡季 11.1-3.31 公园大门 旺季开放时间6:00-21:00 淡季开放时间6:30-21:00 静园时间：22 点 景点：（含",
    "summary": "文化地标清晰、游览节奏舒缓，适合长辈散步与传统文化体验。",
    "reason": "文化地标清晰、游览节奏舒缓，适合长辈散步与传统文化体验。",
    "tags": [
      "散步友好",
      "历史文化",
      "无障碍设施"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/天坛公园",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 86
  },
  {
    "id": "aud-老年人-acc-东城区第一文化馆",
    "audience": "老年人",
    "sourceType": "accessibility",
    "title": "东城区第一文化馆",
    "type": "文化馆",
    "district": "东城区",
    "address": "北京市东城区交道口东大街111 号",
    "time": "开放时间请以官方公告为准",
    "summary": "公益文化活动丰富，适合长辈日常文化参与。",
    "reason": "公益文化活动丰富，适合长辈日常文化参与。",
    "tags": [
      "公益活动",
      "社区文化",
      "长辈友好"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/东城区第一文化馆",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 84
  },
  {
    "id": "aud-老年人-acc-首都图书馆",
    "audience": "老年人",
    "sourceType": "accessibility",
    "title": "首都图书馆",
    "type": "图书馆",
    "district": "北京市",
    "address": "地址信息待核验",
    "time": "开放时间请以官方公告为准",
    "summary": "公共阅读资源丰富，适合长辈阅读、听讲座与安静休闲。",
    "reason": "公共阅读资源丰富，适合长辈阅读、听讲座与安静休闲。",
    "tags": [
      "阅读空间",
      "公共文化",
      "服务完善"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/首都图书馆",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 82
  },
  {
    "id": "aud-老年人-acc-故宫博物院",
    "audience": "老年人",
    "sourceType": "accessibility",
    "title": "故宫博物院",
    "type": "景区",
    "district": "西城区",
    "address": "西城区景山前街4 号。",
    "time": "旺季 4.1-10.31 淡季 11.1-3.31 开始售票 开放进馆时间 8:30 开始售票 开放进馆时间 8:30 止票时间 （含钟表馆、 珍宝馆） 16:",
    "summary": "代表性历史文化地标，适合有计划的慢游参观。",
    "reason": "代表性历史文化地标，适合有计划的慢游参观。",
    "tags": [
      "历史文化",
      "经典地标",
      "需预约"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/故宫博物院",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 70
  },
  {
    "id": "aud-老年人-event-11",
    "audience": "老年人",
    "sourceType": "event",
    "title": "《老舍茶馆京味儿相声专场》",
    "type": "传统戏曲曲艺",
    "district": "北京市",
    "address": "老舍茶馆",
    "time": "2026-05-04 10:30（一）",
    "summary": "老舍茶馆 · 相声。戏曲曲艺类内容更适合长辈的传统文化偏好。",
    "reason": "戏曲曲艺类内容更适合长辈的传统文化偏好。",
    "tags": [
      "戏曲曲艺",
      "京味文化",
      "长辈友好"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/老舍茶馆",
    "officialUrl": "https://www.baidu.com/s?wd=老舍茶馆 《老舍茶馆京味儿相声专场》",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 68
  },
  {
    "id": "aud-老年人-event-28",
    "audience": "老年人",
    "sourceType": "event",
    "title": "茶馆盛世园相声大会",
    "type": "传统戏曲曲艺",
    "district": "北京市",
    "address": "盛世园",
    "time": "2026-05-04 11:00（一）",
    "summary": "盛世园 · 相声。戏曲曲艺类内容更适合长辈的传统文化偏好。",
    "reason": "戏曲曲艺类内容更适合长辈的传统文化偏好。",
    "tags": [
      "戏曲曲艺",
      "京味文化",
      "长辈友好"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/盛世园",
    "officialUrl": "https://www.baidu.com/s?wd=盛世园 茶馆盛世园相声大会",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 68
  },
  {
    "id": "aud-亲子家庭-acc-北京动物园",
    "audience": "亲子家庭",
    "sourceType": "accessibility",
    "title": "北京动物园",
    "type": "景区",
    "district": "西城区",
    "address": "北京市西城区西直门外大街137 号",
    "time": "4 月1 日——10 月31 日 7：30——18： 月1 日——3 月31 日 7：30——17：00",
    "summary": "科普属性强，适合亲子家庭进行自然观察和周末出行。",
    "reason": "科普属性强，适合亲子家庭进行自然观察和周末出行。",
    "tags": [
      "亲子友好",
      "自然科普",
      "周末可去"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/北京动物园",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 90
  },
  {
    "id": "aud-亲子家庭-acc-首都图书馆",
    "audience": "亲子家庭",
    "sourceType": "accessibility",
    "title": "首都图书馆",
    "type": "图书馆",
    "district": "北京市",
    "address": "地址信息待核验",
    "time": "开放时间请以官方公告为准",
    "summary": "适合亲子共读、儿童阅读和公共文化体验。",
    "reason": "适合亲子共读、儿童阅读和公共文化体验。",
    "tags": [
      "亲子阅读",
      "公共图书馆",
      "学习友好"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/首都图书馆",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 86
  },
  {
    "id": "aud-亲子家庭-acc-北京奥林匹克公园",
    "audience": "亲子家庭",
    "sourceType": "accessibility",
    "title": "北京奥林匹克公园",
    "type": "景区",
    "district": "朝阳区",
    "address": "北京奥林匹克公园位于北京市朝阳区，地处 北京城中轴线北端，北至清河南岸，南至北土城路， 东至安立路和北辰东路，西至林翠路和北辰西路。",
    "time": "园区：6:00-22:00 水立方二维码 公园二维码",
    "summary": "户外空间开阔，适合亲子散步、骑行和城市景观游览。",
    "reason": "户外空间开阔，适合亲子散步、骑行和城市景观游览。",
    "tags": [
      "亲子散步",
      "户外空间",
      "交通便利"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/北京奥林匹克公园",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 82
  },
  {
    "id": "aud-亲子家庭-acc-北京欢乐谷",
    "audience": "亲子家庭",
    "sourceType": "accessibility",
    "title": "北京欢乐谷",
    "type": "景区",
    "district": "朝阳区",
    "address": "北京市朝阳区东四环小武基北路",
    "time": "开闭园时间：8:30-22:00 注：当日设备开放情况依据天气情况动态调整，请 以现场公告为准。",
    "summary": "主题娱乐和演艺内容丰富，适合家庭型休闲体验。",
    "reason": "主题娱乐和演艺内容丰富，适合家庭型休闲体验。",
    "tags": [
      "亲子活动",
      "主题游乐",
      "周末出行"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/北京欢乐谷",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 78
  },
  {
    "id": "aud-亲子家庭-event-2",
    "audience": "亲子家庭",
    "sourceType": "event",
    "title": "《勇敢大冒险》",
    "type": "儿童亲子",
    "district": "北京市",
    "address": "老故事503文创园Story剧场",
    "time": "2026-05-04 10:00（一）",
    "summary": "老故事503文创园Story剧场 · 儿童沉浸式剧。儿童亲子类演出适合家庭周末共同参与。",
    "reason": "儿童亲子类演出适合家庭周末共同参与。",
    "tags": [
      "亲子/儿童",
      "周末活动",
      "互动体验"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/老故事503文创园Story剧场",
    "officialUrl": "https://www.baidu.com/s?wd=老故事503文创园Story剧场 《勇敢大冒险》",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 75
  },
  {
    "id": "aud-亲子家庭-event-3",
    "audience": "亲子家庭",
    "sourceType": "event",
    "title": "《白雪公主》",
    "type": "儿童亲子",
    "district": "北京市",
    "address": "东图剧场-汇空间",
    "time": "2026-05-04 10:30（一）",
    "summary": "东图剧场-汇空间 · 儿童剧。儿童亲子类演出适合家庭周末共同参与。",
    "reason": "儿童亲子类演出适合家庭周末共同参与。",
    "tags": [
      "亲子/儿童",
      "周末活动",
      "互动体验"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/东图剧场-汇空间",
    "officialUrl": "https://www.baidu.com/s?wd=东图剧场-汇空间 《白雪公主》",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 75
  },
  {
    "id": "aud-亲子家庭-event-4",
    "audience": "亲子家庭",
    "sourceType": "event",
    "title": "《小王子》",
    "type": "儿童亲子",
    "district": "北京市",
    "address": "假日经典小剧场",
    "time": "2026-05-04 10:30（一）",
    "summary": "假日经典小剧场 · 儿童剧。儿童亲子类演出适合家庭周末共同参与。",
    "reason": "儿童亲子类演出适合家庭周末共同参与。",
    "tags": [
      "亲子/儿童",
      "周末活动",
      "互动体验"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/假日经典小剧场",
    "officialUrl": "https://www.baidu.com/s?wd=假日经典小剧场 《小王子》",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 75
  },
  {
    "id": "aud-亲子家庭-event-5",
    "audience": "亲子家庭",
    "sourceType": "event",
    "title": "《朱迪警官》",
    "type": "儿童亲子",
    "district": "北京市",
    "address": "这家厂牌(南锣)剧场",
    "time": "2026-05-04 10:30（一）",
    "summary": "这家厂牌(南锣)剧场 · 儿童剧。儿童亲子类演出适合家庭周末共同参与。",
    "reason": "儿童亲子类演出适合家庭周末共同参与。",
    "tags": [
      "亲子/儿童",
      "周末活动",
      "互动体验"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/这家厂牌(南锣)剧场",
    "officialUrl": "https://www.baidu.com/s?wd=这家厂牌(南锣)剧场 《朱迪警官》",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 75
  },
  {
    "id": "aud-残障人士-acc-故宫博物院",
    "audience": "残障人士",
    "sourceType": "accessibility",
    "title": "故宫博物院",
    "type": "景区",
    "district": "西城区",
    "address": "西城区景山前街4 号。",
    "time": "旺季 4.1-10.31 淡季 11.1-3.31 开始售票 开放进馆时间 8:30 开始售票 开放进馆时间 8:30 止票时间 （含钟表馆、 珍宝馆） 16:",
    "summary": "设有较完整的无障碍游览线路和多类无障碍服务，适合提前规划路线。",
    "reason": "设有较完整的无障碍游览线路和多类无障碍服务，适合提前规划路线。",
    "tags": [
      "无障碍坡道",
      "低位服务台",
      "轮椅服务",
      "无障碍卫生间"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/故宫博物院",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 92
  },
  {
    "id": "aud-残障人士-acc-天坛公园",
    "audience": "残障人士",
    "sourceType": "accessibility",
    "title": "天坛公园",
    "type": "景区",
    "district": "东城区",
    "address": "北京市东城区天坛内东里7 号",
    "time": "旺季 4.1-10.31 淡季 11.1-3.31 公园大门 旺季开放时间6:00-21:00 淡季开放时间6:30-21:00 静园时间：22 点 景点：（含",
    "summary": "有无障碍游览线路、无障碍卫生间和停车服务，适合慢游。",
    "reason": "有无障碍游览线路、无障碍卫生间和停车服务，适合慢游。",
    "tags": [
      "无障碍路线",
      "无障碍卫生间",
      "无障碍停车"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/天坛公园",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 88
  },
  {
    "id": "aud-残障人士-acc-首都图书馆",
    "audience": "残障人士",
    "sourceType": "accessibility",
    "title": "首都图书馆",
    "type": "图书馆",
    "district": "北京市",
    "address": "地址信息待核验",
    "time": "开放时间请以官方公告为准",
    "summary": "公共图书馆场景更适合稳定停留，便于阅读和获取服务。",
    "reason": "公共图书馆场景更适合稳定停留，便于阅读和获取服务。",
    "tags": [
      "无障碍阅读",
      "公共服务",
      "导览支持"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/首都图书馆",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 84
  },
  {
    "id": "aud-残障人士-acc-北京奥林匹克公园",
    "audience": "残障人士",
    "sourceType": "accessibility",
    "title": "北京奥林匹克公园",
    "type": "景区",
    "district": "朝阳区",
    "address": "北京奥林匹克公园位于北京市朝阳区，地处 北京城中轴线北端，北至清河南岸，南至北土城路， 东至安立路和北辰东路，西至林翠路和北辰西路。",
    "time": "园区：6:00-22:00 水立方二维码 公园二维码",
    "summary": "道路相对平坦、空间开阔，适合轮椅通行与户外游览。",
    "reason": "道路相对平坦、空间开阔，适合轮椅通行与户外游览。",
    "tags": [
      "平坦路线",
      "轮椅友好",
      "无障碍停车"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/北京奥林匹克公园",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 80
  },
  {
    "id": "aud-残障人士-acc-中国抗日战争纪念馆",
    "audience": "残障人士",
    "sourceType": "accessibility",
    "title": "中国抗日战争纪念馆",
    "type": "景区",
    "district": "丰台区",
    "address": "北京市丰台区卢沟桥宛平城内街101 号",
    "time": "09：00-16：30，中午不休息，按规 定时间提供讲解，16：00 停止取票。（周一闭馆， 法定节假日、重要抗战纪念日照常开放） 团体预约：010-63777",
    "summary": "展陈空间相对集中，适合按馆内动线进行无障碍参观。",
    "reason": "展陈空间相对集中，适合按馆内动线进行无障碍参观。",
    "tags": [
      "纪念馆",
      "无障碍坡道",
      "室内参观"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/中国抗日战争纪念馆",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 78
  },
  {
    "id": "aud-残障人士-acc-北京动物园",
    "audience": "残障人士",
    "sourceType": "accessibility",
    "title": "北京动物园",
    "type": "景区",
    "district": "西城区",
    "address": "北京市西城区西直门外大街137 号",
    "time": "4 月1 日——10 月31 日 7：30——18： 月1 日——3 月31 日 7：30——17：00",
    "summary": "多处场馆设有坡道和卫生间，适合提前确认路线后出行。",
    "reason": "多处场馆设有坡道和卫生间，适合提前确认路线后出行。",
    "tags": [
      "无障碍坡道",
      "家庭卫生间",
      "轮椅服务"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/北京动物园",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 76
  },
  {
    "id": "aud-新北京人/游客-acc-故宫博物院",
    "audience": "新北京人/游客",
    "sourceType": "accessibility",
    "title": "故宫博物院",
    "type": "景区",
    "district": "西城区",
    "address": "西城区景山前街4 号。",
    "time": "旺季 4.1-10.31 淡季 11.1-3.31 开始售票 开放进馆时间 8:30 开始售票 开放进馆时间 8:30 止票时间 （含钟表馆、 珍宝馆） 16:",
    "summary": "北京最具代表性的历史文化地标，适合作为城市文化第一站。",
    "reason": "北京最具代表性的历史文化地标，适合作为城市文化第一站。",
    "tags": [
      "北京地标",
      "历史文化",
      "必看推荐"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/故宫博物院",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 95
  },
  {
    "id": "aud-新北京人/游客-acc-天坛公园",
    "audience": "新北京人/游客",
    "sourceType": "accessibility",
    "title": "天坛公园",
    "type": "景区",
    "district": "东城区",
    "address": "北京市东城区天坛内东里7 号",
    "time": "旺季 4.1-10.31 淡季 11.1-3.31 公园大门 旺季开放时间6:00-21:00 淡季开放时间6:30-21:00 静园时间：22 点 景点：（含",
    "summary": "世界文化遗产与中轴线文化代表空间，适合初到北京者理解城市历史。",
    "reason": "世界文化遗产与中轴线文化代表空间，适合初到北京者理解城市历史。",
    "tags": [
      "世界遗产",
      "城市漫游",
      "历史文化"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/天坛公园",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 90
  },
  {
    "id": "aud-新北京人/游客-acc-北京奥林匹克公园",
    "audience": "新北京人/游客",
    "sourceType": "accessibility",
    "title": "北京奥林匹克公园",
    "type": "景区",
    "district": "朝阳区",
    "address": "北京奥林匹克公园位于北京市朝阳区，地处 北京城中轴线北端，北至清河南岸，南至北土城路， 东至安立路和北辰东路，西至林翠路和北辰西路。",
    "time": "园区：6:00-22:00 水立方二维码 公园二维码",
    "summary": "展现现代北京城市形象，适合夜景、散步和公共空间体验。",
    "reason": "展现现代北京城市形象，适合夜景、散步和公共空间体验。",
    "tags": [
      "现代北京",
      "城市地标",
      "夜游友好"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/北京奥林匹克公园",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 84
  },
  {
    "id": "aud-新北京人/游客-acc-首都图书馆",
    "audience": "新北京人/游客",
    "sourceType": "accessibility",
    "title": "首都图书馆",
    "type": "图书馆",
    "district": "北京市",
    "address": "地址信息待核验",
    "time": "开放时间请以官方公告为准",
    "summary": "适合作为了解北京公共文化服务体系的窗口。",
    "reason": "适合作为了解北京公共文化服务体系的窗口。",
    "tags": [
      "公共文化",
      "阅读空间",
      "城市服务"
    ],
    "image": "/assets/placeholders/accessibility-default.png",
    "actionText": "查看无障碍信息",
    "mapUrl": "https://map.baidu.com/search/首都图书馆",
    "officialUrl": "",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 78
  },
  {
    "id": "aud-新北京人/游客-BJ-CULT-029",
    "audience": "新北京人/游客",
    "sourceType": "resource",
    "title": "北京市东城区文化馆",
    "type": "文化馆",
    "district": "东城区",
    "address": "北京市东城区交道口东大街111号",
    "time": "常年免费开放时间为每日9:00至21:30（双休日、节假日正常开放）",
    "summary": "可体验本地公共文化活动，适合新北京人融入社区文化。",
    "reason": "可体验本地公共文化活动，适合新北京人融入社区文化。",
    "tags": [
      "社区文化",
      "公共文化",
      "本地体验"
    ],
    "image": "/assets/placeholders/resource-default.png",
    "actionText": "查看资源",
    "mapUrl": "https://map.baidu.com/search/%E5%8C%97%E4%BA%AC%E5%B8%82%E4%B8%9C%E5%9F%8E%E5%8C%BA%E6%96%87%E5%8C%96%E9%A6%86%20%E5%8C%97%E4%BA%AC",
    "officialUrl": "https://www.bjwhy.org.cn/p_index.html#/index/venue",
    "verifyStatus": "needs_check",
    "sourceLabel": "公开资料整理",
    "priority": 76
  },
  {
    "id": "aud-新北京人/游客-event-10",
    "audience": "新北京人/游客",
    "sourceType": "event",
    "title": "《古彩戏法鹅幻汇编》非遗宫廷魔术亲子专场",
    "type": "儿童亲子",
    "district": "北京市",
    "address": "三喜剧场(曼联梦剧场店)",
    "time": "2026-05-04 10:30（一）",
    "summary": "三喜剧场(曼联梦剧场店) · 儿童魔术。具有京味文化或传统曲艺属性，适合快速体验北京文化氛围。",
    "reason": "具有京味文化或传统曲艺属性，适合快速体验北京文化氛围。",
    "tags": [
      "京味文化",
      "演出体验",
      "游客友好"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/三喜剧场(曼联梦剧场店)",
    "officialUrl": "https://www.baidu.com/s?wd=三喜剧场(曼联梦剧场店) 《古彩戏法鹅幻汇编》非遗宫廷魔术亲子专场",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 73
  },
  {
    "id": "aud-新北京人/游客-event-11",
    "audience": "新北京人/游客",
    "sourceType": "event",
    "title": "《老舍茶馆京味儿相声专场》",
    "type": "传统戏曲曲艺",
    "district": "北京市",
    "address": "老舍茶馆",
    "time": "2026-05-04 10:30（一）",
    "summary": "老舍茶馆 · 相声。具有京味文化或传统曲艺属性，适合快速体验北京文化氛围。",
    "reason": "具有京味文化或传统曲艺属性，适合快速体验北京文化氛围。",
    "tags": [
      "京味文化",
      "演出体验",
      "游客友好"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/老舍茶馆",
    "officialUrl": "https://www.baidu.com/s?wd=老舍茶馆 《老舍茶馆京味儿相声专场》",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 73
  },
  {
    "id": "aud-新北京人/游客-event-28",
    "audience": "新北京人/游客",
    "sourceType": "event",
    "title": "茶馆盛世园相声大会",
    "type": "传统戏曲曲艺",
    "district": "北京市",
    "address": "盛世园",
    "time": "2026-05-04 11:00（一）",
    "summary": "盛世园 · 相声。具有京味文化或传统曲艺属性，适合快速体验北京文化氛围。",
    "reason": "具有京味文化或传统曲艺属性，适合快速体验北京文化氛围。",
    "tags": [
      "京味文化",
      "演出体验",
      "游客友好"
    ],
    "image": "/assets/placeholders/event-default.png",
    "actionText": "查看演出",
    "mapUrl": "https://map.baidu.com/search/盛世园",
    "officialUrl": "https://www.baidu.com/s?wd=盛世园 茶馆盛世园相声大会",
    "verifyStatus": "needs_check",
    "sourceLabel": "北京市文化和旅游局商业演出信息整理",
    "priority": 73
  }
];

export const getRecommendationsByAudience = (audience: AudienceKey) =>
  audienceRecommendations
    .filter((item) => item.audience === audience)
    .sort((a, b) => b.priority - a.priority);
