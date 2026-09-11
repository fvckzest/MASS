import type { Metadata } from "next";
import { ImageBreak, MassFooter, MassHeader } from "../_components/mass-shell";

export const metadata: Metadata = {
  title: "Bookings — MASS Tacoma",
  description: "Submit an event request to book MASS in Tacoma.",
};

type FieldProps = {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
};

function FieldLabel({ children, className = "", htmlFor }: FieldProps) {
  return <label className={`booking-form__label ${className}`} htmlFor={htmlFor}>{children}</label>;
}

const faqs = [
  {
    question: "what types of events can we host?",
    answer: "MASS is available for music, gatherings, workshops, installations, and other community-centered events.",
  },
  {
    question: "how much does it cost to rent the space?",
    answer: "Rates depend on the event, schedule, and production needs. Share the details in your request and we’ll follow up.",
  },
  {
    question: "what’s included with the rental?",
    answer: "Every booking includes access to the room and bar area. We’ll confirm equipment and staffing needs together.",
  },
  {
    question: "do you provide sound and lighting?",
    answer: "Tell us what your event needs and we’ll outline the available sound and lighting setup.",
  },
  {
    question: "can we bring our own equipment?",
    answer: "Yes. Include any equipment plans in your request so we can coordinate access and setup.",
  },
  {
    question: "how far in advance should we book?",
    answer: "Earlier is better, especially for weekends. Send a request as soon as you have a preferred date.",
  },
  {
    question: "is there a capacity limit?",
    answer: "Capacity depends on the event layout and production plan. We’ll confirm the right configuration with you.",
  },
];

export default function BookingPage() {
  return (
    <main className="mass-page events-page booking-page" id="top">
      <MassHeader active="booking" />

      <ImageBreak variant="signal" />

      <section className="events-overview booking-intro" aria-labelledby="booking-heading">
        <div className="events-overview__heading">
          <h2 id="booking-heading">booking</h2>
        </div>
        <div className="events-overview__intro">
          <p>submit a request and we’ll be in touch.</p>
        </div>
      </section>

      <section className="booking-request" aria-labelledby="request-heading">
        <h2 id="request-heading">event request</h2>
        <form className="booking-form">
          <div className="booking-form__field">
            <FieldLabel htmlFor="booking-name">name <span aria-hidden="true">*</span></FieldLabel>
            <input id="booking-name" name="name" type="text" placeholder="Your name" required />
          </div>
          <div className="booking-form__field">
            <FieldLabel htmlFor="booking-organization">organization (optional)</FieldLabel>
            <input id="booking-organization" name="organization" type="text" placeholder="Your organization or collective" />
          </div>
          <div className="booking-form__field">
            <FieldLabel htmlFor="booking-email">email <span aria-hidden="true">*</span></FieldLabel>
            <input id="booking-email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="booking-form__field">
            <FieldLabel htmlFor="booking-phone">phone (optional)</FieldLabel>
            <input id="booking-phone" name="phone" type="tel" placeholder="(xxx) xxx-xxxx" />
          </div>
          <div className="booking-form__field">
            <FieldLabel htmlFor="booking-type">event type <span aria-hidden="true">*</span></FieldLabel>
            <select id="booking-type" name="eventType" defaultValue="" required>
              <option value="" disabled>select an event type</option>
              <option value="music">music</option>
              <option value="gathering">gathering</option>
              <option value="workshop">workshop</option>
              <option value="installation">installation</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="booking-form__field">
            <FieldLabel htmlFor="booking-budget">budget (optional)</FieldLabel>
            <input id="booking-budget" name="budget" type="text" placeholder="e.g. $500" />
          </div>
          <div className="booking-form__field booking-form__field--left">
            <FieldLabel htmlFor="booking-date">preferred date(s)</FieldLabel>
            <input id="booking-date" name="preferredDates" type="text" placeholder="e.g. Oct 18, 2025" />
          </div>
          <div className="booking-form__field booking-form__field--left">
            <FieldLabel htmlFor="booking-attendance">expected attendance</FieldLabel>
            <input id="booking-attendance" name="attendance" type="text" placeholder="e.g. 100" />
          </div>
          <div className="booking-form__field booking-form__field--wide">
            <FieldLabel htmlFor="booking-details">event details <span aria-hidden="true">*</span></FieldLabel>
            <textarea id="booking-details" name="details" placeholder="Tell us about your event, vision, and any specific needs..." required />
          </div>
          <button className="booking-form__submit" type="submit">submit request <span aria-hidden="true">&gt;</span></button>
        </form>
      </section>

      <ImageBreak variant="signal" />

      <section className="booking-faq" aria-labelledby="faq-heading">
        <div className="booking-faq__heading">
          <h2 id="faq-heading">faq</h2>
          <p>still have questions?<br /><a href="mailto:hello@mass-tacoma.com">email hello@mass-tacoma.com</a></p>
        </div>
        <div className="booking-faq__list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary><span>{faq.question}</span><span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ImageBreak variant="cloud" />

      <section className="booking-contact" id="connect" aria-label="Contact MASS">
        <div className="booking-contact__address">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">ig handle</a>
          <a href="mailto:hello@mass.place">email address</a>
          <p>726 Pacific Ave<br />Tacoma WA</p>
        </div>
      </section>

      <ImageBreak variant="footer" />

      <MassFooter />
    </main>
  );
}
