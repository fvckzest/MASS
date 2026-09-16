import { Buffer } from "node:buffer";

export type HposTicketOffering = {
  ticket_offering_id: string;
  label: string;
  price: { minor: number; currency: string };
  capacity_limit: number;
  purchase_limit: number;
  sales_start_at: string;
  sales_end_at: string;
  active: boolean;
};

export type HposEvent = {
  event_id: string;
  site_id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string | null;
  timezone: string;
  mode: "ticketed" | "non_ticketed";
  capacity_limit: number | null;
  venue: { name?: string } | null;
  status: "published";
  published_at: string | null;
  ticket_offerings: HposTicketOffering[];
};

type HposEventsResponse = { events: HposEvent[] };

export type MassEvent = {
  promoter: string;
  name: string;
  tags: string;
  dateTime: string;
  date: string;
  time: string;
  imagePosition: string;
  imageTone: "night" | "cloud" | "room" | "mist";
  slug: string;
  href: string;
  description?: string;
  timezone?: string;
  source: "static" | "hpos";
  eventId?: string;
  ticketOfferings?: HposTicketOffering[];
};

const staticEventCatalog: Omit<MassEvent, "href">[] = [
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
    source: "static",
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
    source: "static",
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
    source: "static",
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
    source: "static",
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
    source: "static",
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
    source: "static",
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
    source: "static",
  },
];

function hposEventSlug(event: Pick<HposEvent, "event_id">): string {
  if (!event.event_id) throw new Error("HP-OS Event is missing event_id");
  return `event-${Buffer.from(event.event_id, "utf8").toString("base64url")}`;
}

export function eventHref(slug: string): string {
  return `/events/${encodeURIComponent(slug)}`;
}

function formatDate(value: string, timezone: string): { dateTime: string; date: string } {
  const date = new Date(value);
  const displayParts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "short", day: "numeric" }).formatToParts(date);
  const numericParts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return { dateTime: `${get(numericParts, "year")}-${get(numericParts, "month")}-${get(numericParts, "day")}`, date: `${get(displayParts, "month").toUpperCase()} ${get(displayParts, "day")}, ${get(displayParts, "year")}` };
}

function formatTime(value: string, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", minute: "numeric" }).format(new Date(value)).replace(/:00(?=\s|$)/, "").replace(" ", "").toUpperCase();
}

function mapHposEvent(event: HposEvent, index: number): MassEvent {
  const date = formatDate(event.starts_at, event.timezone);
  const start = formatTime(event.starts_at, event.timezone);
  const end = event.ends_at ? formatTime(event.ends_at, event.timezone) : undefined;
  const venueName = event.venue?.name ?? "MASS";
  const slug = hposEventSlug(event);
  return {
    promoter: venueName,
    name: event.title.toUpperCase(),
    tags: event.mode === "ticketed" ? "TICKETED · SOUND · GATHERING" : "SOUND · GATHERING",
    dateTime: date.dateTime,
    date: date.date,
    time: end ? `${start} - ${end}` : start,
    imagePosition: `center ${7 + index * 13}%`,
    imageTone: index % 2 === 0 ? "cloud" : "night",
    slug,
    href: eventHref(slug),
    description: event.description ?? undefined,
    timezone: event.timezone,
    source: "hpos",
    eventId: event.event_id,
    ticketOfferings: event.ticket_offerings,
  };
}

export function staticEvents(): MassEvent[] {
  return staticEventCatalog.map((event) => ({ ...event, href: eventHref(event.slug) }));
}

export async function fetchHposEvents(): Promise<MassEvent[]> {
  const baseUrl = process.env.HPOS_API_BASE_URL ?? "http://localhost:3000";
  const siteId = process.env.HPOS_SITE_ID ?? "site_mass_local";
  const credential = process.env.HPOS_SITE_CREDENTIAL;
  const headers: Record<string, string> = { accept: "application/json" };
  if (credential) headers.authorization = `Bearer ${credential}`;
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/v1/public/sites/${encodeURIComponent(siteId)}/events`, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`HP-OS Event discovery returned ${response.status}`);
  const payload = await response.json() as HposEventsResponse;
  if (!Array.isArray(payload.events)) throw new Error("HP-OS Event discovery returned an invalid payload");
  return payload.events.map(mapHposEvent);
}

export async function getEventCatalog(): Promise<{ events: MassEvent[]; source: "static" | "hpos"; fallback: boolean }> {
  if ((process.env.MASS_EVENT_SOURCE ?? "static") !== "hpos") return { events: staticEvents(), source: "static", fallback: false };
  try {
    return { events: await fetchHposEvents(), source: "hpos", fallback: false };
  } catch (error) {
    console.error("MASS_EVENT_SOURCE=hpos could not load HP-OS Events; using static catalog", error);
    return { events: staticEvents(), source: "static", fallback: true };
  }
}

export async function findEvent(slug: string): Promise<MassEvent | undefined> {
  const catalog = await getEventCatalog();
  return catalog.events.find((event) => event.slug === slug);
}
