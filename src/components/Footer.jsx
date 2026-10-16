import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowUpRight, ArrowUp, MapPin, Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Premium Footer, compact editorial layout                          */
/*  Aubergine + champagne palette, refined editorial typography       */
/*    LEFT  : brand, concise statement, inquiry button, journal       */
/*    RIGHT : Explore + Contact side by side                          */
/*    BASE  : slim legal bar with back-to-top                         */
/*  Dependencies: react-router-dom, framer-motion, lucide-react,      */
/*  Tailwind.                                                         */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1];
const SANS = {
  fontFamily: "'Plus Jakarta Sans', 'Satoshi', 'Helvetica Neue', Helvetica, Arial, sans-serif",
};
const SERIF = {
  fontFamily: "'Cormorant Garamond', 'Playfair Display', 'Bodoni 72', Didot, Georgia, 'Times New Roman', serif",
};

const GOLD = '#CBBD93';
const IVORY = '#FFFFFF';
const MUTED = 'rgba(255, 255, 255, 0.82)';
const LINE = 'rgba(203, 189, 147, 0.28)';
const CURRENT_YEAR = new Date().getFullYear();

const FOCUS =
  'outline-none focus-visible:ring-2 focus-visible:ring-[#CBBD93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F1A0E]';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

/* Custom SVG social icons (lucide dropped its brand icons in v0.4+) */
const iconProps = (size, props) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...props,
});

const InstagramIcon = ({ size = 16, ...props }) => (
  <svg {...iconProps(size, props)}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 16, ...props }) => (
  <svg {...iconProps(size, props)}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ size = 16, ...props }) => (
  <svg {...iconProps(size, props)}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
  </svg>
);

/* replace with your real social media URLs */
const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
  { label: 'YouTube', href: 'https://youtube.com', icon: YoutubeIcon },
];

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'The S4 Standard', to: '/standard' },
  { label: 'Our Services', to: '/#services' },
  { label: 'Our Portfolio', to: '/projects' },
  { label: 'Hospitality Insights', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

const legal = [
  { label: 'Privacy Policy', to: '/contact' },
  { label: 'Terms of Advisory', to: '/contact' },
  { label: 'Event Coordination SLA', to: '/contact' },
];

/* Link that smooth-scrolls when the target is a hash on the current page */
const SmartLink = ({ to, className, style, children }) => {
  const handleClick = (e) => {
    if (to.includes('#')) {
      const el = document.getElementById(to.split('#')[1]);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', to);
      }
    }
  };
  return (
    <Link to={to} onClick={handleClick} className={className} style={style}>
      {children}
    </Link>
  );
};

