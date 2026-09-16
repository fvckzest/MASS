import type { Metadata } from "next";
import { EventDetailShell, type EventScheduleItem } from "../../_components/event-detail-shell";

export const metadata: Metadata = {
  title: "Exodus — MASS Tacoma",
  description: "Exodus is a placeholder event page for MASS in Tacoma.",
};

const schedule: EventScheduleItem[] = [
  { time: "9:00pm", label: "doors + welcome" },
  { time: "10:00pm", label: "the first signal" },
  { time: "11:30pm", label: "live transmission" },
  { time: "1:30am", label: "close" },
];

export default function ExodusPage() {
  return (
    <EventDetailShell
      title="exodus"
      description="an opening night for the room — a shared first signal, still taking shape."
      dateTime="2026-10-24"
      dateLabel="oct 24, 2026"
      timeLabel="9pm — 1:30am"
      imagePosition="center 8%"
      artIndex="mock event / 001"
      admission={{ primary: "$15 advance", secondary: "$20 at the door" }}
      storyHeading="the first signal"
      story="Exodus is a placeholder for the kind of night MASS is here to hold: sound in the room, people in motion, and enough space for something unexpected to begin."
      followUpStory="Details are still forming. Keep the date open and stay close to the signal."
      schedule={schedule}
      ticketLabel="mock listing / not on sale"
      ticketDescription="Ticketing for Exodus is not live yet. We’ll share the real link when the details land."
    />
  );
}
