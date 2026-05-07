import { MapPin, Ticket, X } from "lucide-react";
import Badge from "../common/Badge";
import Tag from "../common/Tag";
import { EventItem } from "../../data/events";

export default function EventDetailModal({ event, onClose }: { event: EventItem | null; onClose: () => void }) {
  if (!event) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/45 p-4" role="dialog" aria-modal="true">
      <div className="modal-in w-full max-w-2xl rounded-3xl border border-warmline bg-paper p-6 shadow-lift">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap gap-2"><Badge status={event.verifyStatus} /><Tag>{event.type}</Tag><Tag>{event.genre}</Tag></div>
            <h2 className="text-3xl font-black text-ink">{event.title}</h2>
            <p className="mt-2 text-sm text-muted">{event.venue} · {event.district || "区域待补充"}</p>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-sand p-2 hover:bg-warmline" aria-label="关闭详情"><X /></button>
        </div>
        <div className="mt-5 grid gap-3 rounded-3xl border border-warmline bg-white/75 p-4 text-sm text-muted md:grid-cols-2">
          <div><b className="text-ink">日期：</b>{event.date} {event.weekday || ""}</div>
          <div><b className="text-ink">时间：</b>{event.time}</div>
          <div><b className="text-ink">价格：</b>{event.price || "以官方为准"}</div>
          <div><b className="text-ink">地址：</b>{event.address || "待补充"}</div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">{event.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
        <p className="mt-5 rounded-3xl bg-[#fff0d8] p-4 text-sm leading-7 text-verify">演出展览信息可能由主办方安排而变更，请以主办方官方发布为准，购票前请再次确认。来源：{event.source}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={event.ticketUrl || event.mapUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 px-5 py-3"><Ticket size={18} /> 去看看票</a>
          <a href={event.mapUrl} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2 px-5 py-3"><MapPin size={18} /> 百度地图</a>
          <a href={event.amapUrl} target="_blank" rel="noreferrer" className="btn-secondary inline-flex items-center gap-2 px-5 py-3"><MapPin size={18} /> 高德地图</a>
        </div>
      </div>
    </div>
  );
}
