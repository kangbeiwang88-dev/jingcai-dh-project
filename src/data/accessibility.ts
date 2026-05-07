import type { LucideIcon } from "lucide-react";
import { Accessibility, BookOpenText, Car, DoorOpen, MapPinned, Table2, Toilet } from "lucide-react";
import { images } from "./images";
import type { AccessibilityFeatureKey } from "./accessibilityTypes";

export type AccessibilityService = {
  title: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  key: AccessibilityFeatureKey;
};

export const accessibilityServices: AccessibilityService[] = [
  { title: "无障碍出入口", desc: "坡道、平坦通道、专用入口", icon: DoorOpen, image: images.accessibility.entrance, key: "entrance" },
  { title: "无障碍卫生间", desc: "坐便器、扶手、低位洗手池", icon: Toilet, image: images.accessibility.restroom, key: "toilet" },
  { title: "轮椅服务", desc: "轮椅租借、轮椅席位与通行支持", icon: Accessibility, image: images.accessibility.wheelchair, key: "wheelchair" },
  { title: "低位服务台", desc: "咨询接待与服务中心支持", icon: Table2, image: images.accessibility.lowCounter, key: "desk" },
  { title: "盲文/导览支持", desc: "导览图、语音、标识和助视信息", icon: BookOpenText, image: images.accessibility.guide, key: "signage" },
  { title: "无障碍停车", desc: "无障碍车位与停车服务", icon: Car, image: images.accessibility.parking, key: "parking" },
  { title: "无障碍路线", desc: "馆内或园区无障碍游览线路", icon: MapPinned, image: images.accessibility.route, key: "entrance" },
];
