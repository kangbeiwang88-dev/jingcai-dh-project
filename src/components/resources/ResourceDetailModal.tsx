import { ExternalLink, MapPin, X } from "lucide-react";
import Badge from "../common/Badge";
import Tag from "../common/Tag";
import { Resource } from "../../data/resources";
import { amapSearchUrl } from "../../utils/amap";
import { buildSourceNotice, displayBool } from "../../data/normalize";

export default function ResourceDetailModal({ resource, onClose }: { resource: Resource | null; onClose: () => void }) {
  if (!resource) return null;
  const services = [
    ["无障碍出入口", resource.accessibility?.entrance],
    ["无障碍卫生间", resource.accessibility?.toilet],
    ["轮椅服务", resource.accessibility?.wheelchair],
    ["低位服务台", resource.accessibility?.lowServiceDesk],
    ["盲文/导览支持", resource.accessibility?.brailleGuide],
    ["无障碍路线", resource.accessibility?.accessibleRoute],
  ];
  const amapUrl = resource.amapUrl || amapSearchUrl(`${resource.name} ${resource.address || ""}`);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/45 p-4" role="dialog" aria-modal="true">
      <div className="modal-in max-h-[88vh] w-full max-w-3xl overflow-auto rounded-3xl border border-warmline bg-paper p-6 shadow-lift">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap gap-2"><Badge status={resource.verifyStatus} /><Tag>{resource.type}</Tag></div>
            <h2 className="text-3xl font-black text-ink">{resource.name}</h2>
            <p className="mt-2 text-sm text-muted">{resource.district} · {resource.address || "地址待补充"}</p>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-sand p-2 hover:bg-warmline" aria-label="关闭详情"><X /></button>
        </div>
        <p className="mt-5 text-base leading-8 text-muted">{resource.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">{resource.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
        {resource.accessibility && (
          <div className="mt-6 rounded-3xl border border-warmline bg-[#eef7f1] p-4">
            <h3 className="font-black text-ink">无障碍服务说明</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {services.map(([label, ok]) => (
                <span key={label as string} className={`rounded-2xl px-3 py-2 text-sm font-bold ${ok ? "bg-white text-accessible" : "bg-sand text-muted"}`}>
                  {label}：{displayBool(ok)}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-6 rounded-3xl bg-[#fff0d8] p-4 text-sm leading-7 text-verify">
          {buildSourceNotice()}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={amapUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 px-5 py-3"><MapPin size={18} /> 高德地图</a>
          <a href={resource.officialUrl || amapUrl} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2 px-5 py-3"><ExternalLink size={18} /> 官方入口</a>
        </div>
      </div>
    </div>
  );
}
