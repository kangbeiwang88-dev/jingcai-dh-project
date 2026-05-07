import { Accessibility, BookOpenText, DoorOpen, Route, Toilet, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";

const services = [
  [DoorOpen, "无障碍出入口"],
  [Users, "手语/导览服务"],
  [Accessibility, "轮椅服务"],
  [BookOpenText, "盲文/大字阅读"],
  [Toilet, "无障碍卫生间"],
  [Route, "无障碍路线"],
];

export default function AccessibilityPreview() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
      <div className="rounded-3xl border border-warmline bg-gradient-to-r from-[#dfeee8] via-paper to-[#f8e5c8] p-6 shadow-soft">
        <SectionTitle title="无障碍文化参与" description="让每一位市民都能平等、便捷地参与文化生活。" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {services.map(([Icon, label]) => (
            <div key={label as string} className="rounded-2xl bg-white/85 p-4 font-black text-inkgreen">
              <Icon size={24} className="mb-2" /> {label as string}
            </div>
          ))}
        </div>
        <Link to="/accessibility" className="btn-secondary mt-6 inline-flex px-5 py-3">查看全部无障碍资源</Link>
      </div>
    </section>
  );
}
