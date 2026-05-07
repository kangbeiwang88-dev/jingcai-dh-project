import { Accessibility, Baby, Briefcase, GraduationCap, Map, UserRound } from "lucide-react";
import { images } from "./images";

export const audiences = [
  { id: "students", title: "学生", icon: GraduationCap, image: images.audiences.student, desc: "低成本文化体验、公共阅读、讲座与实践活动。", tags: ["学术讲座", "公益实践", "文艺活动"] },
  { id: "workers", title: "上班族", icon: Briefcase, image: images.audiences.worker, desc: "下班后来一场展览、演出或夜间阅读。", tags: ["展览", "演出", "夜间活动"] },
  { id: "seniors", title: "老年人", icon: UserRound, image: images.audiences.senior, desc: "节奏舒缓、交通便利、适合长辈的文化活动。", tags: ["健康养生", "戏曲曲艺", "书法绘画"] },
  { id: "families", title: "亲子家庭", icon: Baby, image: images.audiences.family, desc: "寓教于乐的亲子活动、科普体验与自然探索。", tags: ["亲子活动", "科普体验", "自然探索"] },
  { id: "disabled", title: "残障人士", icon: Accessibility, image: images.audiences.disabled, desc: "关注无障碍服务、导览支持与友好路线。", tags: ["无障碍场馆", "导览支持", "轮椅服务"] },
  { id: "visitors", title: "新北京人/游客", icon: Map, image: images.audiences.tourist, desc: "快速进入北京文化生活，体验城市文化脉络。", tags: ["文化体验", "城市导览", "必看推荐"] },
];

export const audienceGuideCards = [
  "低成本文化体验",
  "下班后去哪儿",
  "亲子友好活动地图",
  "无障碍文化出行指南",
  "新北京人入门指南",
];
