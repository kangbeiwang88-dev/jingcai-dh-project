import { RotateCcw, Search } from "lucide-react";
import Tag from "../common/Tag";
import { audienceTypes, districts, ResourceType, resourceTypes } from "../../data/resources";

export type ResourceFilterState = {
  keyword: string;
  type: ResourceType | "全部类型";
  district: string;
  audience: string;
};

export const defaultResourceFilters: ResourceFilterState = {
  keyword: "",
  type: "全部类型",
  district: "全部区域",
  audience: "全部人群",
};

export default function ResourceFilters({ value, onChange, onReset }: { value: ResourceFilterState; onChange: (next: ResourceFilterState) => void; onReset: () => void }) {
  return (
    <div className="card p-4 md:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <label className="flex items-center gap-2 rounded-2xl border border-warmline bg-white px-3 py-2 focus-within:border-cinnabar">
          <Search size={18} className="text-soft" />
          <input value={value.keyword} onChange={(e) => onChange({ ...value, keyword: e.target.value })} className="w-full bg-transparent outline-none" placeholder="搜索资源名称、场馆、展览、演出、活动、地点" />
        </label>
        <select value={value.type} onChange={(e) => onChange({ ...value, type: e.target.value as ResourceType | "全部类型" })} className="rounded-2xl border border-warmline bg-white px-3 py-2"><option>全部类型</option>{resourceTypes.map((t) => <option key={t}>{t}</option>)}</select>
        <select value={value.district} onChange={(e) => onChange({ ...value, district: e.target.value })} className="rounded-2xl border border-warmline bg-white px-3 py-2"><option>全部区域</option>{districts.map((d) => <option key={d}>{d}</option>)}</select>
        <select value={value.audience} onChange={(e) => onChange({ ...value, audience: e.target.value })} className="rounded-2xl border border-warmline bg-white px-3 py-2"><option>全部人群</option>{audienceTypes.map((a) => <option key={a}>{a}</option>)}</select>
        <button onClick={onReset} className="btn-outline inline-flex items-center justify-center gap-2 px-4 py-2"><RotateCcw size={16} /> 重置</button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {resourceTypes.map((t) => <Tag key={t} active={value.type === t} onClick={() => onChange({ ...value, type: t })}>{t}</Tag>)}
      </div>
    </div>
  );
}
