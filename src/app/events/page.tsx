import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Event = {
  promoter: string;
  name: string;
  tags: string;
  date: string;
  time: string;
  imagePosition: string;
  imageTone: "night" | "cloud" | "room" | "mist";
};

const events: Event[] = [
  {
    promoter: "CTRL. ALT. SPIN.",
    name: "FRAMERATE",
    tags: "TECHNO · BASS · VISUALS",
    date: "DEC 8, 2025",
    time: "9PM - 1:30AM",
    imagePosition: "center 13%",
    imageTone: "night",
  },
  {
    promoter: "FEUERSTATE",
    name: "SO FAR",
    tags: "HOUSE · BREAKS · COMMUNITY",
    date: "OCT 17, 2025",
    time: "9PM - 1:30AM",
    imagePosition: "center 29%",
    imageTone: "cloud",
  },
  {
    promoter: "LMNL",
    name: "EXODUS",
    tags: "AMBIENT · EXPERIMENTAL · LIVE",
    date: "DEC 6, 2025",
    time: "9PM - 1:30AM",
    imagePosition: "center 48%",
    imageTone: "room",
  },
  {
    promoter: "MASS",
    name: "OPEN DECKS",
    tags: "ALL GENRES · ALL PEOPLE",
    date: "JAN 10, 2026",
    time: "7PM - 12AM",
    imagePosition: "center 64%",
    imageTone: "mist",
  },
  {
    promoter: "WORKSHOP",
    name: "SOUND SYSTEM 101",
    tags: "BUILD · LEARN · LISTEN",
    date: "JAN 24, 2026",
    time: "2PM - 6PM",
    imagePosition: "center 78%",
    imageTone: "room",
  },
  {
    promoter: "COMMUNITY",
    name: "IDEAS IN THE ROOM",
    tags: "TALKS · DISCUSSION · CONNECTION",
    date: "FEB 7, 2026",
    time: "6PM - 9PM",
    imagePosition: "center 93%",
    imageTone: "mist",
  },
];

const archiveImages = [
  { position: "center 24%", tone: "night" },
  { position: "center 42%", tone: "room" },
  { position: "center 58%", tone: "cloud" },
  { position: "center 76%", tone: "night" },
] as const;

export const metadata: Metadata = {
  title: "Events — MASS Tacoma",
  description: "Upcoming music, gatherings, workshops, and more at MASS in Tacoma.",
};

function ImageBreak({ variant }: { variant: "hero" | "signal" | "cloud" | "footer" | "archive" }) {
  const source = variant === "signal" ? "/mass-signal-strip.png" : "/mass-cloud-field.png";

  return (
    <div className={`image-break image-break--${variant}`} aria-hidden="true">
      <Image
        src={source}
        alt=""
        width={variant === "signal" ? 2028 : 818}
        height={variant === "signal" ? 523 : 1922}
        className="image-break__asset"
        priority={variant === "hero"}
      />
    </div>
  );
}

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

function MassHeader() {
  return (
    <header className="secondary-header identity" aria-labelledby="mass-title">
      <div className="identity__brand">
        <h1 id="mass-title"><Link href="/" aria-label="MASS home">MASS</Link></h1>
        <p><span>726 Pacific Ave</span><span className="identity__address-line">Tacoma, WA</span></p>
      </div>
      <nav className="identity__nav" aria-label="Primary navigation">
        <a className="identity__nav-active" href="/events">events</a>
        <a href="#bookings">bookings</a>
        <a href="#space">space</a>
        <a href="#connect">connect</a>
      </nav>
      <details className="mobile-menu">
        <summary>menu <span aria-hidden="true">+</span></summary>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          <a className="identity__nav-active" href="/events">events</a>
          <a href="#bookings">bookings</a>
          <a href="#space">space</a>
          <a href="#connect">connect</a>
        </nav>
      </details>
    </header>
  );
}

export default function EventsPage() {
  return (
    <main className="mass-page events-page" id="top">
      <MassHeader />

      <ImageBreak variant="signal" />

      <section className="events-overview" aria-labelledby="events-heading">
        <div className="events-overview__heading">
          <h2 id="events-heading">events</h2>
        </div>
        <div className="events-overview__intro">
          <p>music, gatherings, workshops, and more at MASS.</p>
        </div>

        <div className="event-list" aria-label="Upcoming events">
          {events.map((event) => (
            <article className="event-card" key={event.name}>
              <EventImage position={event.imagePosition} tone={event.imageTone} alt="" />
              <div className="event-card__details">
                <p className="event-card__promoter">{event.promoter}</p>
                <h3>{event.name}</h3>
                <p className="event-card__tags">{event.tags}</p>
                <p className="event-card__when">
                  <time dateTime={event.date}>{event.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{event.time}</span>
                </p>
              </div>
              <div className="event-card__action">
                <PaperButton href={`#${event.name.toLowerCase().replaceAll(" ", "-")}`}>view event</PaperButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ImageBreak variant="signal" />

      <section className="archive" aria-labelledby="archive-heading">
        <div className="archive__header">
          <h2 id="archive-heading">past events</h2>
          <p>archives, photos,<br />and more coming soon.</p>
        </div>
        <div className="archive__grid">
          {archiveImages.map((image, index) => (
            <EventImage key={index} position={image.position} tone={image.tone} />
          ))}
        </div>
        <PaperButton href="#archive">view archive</PaperButton>
      </section>

      <ImageBreak variant="cloud" />

      <section className="events-contact" id="connect" aria-label="Contact MASS">
        <div className="events-contact__address">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">ig handle</a>
          <a href="mailto:hello@mass.place">email address</a>
          <p>726 Pacific Ave<br />Tacoma WA</p>
        </div>
      </section>

      <ImageBreak variant="footer" />

      <footer className="site-footer">
        <span>built and powered by LMNL</span>
      </footer>
    </main>
  );
}
