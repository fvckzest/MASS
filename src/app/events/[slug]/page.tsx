import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findEvent } from "../../../lib/hpos-events";
import { ImageBreak, MassContact, MassFooter, MassHeader } from "../../_components/mass-shell";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await findEvent(slug);
  return { title: event ? `${event.name} — MASS Tacoma` : "Event — MASS Tacoma", description: event?.description ?? "An event at MASS in Tacoma." };
}

function PaperButton({ href, children }: { href: string; children: string }) {
  return <a className="paper-button" href={href}>{children} <span aria-hidden="true">&gt;</span></a>;
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await findEvent(slug);
  if (!event) notFound();
  const offering = event.ticketOfferings?.find((item) => item.active);
  const price = offering ? new Intl.NumberFormat("en-US", { style: "currency", currency: offering.price.currency }).format(offering.price.minor / 100) : null;

  return (
    <main className="mass-page events-page event-detail-page" id="top">
      <MassHeader active="events" />
      <ImageBreak variant="signal" />

      <section className="event-detail-hero" aria-labelledby="event-detail-heading">
        <Link className="event-detail__back" href="/events"><span aria-hidden="true">&lt;</span> all events</Link>
        <div className="event-detail__hero-grid">
          <div className="event-detail__copy">
            <p className="event-card__promoter">{event.promoter}</p>
            <h2 id="event-detail-heading">{event.name.toLowerCase()}</h2>
            <p className="event-detail__lede">{event.description ?? "a gathering at MASS — details taking shape."}</p>
            <PaperButton href="#tickets">view tickets</PaperButton>
          </div>
          <div className="event-detail__art">
            <Image src="/mass-cloud-field.png" alt={`Abstract blue cloud field for ${event.name}`} fill sizes="(max-width: 760px) 100vw, 42vw" className="event-detail__art-asset" style={{ objectPosition: event.imagePosition }} priority />
            <span className="event-detail__art-title">{event.name.toLowerCase()}</span>
            <span className="event-detail__art-index">{event.source} event</span>
          </div>
        </div>
        <dl className="event-detail__meta">
          <div><dt>when</dt><dd><time dateTime={event.dateTime}>{event.date}</time><br />{event.time}</dd></div>
          <div><dt>where</dt><dd>726 Pacific Ave<br />Tacoma, WA</dd></div>
          <div><dt>admission</dt><dd>{price ? `${price} advance` : "details coming soon"}<br />online</dd></div>
        </dl>
      </section>

      <ImageBreak variant="cloud" />
      <section className="event-detail__body" aria-labelledby="event-story-heading">
        <div className="event-detail__story"><h2 id="event-story-heading">{event.tags.toLowerCase()}</h2><p>{event.description ?? "Details are still forming. Keep the date open and stay close to the signal."}</p></div>
        <div className="event-detail__schedule" aria-labelledby="schedule-heading"><h3 id="schedule-heading">event info</h3><p>{event.timezone ?? "America/Los_Angeles"}</p></div>
      </section>

      <ImageBreak variant="signal" />
      <section className="event-detail__tickets" id="tickets" aria-labelledby="tickets-heading">
        <div className="event-detail__tickets-heading"><h2 id="tickets-heading">tickets</h2><p>{offering ? offering.label : "not on sale"}</p></div>
        <div className="event-detail__ticket-box"><p>{offering ? `${offering.label} · ${price}` : "Ticketing for this event is not live yet."}</p><button className="event-detail__ticket-button" type="button" disabled>tickets coming soon <span aria-hidden="true">&gt;</span></button></div>
        <p className="event-detail__ticket-note">Questions about the room? <Link href="/connect">connect with MASS</Link>.</p>
      </section>
      <MassContact />
      <ImageBreak variant="footer" />
      <MassFooter />
    </main>
  );
}
