import type { EventItem } from "../data/events";
import type { Resource } from "../data/resources";

const resourceImages = {
  "图书馆": "/assets/page-heroes/reading-hero-library-space.png",
  "阅读空间": "/assets/page-heroes/reading-hero-library-space.png",
  "博物馆/美术馆": "/assets/accessibility/forbidden-city.png",
  "文化馆": "/assets/accessibility/war-memorial.png",
  "剧场/演出": "/assets/page-heroes/events-hero-performance-exhibition.png",
  "公园/景区": "/assets/accessibility/tiantan.png",
  "非遗空间": "/assets/page-heroes/resources-hero-cultural-resources.png",
  "电影/放映": "/assets/page-heroes/events-hero-performance-exhibition.png",
  "其他文化空间": "/assets/page-heroes/culture-map-hero-illustration.png",
} as const;

const eventImages = {
  "展览": "/assets/page-heroes/resources-hero-cultural-resources.png",
  "阅读活动": "/assets/page-heroes/reading-hero-library-space.png",
  "亲子活动": "/assets/page-heroes/audience-hero-cultural-access.png",
  "演出": "/assets/page-heroes/events-hero-performance-exhibition.png",
} as const;

export function resourceCover(resource: Resource) {
  return resource.image || resourceImages[resource.type] || "/assets/page-heroes/home-hero-cultural-life.png";
}

export function eventCover(event: EventItem) {
  if (event.genre.includes("儿童") || event.tags.some((tag) => tag.includes("亲子"))) {
    return "/assets/page-heroes/audience-hero-cultural-access.png";
  }
  return eventImages[event.type] || "/assets/page-heroes/events-hero-performance-exhibition.png";
}
