import { BookOpen, Building2, Clapperboard, Drama, Landmark, Library, Palette, ScrollText } from "lucide-react";
import { ResourceType } from "./resources";
import { images } from "./images";

export const cultureTypes: Array<{ type: ResourceType | "展览" | "电影"; title: string; desc: string; stat: string; icon: typeof BookOpen; image: string }> = [
  { type: "图书馆", title: "图书馆", desc: "书香北京与公共阅读", stat: "整理中", icon: Library, image: images.categories.library },
  { type: "博物馆/美术馆", title: "博物馆", desc: "历史之城与艺术现场", stat: "整理中", icon: Landmark, image: images.categories.museumArt },
  { type: "文化馆", title: "文化馆", desc: "全民艺术与公益课程", stat: "整理中", icon: Building2, image: images.categories.cultureCenter },
  { type: "剧场/演出", title: "演出", desc: "舞台魅力与夜间文化", stat: "整理中", icon: Drama, image: images.categories.theater },
  { type: "展览", title: "展览", desc: "视觉艺术与城市记忆", stat: "待核验", icon: Palette, image: images.categories.museumArt },
  { type: "非遗空间", title: "非遗", desc: "传统匠心与体验活动", stat: "待核验", icon: ScrollText, image: images.categories.cultureMap },
  { type: "阅读空间", title: "阅读空间", desc: "城市书房与安静角落", stat: "整理中", icon: BookOpen, image: images.categories.readingSpace },
  { type: "电影", title: "电影", desc: "光影世界与文化放映", stat: "待核验", icon: Clapperboard, image: images.categories.parkScenic },
];
