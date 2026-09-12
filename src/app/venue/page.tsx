import type { Metadata } from "next";
import { ImageBreak, MassContact, MassFooter, MassHeader } from "../_components/mass-shell";

export const metadata: Metadata = {
  title: "Venue — MASS Tacoma",
  description: "Learn about the room, setup, and possibilities at MASS in Tacoma.",
};

const venueDetails = [
  {
    label: "the room",
    description: "A flexible room for sound, gatherings, workshops, installations, and whatever comes next.",
  },
  {
    label: "the setup",
    description: "Layouts and production needs are shaped around each event, from a listening room to a full night of music.",
  },
  {
    label: "the bar",
    description: "The room includes access to the bar area, with staffing and service details coordinated for each booking.",
  },
  {
    label: "the neighborhood",
    description: "Find us at 726 Pacific Ave in Tacoma, a central room for bringing people together.",
  },
];

const roomPhotos = [
  {
    index: "01",
    label: "wide room view",
    description: "orientation, scale, and light",
    tone: "room",
  },
  {
    index: "02",
    label: "sound + signal",
    description: "speaker position and listening floor",
    tone: "sound",
  },
  {
    index: "03",
    label: "bar + entry",
    description: "arrival, flow, and gathering",
    tone: "bar",
  },
  {
    index: "04",
    label: "event setup",
    description: "a room ready for what comes next",
    tone: "setup",
  },
] as const;

function PaperButton({ href, children }: { href: string; children: string }) {
  return (
    <a className="paper-button" href={href}>
      {children} <span aria-hidden="true">&gt;</span>
    </a>
  );
}

export default function VenuePage() {
  return (
    <main className="mass-page events-page venue-page" id="top">
      <MassHeader active="venue" />

      <ImageBreak variant="signal" />

      <section className="events-overview venue-overview" aria-labelledby="venue-heading">
        <div className="events-overview__heading">
          <h2 id="venue-heading">venue</h2>
        </div>
        <div className="events-overview__intro">
          <p>a room for sound, gathering,<br />and what comes next.</p>
        </div>

        <div className="venue-details" aria-label="MASS venue details">
          {venueDetails.map((detail) => (
            <article className="venue-detail" key={detail.label}>
              <h3>{detail.label}</h3>
              <p>{detail.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ImageBreak variant="cloud" />

      <section className="venue-room" aria-labelledby="room-heading">
        <div className="venue-room__heading">
          <h2 id="room-heading">the room</h2>
          <p>descriptive views of MASS<br />coming soon.</p>
        </div>

        <div className="venue-gallery">
          <div className="venue-gallery__strip" aria-label="Room photo placeholders">
            {roomPhotos.map((photo) => (
              <figure className="room-photo" key={photo.index}>
                <div className={`room-photo__frame room-photo__frame--${photo.tone}`}>
                  <span className="room-photo__placeholder">photo placeholder</span>
                  <span className="room-photo__index">{photo.index}</span>
                </div>
                <figcaption className="room-photo__caption">
                  <strong>{photo.label}</strong>
                  <span>{photo.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="venue-room__cta">
          <p>Interested in hosting?</p>
          <PaperButton href="/booking">book the room</PaperButton>
        </div>
      </section>

      <ImageBreak variant="signal" />

      <MassContact />

      <ImageBreak variant="footer" />

      <MassFooter />
    </main>
  );
}
