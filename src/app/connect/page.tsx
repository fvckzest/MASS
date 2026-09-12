import type { Metadata } from "next";
import { ImageBreak, MassFooter, MassHeader } from "../_components/mass-shell";

export const metadata: Metadata = {
  title: "Contact — MASS Tacoma",
  description: "Contact MASS in Tacoma for questions, collaborations, and bookings.",
};

export default function ConnectPage() {
  return (
    <main className="mass-page events-page connect-page" id="top">
      <MassHeader active="connect" />

      <ImageBreak variant="signal" />

      <section className="contact-directory" aria-labelledby="contact-heading">
        <div className="contact-directory__heading">
          <h2 id="contact-heading">contact</h2>
          <p>questions, ideas,<br />or just want to say hello?</p>
        </div>
        <div className="contact-directory__details">
          <div className="contact-detail">
            <span className="contact-detail__label">general inquiries</span>
            <a href="mailto:hello@mass.place">hello@mass.place</a>
          </div>
          <div className="contact-detail">
            <span className="contact-detail__label">bookings</span>
            <a href="mailto:bookings@mass.place">bookings@mass.place</a>
          </div>
          <div className="contact-detail">
            <span className="contact-detail__label">find us</span>
            <address>726 Pacific Ave<br />Tacoma, WA</address>
          </div>
        </div>
      </section>

      <ImageBreak variant="signal" />

      <section className="contact-intake" aria-labelledby="contact-intake-heading">
        <div className="contact-intake__heading">
          <h2 id="contact-intake-heading">get in touch</h2>
          <p>tell us a little about<br />what you have in mind.</p>
        </div>
        <form className="contact-intake__form" action="mailto:hello@mass.place" method="post" encType="text/plain">
          <div className="contact-intake__field">
            <label htmlFor="contact-name">name <span aria-hidden="true">*</span></label>
            <input id="contact-name" name="name" type="text" placeholder="Your name" required />
          </div>
          <div className="contact-intake__field">
            <label htmlFor="contact-email">email <span aria-hidden="true">*</span></label>
            <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="contact-intake__field contact-intake__field--wide">
            <label htmlFor="contact-message">message <span aria-hidden="true">*</span></label>
            <textarea id="contact-message" name="message" placeholder="Tell us what you have in mind..." required />
          </div>
          <button className="contact-intake__submit" type="submit">
            send message <span aria-hidden="true">&gt;</span>
          </button>
        </form>
      </section>

      <ImageBreak variant="footer" />

      <MassFooter />
    </main>
  );
}
