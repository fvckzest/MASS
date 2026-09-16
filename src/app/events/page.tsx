import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageBreak, MassContact, MassFooter, MassHeader } from "../_components/mass-shell";
import { getEventCatalog, type MassEvent } from "../../lib/hpos-events";

function eventDayValue(dateTime: string) {
  const [year, month, day] = dateTime.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function getEventBuckets(eventCatalog: MassEvent[], today = new Date()) {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const sortedEvents = [...eventCatalog].sort((first, second) => eventDayValue(first.dateTime) - eventDayValue(second.dateTime));

  return {
    upcoming: sortedEvents.filter((event) => eventDayValue(event.dateTime) >= startOfToday),
    past: sortedEvents
      .filter((event) => eventDayValue(event.dateTime) < startOfToday)
      .reverse(),
  };
}

export const metadata: Metadata = {
  title: "Events — MASS Tacoma",
  description: "Upcoming music, gatherings, workshops, and more at MASS in Tacoma.",
};

function PaperButton({ href, children }: { href: string; children: string }) {
  return (
    <a className="paper-button" href={href}>
      {children} <span aria-hidden="true">&gt;</span>
    </a>
  );
}

function EventImage({ position, tone, alt = "" }: { position: string; tone: MassEvent["imageTone"]; alt?: string }) {
  return (
    <div className={`event-card__image event-card__image--${tone}`}>
      <Image
        src="/mass-cloud-field.png"
        alt={alt}
        fill
        sizes="(max-width: 760px) 34vw, 132px"
        className="event-card__image-asset"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

export default async function EventsPage() {
  const catalog = await getEventCatalog();
  const { upcoming: upcomingEvents, past: pastEvents } = getEventBuckets(catalog.events);
  return (
    <main className="mass-page events-page" id="top">
      <MassHeader active="events" />

      <ImageBreak variant="signal" />

      <section className="events-overview" aria-labelledby="events-heading">
        <div className="events-overview__heading">
          <h2 id="events-heading">events</h2>
        </div>
        <div className="events-overview__intro">
          <p>music, gatherings, workshops, and more at MASS.{catalog.fallback ? " · showing the static catalog" : ""}</p>
        </div>

        <div className="event-list" aria-label="Upcoming events">
          {upcomingEvents.map((event) => (
            <article className="event-card" key={event.href}>
              <EventImage position={event.imagePosition} tone={event.imageTone} alt="" />
              <div className="event-card__details">
                <p className="event-card__promoter">{event.promoter}</p>
                <h3>{event.name}</h3>
                <p className="event-card__tags">{event.tags}</p>
                <p className="event-card__when">
                  <time dateTime={event.dateTime}>{event.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{event.time}</span>
                </p>
              </div>
              <div className="event-card__action">
                <PaperButton href={event.href}>view event</PaperButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ImageBreak variant="cloud" />

      <section className="archive" aria-labelledby="archive-heading">
        <div className="archive__header">
          <h2 id="archive-heading">past events</h2>
          <p>events that have<br />already happened.</p>
        </div>
        <div className="archive__grid">
          {pastEvents.map((event) => (
            <Link className="archive-card" href={event.href} key={event.href}>
              <EventImage position={event.imagePosition} tone={event.imageTone} />
              <div className="archive-card__details">
                <p>{event.promoter}</p>
                <h3>{event.name}</h3>
                <p>{event.date}</p>
              </div>
            </Link>
          ))}
        </div>
        <PaperButton href="#archive">view archive</PaperButton>
      </section>

      <ImageBreak variant="signal" />

      <MassContact />

      <ImageBreak variant="footer" />

      <MassFooter />
    </main>
  );
}
