import { Resource } from "../data/resources";
import { EventItem } from "../data/events";

export const includesText = (value: string | undefined, keyword: string) =>
  (value || "").toLowerCase().includes(keyword.trim().toLowerCase());

export function resourceMatches(resource: Resource, keyword: string) {
  if (!keyword.trim()) return true;
  return [resource.name, resource.type, resource.district, resource.address, resource.intro, resource.source, ...resource.tags]
    .some((text) => includesText(text, keyword));
}

export function eventMatches(event: EventItem, keyword: string) {
  if (!keyword.trim()) return true;
  return [event.title, event.genre, event.venue, event.performer, event.district, ...event.tags].some((text) => includesText(text, keyword));
}
