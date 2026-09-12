import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageBreak, MassContact, MassFooter, MassHeader } from "../../_components/mass-shell";

export const metadata: Metadata = {
  title: "Exodus — MASS Tacoma",
  description: "Exodus is a placeholder event page for MASS in Tacoma.",
};

function PaperButton({ href, children }: { href: string; children: string }) {
  return (
    <a className="paper-button" href={href}>
      {children} <span aria-hidden="true">&gt;</span>
    </a>
  );
}

const schedule = [
  { time: "9:00pm", label: "doors + welcome" },
  { time: "10:00pm", label: "the first signal" },
  { time: "11:30pm", label: "live transmission" },
  { time: "1:30am", label: "close" },
];

export default function ExodusPage() {
  return (
    <main className="mass-page events-page event-detail-page" id="top">
      <MassHeader active="events" />

      <ImageBreak variant="signal" />

      <section className="event-detail-hero" aria-labelledby="event-detail-heading">
        <Link className="event-detail__back" href="/events">
          <span aria-hidden="true">&lt;</span> all events
        </Link>

        <div className="event-detail__hero-grid">
          <div className="event-detail__copy">
            <h2 id="event-detail-heading">exodus</h2>
            <p className="event-detail__lede">
              an opening night for the room — a shared first signal, still taking shape.
            </p>
            <PaperButton href="#tickets">view tickets</PaperButton>
          </div>

          <div className="event-detail__art">
            <Image
              src="/mass-cloud-field.png"
              alt="Abstract blue cloud field for the Exodus event"
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
              className="event-detail__art-asset"
              style={{ objectPosition: "center 8%" }}
              priority
            />
            <span className="event-detail__art-title">exodus</span>
            <span className="event-detail__art-index">mock event / 001</span>
          </div>
        </div>

        <dl className="event-detail__meta">
          <div>
            <dt>when</dt>
            <dd><time dateTime="2026-10-24">oct 24, 2026</time><br />9pm — 1:30am</dd>
          </div>
          <div>
            <dt>where</dt>
            <dd>726 Pacific Ave<br />Tacoma, WA</dd>
          </div>
          <div>
            <dt>admission</dt>
            <dd>$15 advance<br />$20 at the door</dd>
          </div>
        </dl>
      </section>

      <ImageBreak variant="cloud" />

      <section className="event-detail__body" aria-labelledby="event-story-heading">
        <div className="event-detail__story">
          <h2 id="event-story-heading">the first signal</h2>
          <p>
            Exodus is a placeholder for the kind of night MASS is here to hold: sound in the room,
            people in motion, and enough space for something unexpected to begin.
          </p>
          <p>
            Details are still forming. Keep the date open and stay close to the signal.
          </p>
        </div>

        <div className="event-detail__schedule" aria-labelledby="schedule-heading">
          <h3 id="schedule-heading">on the night</h3>
          <ol>
            {schedule.map((item) => (
              <li key={item.time}>
                <time>{item.time}</time>
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ImageBreak variant="signal" />

      <section className="event-detail__tickets" id="tickets" aria-labelledby="tickets-heading">
        <div className="event-detail__tickets-heading">
          <h2 id="tickets-heading">tickets</h2>
          <p>mock listing / not on sale</p>
        </div>
        <div className="event-detail__ticket-box">
          <p>Ticketing for Exodus is not live yet. We’ll share the real link when the details land.</p>
          <button className="event-detail__ticket-button" type="button" disabled>
            tickets coming soon <span aria-hidden="true">&gt;</span>
          </button>
        </div>
        <p className="event-detail__ticket-note">
          Questions about the room? <Link href="/connect">connect with MASS</Link>.
        </p>
      </section>

      <MassContact />

      <ImageBreak variant="footer" />

      <MassFooter />
    </main>
  );
}
