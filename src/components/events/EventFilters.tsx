import { RotateCcw, Search } from "lucide-react";
import { eventGenres, eventTypes } from "../../data/events";
import { audienceTypes, districts } from "../../data/resources";

// 5.4-5.10 周历快捷按钮（2026年5月）
const WEEK_DATES = [
  { value: "2026-05-04", label: "5.4", weekday: "周一" },
  { value: "2026-05-05", label: "5.5", weekday: "周二" },
  { value: "2026-05-06", label: "5.6", weekday: "周三" },
  { value: "2026-05-07", label: "5.7", weekday: "周四" },
  { value: "2026-05-08", label: "5.8", weekday: "周五" },
  { value: "2026-05-09", label: "5.9", weekday: "周六" },
  { value: "2026-05-10", label: "5.10", weekday: "周日" },
];

export type EventFilterState = {
  keyword: string;
  date: string;
  genre: string;
  district: string;
  period: string;
  audience: string;
};

export const defaultEventFilters: EventFilterState = {
  keyword: "",
  date: "全部日期",
  genre: "全部类型",
  district: "全部区域",
  period: "全部时段",
  audience: "全部人群",
};

export default function EventFilters({ value, dates, onChange, onReset }: { value: EventFilterState; dates: string[]; onChange: (value: EventFilterState) => void; onReset: () => void }) {
  return (
    <div className="card p-4 md:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.3fr_0.75fr_0.75fr_0.75fr_0.75fr_0.75fr_auto]">
        <label className="flex items-center gap-2 rounded-2xl border border-warmline bg-white px-3 py-2 focus-within:border-cinnabar">
          <Search size={18} className="text-soft" />
          <input value={value.keyword} onChange={(e) => onChange({ ...value, keyword: e.target.value })} className="w-full bg-transparent outline-none" placeholder="搜索演出/展览名称、场馆、剧院、艺术家" />
        </label>
        <select value={value.date} onChange={(e) => onChange({ ...value, date: e.target.value })} className="rounded-2xl border border-warmline bg-white px-3 py-2"><option>全部日期</option>{dates.map((d) => <option key={d}>{d}</option>)}</select>
        <select value={value.genre} onChange={(e) => onChange({ ...value, genre: e.target.value })} className="rounded-2xl border border-warmline bg-white px-3 py-2"><option>全部类型</option>{[...eventTypes, ...eventGenres].map((g) => <option key={g}>{g}</option>)}</select>
        <select value={value.district} onChange={(e) => onChange({ ...value, district: e.target.value })} className="rounded-2xl border border-warmline bg-white px-3 py-2"><option>全部区域</option>{districts.map((d) => <option key={d}>{d}</option>)}</select>
        <select value={value.period} onChange={(e) => onChange({ ...value, period: e.target.value })} className="rounded-2xl border border-warmline bg-white px-3 py-2"><option>全部时段</option><option>上午</option><option>下午</option><option>晚上</option></select>
        <select value={value.audience} onChange={(e) => onChange({ ...value, audience: e.target.value })} className="rounded-2xl border border-warmline bg-white px-3 py-2"><option>全部人群</option>{audienceTypes.map((a) => <option key={a}>{a}</option>)}</select>
        <button onClick={onReset} className="btn-outline inline-flex items-center justify-center gap-2 px-4 py-2"><RotateCcw size={16} /> 重置</button>
      </div>

      {/* 周历快捷按钮 */}
      <div className="mt-4 flex min-w-max gap-2 overflow-x-auto">
        <span className="flex items-center text-sm text-muted">快捷日期：</span>
        {WEEK_DATES.map((w) => {
          const hasData = dates.includes(w.value);
          const isActive = value.date === w.value;
          return (
            <button
              key={w.value}
              onClick={() => onChange({ ...value, date: isActive ? "全部日期" : w.value })}
              className={`flex flex-col items-center rounded-full px-3 py-1.5 text-xs transition ${isActive ? "bg-cinnabar text-white" : hasData ? "bg-accessible/10 text-accessible hover:bg-accessible/20" : "bg-sand text-muted hover:bg-warmline"}`}
            >
              <span className="font-bold">{w.label}</span>
              <span className="opacity-75">{w.weekday}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
