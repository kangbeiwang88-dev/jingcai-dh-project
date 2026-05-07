import { CalendarDays, MapPin, Ticket } from "lucide-react";
import Badge from "../common/Badge";
import Tag from "../common/Tag";
import { EventItem } from "../../data/events";
import { images } from "../../data/images";

// 演出类型图标映射
const eventTypeIcons: Record<string, string> = images.eventTypes;

export default function EventCard({ event, onDetail }: { event: EventItem; onDetail: (event: EventItem) => void }) {
  // 获取演出类型图标
  const eventIcon = eventTypeIcons[event.genre] || eventTypeIcons[event.type] || null;
  
  return (
    <article className="card group grid gap-4 overflow-hidden p-4 md:grid-cols-[220px_1fr_auto]">
      <div className="h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f4dfbd] via-[#fff8ee] to-[#d7e7df]">
        {eventIcon ? (
          <img 
            src={eventIcon} 
            alt={event.genre || event.type}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]" 
          />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl font-black text-cinnabar transition duration-500 group-hover:scale-[1.04]">{event.type}</div>
        )}
      </div>
      <button onClick={() => onDetail(event)} className="text-left">
        <div className="flex flex-wrap gap-2"><Badge status={event.verifyStatus} /><Tag>{event.genre}</Tag></div>
        <h3 className="mt-3 text-xl font-black text-ink">{event.title}</h3>
        <p className="mt-2 text-sm text-muted">{event.venue} · {event.district || "区域待补充"}</p>
        <p className="mt-2 flex items-center gap-2 text-sm font-bold text-muted"><CalendarDays size={16} /> {event.date} {event.weekday || ""} {event.time}</p>
        <p className="mt-2 text-sm font-bold text-cinnabar">价格：{event.price || "以官方为准"}</p>
        <div className="mt-3 flex flex-wrap gap-2">{event.tags.slice(0, 4).map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      </button>
      <div className="flex shrink-0 flex-row gap-2 md:flex-col md:justify-center">
        <a href={event.ticketUrl || event.mapUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm whitespace-nowrap"><Ticket size={16} /> 去看看票</a>
        <a href={event.mapUrl} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center justify-center gap-2 px-4 py-2 text-sm whitespace-nowrap"><MapPin size={16} /> 地图导航</a>
        <button onClick={() => onDetail(event)} className="btn-secondary px-4 py-2 text-sm whitespace-nowrap">详情</button>
      </div>
    </article>
  );
}
