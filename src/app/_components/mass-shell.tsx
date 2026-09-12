import Image from "next/image";
import Link from "next/link";

export type ImageBreakVariant = "hero" | "signal" | "cloud" | "footer" | "archive";

export function ImageBreak({ variant }: { variant: ImageBreakVariant }) {
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

export function MassHeader({ active }: { active: "events" | "booking" | "venue" }) {
  return (
    <header className="secondary-header identity" aria-labelledby="mass-title">
      <div className="identity__brand">
        <h1 id="mass-title"><Link href="/" aria-label="MASS home">MASS</Link></h1>
        <p><span>726 Pacific Ave</span><span className="identity__address-line">Tacoma, WA</span></p>
      </div>
      <nav className="identity__nav" aria-label="Primary navigation">
        <Link className={active === "events" ? "identity__nav-active" : undefined} href="/events">events</Link>
        <Link className={active === "booking" ? "identity__nav-active" : undefined} href="/booking">bookings</Link>
        <Link className={active === "venue" ? "identity__nav-active" : undefined} href="/venue">venue</Link>
        <a href="#connect">connect</a>
      </nav>
      <details className="mobile-menu">
        <summary>menu <span aria-hidden="true">+</span></summary>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          <Link className={active === "events" ? "identity__nav-active" : undefined} href="/events">events</Link>
          <Link className={active === "booking" ? "identity__nav-active" : undefined} href="/booking">bookings</Link>
          <Link className={active === "venue" ? "identity__nav-active" : undefined} href="/venue">venue</Link>
          <a href="#connect">connect</a>
        </nav>
      </details>
    </header>
  );
}

export function MassFooter() {
  return (
    <footer className="site-footer">
      <span>built and powered by LMNL</span>
    </footer>
  );
}

export function MassContact() {
  return (
    <section className="contact split-section" id="connect" aria-label="Contact MASS">
      <div className="contact__details">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">ig handle</a>
        <a href="mailto:hello@mass.place">email address</a>
        <p>726 Pacific Ave<br />Tacoma WA</p>
      </div>
      <div className="subscribe">
        <label htmlFor="subscribe-email">subscribe to MASS</label>
        <form className="subscribe__form" action="#connect" method="get">
          <input id="subscribe-email" name="email" type="email" placeholder="enter email" aria-label="Email address" />
          <button className="subscribe__submit" type="submit" aria-label="Submit email address">
            <span aria-hidden="true">&gt;</span>
          </button>
        </form>
      </div>
    </section>
  );
}
