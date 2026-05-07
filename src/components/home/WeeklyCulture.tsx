import SectionTitle from "../common/SectionTitle";
import { EventWaterfallScroll } from "../events/EventCardWaterfall";
import { EventItem } from "../../data/events";

export default function WeeklyCulture({ events, onDetail }: { events: EventItem[]; onDetail: (event: EventItem) => void }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
      <SectionTitle title="本周文化现场" description="展示展览、演出、阅读活动与亲子活动。" />
      <div className="card p-6 mt-6">
        {/* 横向瀑布流 */}
        <EventWaterfallScroll events={events.slice(0, 6)} onDetail={onDetail} />
      </div>
    </section>
  );
}
