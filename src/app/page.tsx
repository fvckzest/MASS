type Event = {
  promoter: string;
  name: string;
  date: string;
  time: string;
  href: string;
};

const events: Event[] = [
  {
    promoter: "CTRL. ALT. SPIN.",
    name: "FRAMERATE",
    date: "Oct 8, 2026",
    time: "9pm - 1:30am",
    href: "#event-framerate",
  },
  {
    promoter: "fEVERSTATE",
    name: "SO FAR",
    date: "Oct 17, 2026",
    time: "9pm - 1:30am",
    href: "#event-so-far",
  },
  {
    promoter: "LMNL",
    name: "EXODUS",
    date: "Oct 8, 2026",
    time: "9pm - 1:30am",
    href: "#event-exodus",
  },
];

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
          <a href="/events">events</a>
          <a href="#bookings">bookings</a>
          <a href="#venue">venue</a>
          <a href="#connect">connect</a>
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
        {events.map((event) => (
          <article className="event-row" id={event.href.slice(1)} key={event.name}>
            <div className="event-row__details">
              <p>{event.promoter}</p>
              <h3>{event.name}</h3>
              <p className="event-row__when">
                <time dateTime={event.date}>{event.date}</time>
                <span aria-hidden="true" className="event-row__asterisk">*</span>
                <span>{event.time}</span>
              </p>
            </div>
            <div className="event-row__action">
              <PaperButton href={event.href}>view event</PaperButton>
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
          <p>Interested in hosting<br />an event at MASS? </p>
          <PaperButton href="mailto:bookings@mass.place">booking</PaperButton>
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
          <p>visit MASS in person?</p>
          <PaperButton href="mailto:bookings@mass.place">booking</PaperButton>
        </div>
      </section>

      <ImageBreak variant="signal" />

      <section className="contact split-section" id="connect" aria-label="Contact MASS">
        <div className="contact__details">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">ig handle</a>
          <a href="mailto:hello@mass.place">email address</a>
          <p>726 Pacific Ave<br />Tacoma WA</p>
        </div>
        <div className="subscribe">
          <label htmlFor="subscribe-email">subscribe to MASS</label>
          <input id="subscribe-email" type="email" placeholder="enter email" aria-label="Email address" />
        </div>
      </section>

      <ImageBreak variant="footer" />

      <footer className="site-footer">
        <span>built and powered by LMNL</span>
      </footer>
    </main>
  );
}
import Image from "next/image";
