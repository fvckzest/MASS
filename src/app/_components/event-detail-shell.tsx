import Image from "next/image";
import Link from "next/link";
import { ImageBreak, MassContact, MassFooter, MassHeader } from "./mass-shell";

export type EventScheduleItem = {
  time: string;
  label: string;
};

export type EventDetailShellProps = {
  title: string;
  description: string;
  dateTime: string;
  dateLabel: string;
  timeLabel: string;
  imagePosition: string;
  artIndex: string;
  admission: { primary: string; secondary: string };
  storyHeading: string;
  story: string;
  followUpStory: string;
  schedule: readonly EventScheduleItem[];
  ticketLabel: string;
  ticketDescription: string;
};

function PaperButton({ href, children }: { href: string; children: string }) {
  return (
    <a className="paper-button" href={href}>
      {children} <span aria-hidden="true">&gt;</span>
    </a>
  );
}

export function EventDetailShell({
  title,
  description,
  dateTime,
  dateLabel,
  timeLabel,
  imagePosition,
  artIndex,
  admission,
  storyHeading,
  story,
  followUpStory,
  schedule,
  ticketLabel,
  ticketDescription,
}: EventDetailShellProps) {
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
            <h2 id="event-detail-heading">{title}</h2>
            <p className="event-detail__lede">{description}</p>
            <PaperButton href="#tickets">view tickets</PaperButton>
          </div>

          <div className="event-detail__art">
            <Image
              src="/mass-cloud-field.png"
              alt={`Abstract blue cloud field for ${title}`}
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
              className="event-detail__art-asset"
              style={{ objectPosition: imagePosition }}
              priority
            />
            <span className="event-detail__art-title">{title}</span>
            <span className="event-detail__art-index">{artIndex}</span>
          </div>
        </div>

        <dl className="event-detail__meta">
          <div>
            <dt>when</dt>
            <dd><time dateTime={dateTime}>{dateLabel}</time><br />{timeLabel}</dd>
          </div>
          <div>
            <dt>where</dt>
            <dd>726 Pacific Ave<br />Tacoma, WA</dd>
          </div>
          <div>
            <dt>admission</dt>
            <dd>{admission.primary}<br />{admission.secondary}</dd>
          </div>
        </dl>
      </section>

      <ImageBreak variant="cloud" />

      <section className="event-detail__body" aria-labelledby="event-story-heading">
        <div className="event-detail__story">
          <h2 id="event-story-heading">{storyHeading}</h2>
          <p>{story}</p>
          <p>{followUpStory}</p>
        </div>

        <div className="event-detail__schedule" aria-labelledby="schedule-heading">
          <h3 id="schedule-heading">on the night</h3>
          <ol>
            {schedule.map((item) => (
              <li key={`${item.time}-${item.label}`}>
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
          <p>{ticketLabel}</p>
        </div>
        <div className="event-detail__ticket-box">
          <p>{ticketDescription}</p>
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
