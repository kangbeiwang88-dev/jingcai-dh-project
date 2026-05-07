import { Accessibility, Baby, BookOpen, CalendarDays, GraduationCap, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { images } from "../../data/images";

const scenes = [
  { icon: CalendarDays, image: images.scenarios.performance, title: "找场活动", desc: "看看本周文化现场", to: "/events" },
  { icon: Images, image: images.scenarios.exhibition, title: "去看展览", desc: "探索艺术与历史", to: "/events?type=展览" },
  { icon: BookOpen, image: images.scenarios.library, title: "找本好书", desc: "公共阅读与城市书房", to: "/reading" },
  { icon: GraduationCap, image: images.scenarios.reading, title: "学习充电", desc: "讲座、课程和阅读空间", to: "/reading" },
  { icon: Baby, image: images.scenarios.cultureCenter, title: "携娃出行", desc: "亲子友好的文化体验", to: "/audience" },
  { icon: Accessibility, image: images.scenarios.accessibility, title: "无障碍出行", desc: "平等便捷参与文化生活", to: "/accessibility" },
];

export default function ScenarioEntry() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
      <SectionTitle title="你想怎样参与北京文化？" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {scenes.map(({ icon: Icon, image, title, desc, to }) => (
          <button key={title} onClick={() => navigate(to)} className="card p-5 text-left">
            <img
              src={image}
              alt={title}
              className="h-14 w-14 object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <Icon className="hidden text-inkgreen" size={34} />
            <h3 className="mt-4 font-black text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
