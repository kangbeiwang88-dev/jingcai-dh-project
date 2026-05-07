import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { EventWaterfallScroll } from "../events/EventCardWaterfall";
import { EventItem } from "../../data/events";

export default function HomeEvents({ events, onDetail }: { events: EventItem[]; onDetail: (event: EventItem) => void }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
      <div className="card p-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <SectionTitle title="近期演出与展览" description="演出与展览信息可能发生变化，请以官方页面和现场实际情况为准。" />
          <Link to="/events" className="btn-outline px-5 py-3">查看更多</Link>
        </div>
        
        {/* 横向瀑布流 */}
        <EventWaterfallScroll events={events.slice(0, 6)} onDetail={onDetail} />
      </div>
    </section>
  );
}
