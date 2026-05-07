import { useState } from "react";
import HomeHero from "../components/home/HomeHero";
import ScenarioEntry from "../components/home/ScenarioEntry";
import CultureTypeGrid from "../components/home/CultureTypeGrid";
import WeeklyCulture from "../components/home/WeeklyCulture";
import HomeEvents from "../components/home/HomeEvents";
import AccessibilityPreview from "../components/home/AccessibilityPreview";
import AudiencePreview from "../components/home/AudiencePreview";
import EventDetailModal from "../components/events/EventDetailModal";
import FadeInSection from "../components/common/FadeInSection";
import { events, EventItem } from "../data/events";

export default function HomePage() {
  const [event, setEvent] = useState<EventItem | null>(null);

  const displayEvents = events.slice(0, 6);

  return (
    <>
      <HomeHero />
      <FadeInSection delay={80}>
        <ScenarioEntry />
      </FadeInSection>
      <FadeInSection delay={150}>
        <CultureTypeGrid />
      </FadeInSection>
      <FadeInSection delay={220}>
        <WeeklyCulture events={displayEvents} onDetail={setEvent} />
      </FadeInSection>
      <FadeInSection delay={290}>
        <HomeEvents events={displayEvents} onDetail={setEvent} />
      </FadeInSection>
      <FadeInSection delay={360}>
        <AccessibilityPreview />
      </FadeInSection>
      <FadeInSection delay={430}>
        <AudiencePreview />
      </FadeInSection>
      <EventDetailModal event={event} onClose={() => setEvent(null)} />
    </>
  );
}
