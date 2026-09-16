import Image from "next/image";
import Link from "next/link";
import { MassContact } from "./_components/mass-shell";

type Event = {
  promoter: string;
  name: string;
  dateTime: string;
  date: string;
  time: string;
  slug: string;
};

const eventCatalog: Event[] = [
  {
    promoter: "CTRL. ALT. SPIN.",
    name: "FRAMERATE",
    dateTime: "2026-10-08",
    date: "Oct 8, 2026",
    time: "9pm - 1:30am",
    slug: "framerate",
  },
  {
    promoter: "fEVERSTATE",
    name: "SO FAR",
    dateTime: "2026-10-17",
    date: "Oct 17, 2026",
    time: "9pm - 1:30am",
    slug: "so-far",
  },
  {
    promoter: "LMNL",
    name: "EXODUS",
    dateTime: "2026-10-24",
    date: "Oct 24, 2026",
    time: "9pm - 1:30am",
    slug: "exodus",
  },
];

function eventDayValue(dateTime: string) {
  const [year, month, day] = dateTime.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function getUpcomingEvents(today = new Date()) {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  return eventCatalog
    .filter((event) => eventDayValue(event.dateTime) >= startOfToday)
    .sort((first, second) => eventDayValue(first.dateTime) - eventDayValue(second.dateTime))
    .slice(0, 3);
}

const upcomingEvents = getUpcomingEvents();

function ImageBreak({ variant }: { variant: "hero" | "signal" | "cloud" | "cloud-middle" | "footer" }) {
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

export default function Home() {
  return (
    <main className="mass-page">
      <ImageBreak variant="hero" />

      <section className="identity" aria-labelledby="mass-title">
        <div className="identity__brand">
          <h1 id="mass-title">MASS</h1>
          <p><span>726 Pacific Ave</span><span className="identity__address-line">Tacoma, WA</span></p>
        </div>
        <nav className="identity__nav" aria-label="Primary navigation">
          <Link href="/events">events</Link>
          <Link href="/booking">bookings</Link>
          <Link href="/venue">venue</Link>
          <Link href="/connect">connect</Link>
        </nav>
      </section>

      <ImageBreak variant="signal" />

      <section className="tagline" aria-label="MASS introduction">
        <p>for congregation in music.</p>
        <p>join us.</p>
      </section>

      <ImageBreak variant="cloud" />

      <section className="section-title" aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading">upcoming</h2>
      </section>

      <section className="events" id="events" aria-label="Upcoming events">
        {upcomingEvents.map((event) => (
          <article className="event-row" id={`event-${event.slug}`} key={event.slug}>
            <div className="event-row__details">
              <p>{event.promoter}</p>
              <h3>{event.name}</h3>
              <p className="event-row__when">
                <time dateTime={event.dateTime}>{event.date}</time>
                <span aria-hidden="true" className="event-row__asterisk">*</span>
                <span>{event.time}</span>
              </p>
            </div>
            <div className="event-row__action">
              <PaperButton href={`/events/${event.slug}`}>view event</PaperButton>
            </div>
          </article>
        ))}
      </section>

      <ImageBreak variant="signal" />

      <section className="about split-section" id="about" aria-labelledby="about-heading">
        <div className="split-section__copy">
          <h2 id="about-heading">about</h2>
          <div className="split-section__body">
            <p>MASS is a room located in Tacoma<br />built with congregation in mind.</p>
            <p>A space for experimentation,<br />connection, and whatever else<br />may emerge when we come together.</p>
          </div>
        </div>
        <div className="split-section__aside" id="bookings">
          <p>Interested in hosting?</p>
          <PaperButton href="mailto:bookings@mass.place">get in touch</PaperButton>
        </div>
      </section>

      <ImageBreak variant="cloud-middle" />

      <section className="section-title" id="venue" aria-labelledby="space-heading">
        <h2 id="space-heading">the space</h2>
      </section>

      <section className="space split-section" aria-label="The space">
        <div className="split-section__copy">
          <div className="split-section__body">
            <p>A room for sound and gathering.<br />A place for what comes next.</p>
            <p>Stay for the signal,<br />stay for the room.</p>
          </div>
        </div>
        <div className="split-section__aside">
          <p>Looking for more?</p>
          <PaperButton href="mailto:bookings@mass.place">check it out</PaperButton>
        </div>
      </section>

      <ImageBreak variant="signal" />

      <MassContact />

      <ImageBreak variant="footer" />

      <footer className="site-footer">
        <span>built and powered by <a href="https://lmnl.art">LMNL</a></span>
      </footer>
    </main>
  );
}
