import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageBreak, MassContact, MassFooter, MassHeader } from "../_components/mass-shell";

type Event = {
  promoter: string;
  name: string;
  tags: string;
  dateTime: string;
  date: string;
  time: string;
  imagePosition: string;
  imageTone: "night" | "cloud" | "room" | "mist";
  slug: string;
};

const eventCatalog: Event[] = [
  {
    promoter: "LMNL",
    name: "EXODUS",
    tags: "PLACEHOLDER · SOUND · GATHERING",
    dateTime: "2026-10-24",
    date: "OCT 24, 2026",
    time: "9PM - 1:30AM",
    imagePosition: "center 7%",
    imageTone: "cloud",
    slug: "exodus",
  },
  {
    promoter: "CTRL. ALT. SPIN.",
    name: "FRAMERATE",
    tags: "TECHNO · BASS · VISUALS",
    dateTime: "2025-12-08",
    date: "DEC 8, 2025",
    time: "9PM - 1:30AM",
    imagePosition: "center 13%",
    imageTone: "night",
    slug: "framerate",
  },
  {
    promoter: "FEUERSTATE",
    name: "SO FAR",
    tags: "HOUSE · BREAKS · COMMUNITY",
    dateTime: "2025-10-17",
    date: "OCT 17, 2025",
    time: "9PM - 1:30AM",
    imagePosition: "center 29%",
    imageTone: "cloud",
    slug: "so-far",
  },
  {
    promoter: "LMNL",
    name: "EXODUS",
    tags: "AMBIENT · EXPERIMENTAL · LIVE",
    dateTime: "2025-12-06",
    date: "DEC 6, 2025",
    time: "9PM - 1:30AM",
    imagePosition: "center 48%",
    imageTone: "room",
    slug: "exodus-2",
  },
  {
    promoter: "MASS",
    name: "OPEN DECKS",
    tags: "ALL GENRES · ALL PEOPLE",
    dateTime: "2026-01-10",
    date: "JAN 10, 2026",
    time: "7PM - 12AM",
    imagePosition: "center 64%",
    imageTone: "mist",
    slug: "open-decks",
  },
  {
    promoter: "WORKSHOP",
    name: "SOUND SYSTEM 101",
    tags: "BUILD · LEARN · LISTEN",
    dateTime: "2026-01-24",
    date: "JAN 24, 2026",
    time: "2PM - 6PM",
    imagePosition: "center 78%",
    imageTone: "room",
    slug: "sound-system-101",
  },
  {
    promoter: "COMMUNITY",
    name: "IDEAS IN THE ROOM",
    tags: "TALKS · DISCUSSION · CONNECTION",
    dateTime: "2026-02-07",
    date: "FEB 7, 2026",
    time: "6PM - 9PM",
    imagePosition: "center 93%",
    imageTone: "mist",
    slug: "ideas-in-the-room",
  },
];

function eventDayValue(dateTime: string) {
  const [year, month, day] = dateTime.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function getEventBuckets(today = new Date()) {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const sortedEvents = [...eventCatalog].sort((first, second) => eventDayValue(first.dateTime) - eventDayValue(second.dateTime));

  return {
    upcoming: sortedEvents.filter((event) => eventDayValue(event.dateTime) >= startOfToday),
    past: sortedEvents
      .filter((event) => eventDayValue(event.dateTime) < startOfToday)
      .reverse(),
  };
}

const { upcoming: upcomingEvents, past: pastEvents } = getEventBuckets();

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

function EventImage({ position, tone, alt = "" }: { position: string; tone: Event["imageTone"]; alt?: string }) {
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

export default function EventsPage() {
  return (
    <main className="mass-page events-page" id="top">
      <MassHeader active="events" />

      <ImageBreak variant="signal" />

      <section className="events-overview" aria-labelledby="events-heading">
        <div className="events-overview__heading">
          <h2 id="events-heading">events</h2>
        </div>
        <div className="events-overview__intro">
          <p>music, gatherings, workshops, and more at MASS.</p>
        </div>

        <div className="event-list" aria-label="Upcoming events">
          {upcomingEvents.map((event) => (
            <article className="event-card" key={`${event.promoter}-${event.name}`}>
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
                <PaperButton href={`/events/${event.slug}`}>view event</PaperButton>
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
            <Link className="archive-card" href={`/events/${event.slug}`} key={`${event.promoter}-${event.name}-${event.dateTime}`}>
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