const SmallTitle = ({ children }) => (
  <h4 className="m-0 mb-3 text-[1.18rem] font-normal italic leading-none" style={{ ...SERIF, color: GOLD }}>
    {children}
  </h4>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <MotionConfig reducedMotion="user">
      <footer className="relative w-full overflow-hidden bg-[#1F1A0E]" style={{ ...SANS, color: IVORY }}>
        {/* atmosphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-40 top-[-14rem] h-[26rem] w-[36rem] rounded-full opacity-[0.15] blur-[120px]"
            style={{ backgroundColor: GOLD }}
          />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-screen" style={{ backgroundImage: GRAIN }} />
        </div>

        <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-14"
          >
            {/* ───────── LEFT: brand, statement, inquiry, journal ───────── */}
            <div className="flex flex-col">
              <Link
                to="/"
                aria-label="S4Consultancy Home"
                className={`inline-flex w-fit items-center gap-3.5 rounded-sm no-underline ${FOCUS}`}
                style={{ color: IVORY }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border text-lg font-normal"
                  style={{ ...SERIF, borderColor: GOLD, color: GOLD }}
                >
                  S4
                </span>
                <span className="text-[1.5rem] font-normal leading-none tracking-[-0.01em]" style={SERIF}>
                  S4Consultancy
                </span>
              </Link>

              <h2
                className="m-0 mt-5 font-light"
                style={{ ...SERIF, fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
              >
                Let’s compose your next{' '}
                <span className="italic" style={{ color: GOLD }}>
                  celebration.
                </span>
              </h2>

              <p className="mt-3 max-w-sm text-[14px] leading-relaxed" style={{ color: MUTED }}>
                <span className="text-[#E53935] font-semibold">Where hospitality meets excellence.</span> Personalized weddings, executive summits, banquet venues and
                strategic property advisory, delivered by one dedicated team.
              </p>

              <div className="mt-5">
                <Link
                  to="/contact"
                  className={`group inline-flex w-fit items-center gap-4 rounded-full border py-1.5 pl-6 pr-1.5 text-xs font-medium no-underline transition-colors duration-500 hover:bg-[#CBBD93] hover:text-[#574A24] ${FOCUS}`}
                  style={{ borderColor: 'rgba(203,189,147,0.6)', color: IVORY }}
                >
                  Begin your inquiry
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#574A24]"
                    style={{ backgroundColor: GOLD }}
                  >
                    <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </Link>
              </div>

              {/* journal */}
              <div className="mt-6 max-w-sm border-t pt-5" style={{ borderColor: LINE }}>
                <SmallTitle>The S4 journal</SmallTitle>
                {subscribed ? (
                  <p className="m-0 flex items-center gap-2 text-[14px]" role="status">
                    <CheckCircle2 size={16} aria-hidden="true" style={{ color: GOLD }} />
                    Thank you for subscribing.
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div
                      className="flex items-center gap-3 border-b transition-colors duration-300 focus-within:border-[#CBBD93]"
                      style={{ borderColor: 'rgba(250,232,180,0.3)' }}
                    >
                      <label htmlFor="footer-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="footer-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        aria-invalid={error ? 'true' : undefined}
                        aria-describedby={error ? 'footer-email-error' : undefined}
                        className="min-w-0 flex-1 border-0 bg-transparent py-2 text-[14px] outline-none placeholder:text-white/45"
                        style={{ color: IVORY }}
                      />
                      <button
                        type="submit"
                        aria-label="Subscribe"
                        className={`mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#574A24] transition-transform duration-500 hover:rotate-45 ${FOCUS}`}
                        style={{ backgroundColor: GOLD }}
                      >
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                    {error && (
                      <p
                        id="footer-email-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-[#ff9b84]"
                      >
                        <AlertCircle size={12} aria-hidden="true" />
                        {error}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* ───────── RIGHT: explore + contact ───────── */}
            <div className="grid gap-8 sm:grid-cols-2 lg:pt-1">
              <nav aria-label="Navigation">
                <SmallTitle>Explore</SmallTitle>
                <ul className="m-0 grid list-none grid-cols-1 gap-y-0.5 p-0">
                  {navigation.map((l) => (
                    <li key={l.label}>
                      <SmartLink
                        to={l.to}
                        className={`group inline-flex items-center gap-2 rounded-sm py-0.5 text-[14px] no-underline transition-colors duration-300 hover:text-[#CBBD93] ${FOCUS}`}
                        style={{ color: MUTED }}
                      >
                        <span
                          aria-hidden="true"
                          className="h-px w-0 bg-[#CBBD93] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-3.5"
                        />
                        <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
                          {l.label}
                        </span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div>
                <SmallTitle>Get in touch</SmallTitle>
                <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[14px]">
                  <li>
                    <a
                      href="mailto:inquiry@s4consultancy.com"
                      className={`flex items-start gap-2.5 rounded-sm no-underline transition-colors hover:text-[#CBBD93] ${FOCUS}`}
                      style={{ color: IVORY }}
                    >
                      <Mail size={16} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                      <span className="break-all">inquiry@s4consultancy.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+919876543210"
                      className={`flex items-start gap-2.5 rounded-sm no-underline transition-colors hover:text-[#CBBD93] ${FOCUS}`}
                      style={{ color: IVORY }}
                    >
                      <Phone size={16} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                      +91 (0) 98765 43210
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5" style={{ color: MUTED }}>
                    <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                    Luxury Hospitality &amp; Event Advisory Hub
                  </li>
                </ul>

                <ul className="m-0 mt-5 flex list-none gap-2.5 p-0">
                  {socials.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-500 hover:bg-[#CBBD93] hover:text-[#574A24] ${FOCUS}`}
                        style={{ borderColor: 'rgba(203,189,147,0.5)', color: IVORY }}
                      >
                        <Icon size={15} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ───────── legal bar ───────── */}
          <div
            className="flex flex-col gap-4 border-t py-4 text-[12px] sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: LINE, color: 'rgba(255, 255, 255, 0.75)' }}
          >
            <p className="m-0">© {CURRENT_YEAR} S4Consultancy. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
              {legal.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`rounded-sm no-underline transition-colors hover:text-[#CBBD93] ${FOCUS}`}
                  style={{ color: 'inherit' }}
                >
                  {l.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-500 hover:bg-[#CBBD93] hover:text-[#574A24] ${FOCUS}`}
                style={{ borderColor: 'rgba(203,189,147,0.5)', color: IVORY }}
              >
                <ArrowUp size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
};

export default Footer;