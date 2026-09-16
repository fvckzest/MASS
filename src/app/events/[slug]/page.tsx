import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailShell } from "../../_components/event-detail-shell";
import { findEvent } from "../../../lib/hpos-events";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await findEvent(slug);
  return {
    title: event ? `${event.name} — MASS Tacoma` : "Event — MASS Tacoma",
    description: event?.description ?? "An event at MASS in Tacoma.",
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await findEvent(slug);
  if (!event) notFound();

  const offering = event.ticketOfferings?.find((item) => item.active);
  const price = offering
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: offering.price.currency }).format(offering.price.minor / 100)
    : null;
  const timeLabel = event.time.toLowerCase().replace(" - ", " — ");
  const story = event.description ?? "a gathering at MASS — details taking shape.";

  return (
    <EventDetailShell
      title={event.name.toLowerCase()}
      description={story}
      dateTime={event.dateTime}
      dateLabel={event.date.toLowerCase()}
      timeLabel={timeLabel}
      imagePosition={event.imagePosition}
      artIndex={`${event.source} event`}
      admission={{ primary: price ? `${price} advance` : "details coming soon", secondary: "online" }}
      storyHeading={event.tags.toLowerCase()}
      story={story}
      followUpStory="Details are still forming. Keep the date open and stay close to the signal."
      schedule={[
        { time: timeLabel, label: "event hours" },
        { time: "local", label: event.timezone ?? "America/Los_Angeles" },
      ]}
      ticketLabel={offering ? offering.label : "not on sale"}
      ticketDescription={offering ? `${offering.label} · ${price}` : "Ticketing for this event is not live yet."}
    />
  );
}
