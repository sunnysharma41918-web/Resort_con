import React, { useState, useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { MapPin, Phone, Mail, Check, CheckCircle2, ShieldCheck, ArrowUpRight, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

/* ------------------------------------------------------------------ */
/*  Elegant Contact Section  (editorial typographic style)            */
/*  Quiet details column + flat underline inquiry form                */
/*  Dependencies: framer-motion, lucide-react, Tailwind, emailjs      */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1];
const SANS = { fontFamily: "'Plus Jakarta Sans', 'Satoshi', 'Helvetica Neue', Arial, sans-serif" };
const SERIF = {
  fontFamily: "'Playfair Display', 'Bodoni Moda', 'Bodoni 72', Didot, Georgia, serif",
};

const ACCENT = '#574A24';
const FOCUS =
  'outline-none focus-visible:ring-2 focus-visible:ring-[#574A24] focus-visible:ring-offset-4 focus-visible:ring-offset-white';

const EMAIL = 'inquiry@s4consultancy.com';

const SERVICES = [
  'Wedding Planning',
  'Banquet Booking',
  'Resorts',
  'Hotel Stays',
  'Corporate Events',
  'Destination Weddings',
  'Management Consultancy',
  'Group Booking',
];

const deliverables = [
  'Wedding planning & décor styling',
  'Banquet booking & venue comparison',
  'Luxury resort & hotel stay curation',
  'Corporate conferences & summits',
  'Destination weddings & logistics',
  'Hospitality management consultancy',
  'Group bookings & room blocks',
];

const EMPTY = {
  fullName: '',
  email: '',
  phone: '',
  selectedService: SERVICES[0],
  eventOrStayDate: '',
  estimatedGuests: '',
  preferredLocation: '',
  message: '',
};

const FIELD =
  'block w-full border-0 border-b border-[#574A24]/25 bg-transparent py-2.5 text-[15px] text-[#574A24] outline-none transition-colors duration-300 placeholder:text-[#80775C]/60 hover:border-[#574A24]/60 focus:border-[#574A24]';

const Field = ({ id, label, required, error, children }) => (
  <div>
    <label htmlFor={id} className="mb-0.5 block text-xs font-medium text-[#80775C]">
      {label}
      {required && (
        <span className="ml-0.5" style={{ color: ACCENT }} aria-hidden="true">
          *
        </span>
      )}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b3261e]">
        <AlertCircle size={13} aria-hidden="true" />
        {error}
      </p>
    )}
  </div>
);

const HomeContactSection = ({ initialService = '', initialData = null, isPage = false }) => {
  const [formData, setFormData] = useState({
    ...EMPTY,
    ...(initialData || {}),
    selectedService: initialData?.selectedService || initialService || SERVICES[0],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!initialService) return;
    const match = SERVICES.find((s) => s.toLowerCase() === initialService.toLowerCase());
    setFormData((prev) => ({ ...prev, selectedService: match || initialService }));
  }, [initialService]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) errs.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      errs.email = 'That email address doesn’t look right.';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number.';
    else if (!/^[0-9+()\- ]{7,20}$/.test(formData.phone.trim()))
      errs.phone = 'That phone number doesn’t look right.';
    if (!formData.message.trim()) errs.message = 'Tell us a little about your plans.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setIsSubmitting(true);
    setSubmitError('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_s4consultancy';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_consultation';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    const templateParams = {
      from_name: formData.fullName,
      fullName: formData.fullName,
      reply_to: formData.email,
      email: formData.email,
      phone: formData.phone,
      phone_number: formData.phone,
      service: formData.selectedService,
      selectedService: formData.selectedService,
      location: formData.preferredLocation || 'Not specified',
      preferredLocation: formData.preferredLocation || 'Not specified',
      date: formData.eventOrStayDate || 'Not specified',
      eventOrStayDate: formData.eventOrStayDate || 'Not specified',
      guests: formData.estimatedGuests || 'Not specified',
      estimatedGuests: formData.estimatedGuests || 'Not specified',
      message: formData.message,
    };

    try {
      if (!publicKey || publicKey === 'YOUR_PUBLIC_KEY') {
        // Fallback simulation if environment variables are not yet configured
        console.warn(
          'EmailJS environment variables (VITE_EMAILJS_PUBLIC_KEY) not found in .env. Simulating submission.'
        );
        await new Promise((res) => setTimeout(res, 900));
      } else {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setIsSubmitting(false);
      setSubmitError(
        err?.text || 'Unable to transmit consultation request. Please try again or email us directly at ' + EMAIL
      );
    }
  };

  const bind = (field) => ({
    id: field,
    name: field,
    value: formData[field],
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    onChange: (e) => {
      setFormData((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        className={`relative w-full text-[#574A24] ${
          isPage ? 'bg-transparent py-6 lg:py-10' : 'bg-white py-16 sm:py-24 lg:py-28 border-t border-[#CBBD93]/30'
        }`}
        style={SANS}
      >
        <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-14">
          {/* ───────────── Details + form ───────────── */}
          <div className="grid gap-14 lg:grid-cols-[4fr_8fr] lg:gap-20">
            {/* left: details */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: EASE }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <p className="max-w-xs text-[15px] leading-relaxed text-[#574A24]/85">
                Choose a service, share your dates and guest count, and a dedicated specialist will reply with
                options shaped around your vision.
              </p>

              <ul className="mt-8">
                <li className="flex items-start gap-4 border-t border-[#CBBD93]/30 py-4">
                  <MapPin size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#80775C]" />
                  <span>
                    <span className="block text-xs text-[#80775C]">Where we work</span>
                    <span className="block text-[15px] leading-snug">
                      Premier destinations across India, Asia-Pacific and beyond
                    </span>
                  </span>
                </li>
                <li className="border-t border-[#CBBD93]/30">
                  <a href="tel:+919876543210" className={`group flex items-center gap-4 py-4 text-inherit no-underline ${FOCUS}`}>
                    <Phone size={18} aria-hidden="true" className="shrink-0 text-[#80775C]" />
                    <span>
                      <span className="block text-xs text-[#80775C]">Call us</span>
                      <span className="block text-[15px]">+91 (0) 98765 43210</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="ml-auto -translate-x-1 translate-y-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ color: ACCENT }}
                    />
                  </a>
                </li>
                <li className="border-b border-t border-[#CBBD93]/30">
                  <a href={`mailto:${EMAIL}`} className={`group flex items-center gap-4 py-4 text-inherit no-underline ${FOCUS}`}>
                    <Mail size={18} aria-hidden="true" className="shrink-0 text-[#80775C]" />
                    <span className="min-w-0">
                      <span className="block text-xs text-[#80775C]">Email us</span>
                      <span className="block break-words text-[15px]" style={{ color: ACCENT }}>{EMAIL}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="ml-auto shrink-0 -translate-x-1 translate-y-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ color: ACCENT }}
                    />
                  </a>
                </li>
              </ul>

              <ul className="mt-8 space-y-2.5 text-[14px] text-[#574A24]/90">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3">
                    <Check size={14} aria-hidden="true" className="shrink-0 text-[#CBBD93]" />
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-8 flex max-w-xs gap-3 text-[13px] leading-relaxed text-[#80775C]">
                <ShieldCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#CBBD93]" />
                We act only in your best interest, from banquet costs to resort contracts to destination logistics.
              </p>
            </motion.aside>

            {/* right: form */}
            <motion.div
              id="inquiry-form"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              {isSubmitted ? (
                <div className="flex min-h-[420px] flex-col items-start justify-center gap-4">
                  <CheckCircle2 size={36} className="text-[#CBBD93]" aria-hidden="true" />
                  <h3 className="m-0 text-[clamp(2rem,4vw,3.4rem)] font-normal leading-tight tracking-[-0.02em] text-[#574A24]" style={SERIF}>
                    Inquiry received
                  </h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-[#574A24]/85">
                    Thank you, <strong className="font-semibold">{formData.fullName}</strong>. A director will
                    review your request for <em>{formData.selectedService}</em> and reply within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ ...EMPTY });
                    }}
                    className={`rounded-full text-sm font-semibold underline underline-offset-4 hover:opacity-70 ${FOCUS}`}
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                  <div>
                    <h3
                      className="m-0 text-[clamp(1.9rem,3.2vw,2.8rem)] font-normal leading-tight tracking-[-0.02em] text-[#574A24]"
                      style={SERIF}
                    >
                      Schedule your <span className="italic">consultation</span>
                    </h3>
                    <p className="mt-2 text-sm text-[#80775C]">
                      Fields marked * are required. We reply within 2 business hours.
                    </p>
                  </div>

                  <div>
                    <span id="service-label" className="block text-xs font-medium text-[#80775C]">
                      I’m looking for <span style={{ color: ACCENT }} aria-hidden="true">*</span>
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-labelledby="service-label">
                      {SERVICES.map((s) => {
                        const on = s === formData.selectedService;
                        return (
                          <button
                            key={s}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => setFormData((p) => ({ ...p, selectedService: s }))}
                            className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-[13px] font-medium transition-colors duration-300 ${FOCUS} ${
                              on
                                ? 'border-[#574A24] bg-[#574A24] text-[#FAE8B4]'
                                : 'border-[#CBBD93]/40 text-[#574A24] hover:border-[#574A24] bg-white'
                            }`}
                          >
                            {on && <Check size={13} aria-hidden="true" />}
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                    <Field id="fullName" label="Full name" required error={errors.fullName}>
                      <input type="text" autoComplete="name" className={FIELD} placeholder="Eleanor Vance" {...bind('fullName')} />
                    </Field>
                    <Field id="email" label="Email address" required error={errors.email}>
                      <input type="email" autoComplete="email" className={FIELD} placeholder="eleanor@example.com" {...bind('email')} />
                    </Field>
                    <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
                      <input type="tel" autoComplete="tel" className={FIELD} placeholder="+91 98765 43210" {...bind('phone')} />
                    </Field>
                    <Field id="preferredLocation" label="Destination / city">
                      <input type="text" className={FIELD} placeholder="Udaipur, Goa, Dubai…" {...bind('preferredLocation')} />
                    </Field>
                    <Field id="eventOrStayDate" label="Preferred date / month">
                      <input type="text" className={FIELD} placeholder="November 2026" {...bind('eventOrStayDate')} />
                    </Field>
                    <Field id="estimatedGuests" label="Expected guests / rooms">
                      <input type="text" className={FIELD} placeholder="150 guests or 25 rooms" {...bind('estimatedGuests')} />
                    </Field>
                  </div>

                  <Field id="message" label="Tell us about your plans" required error={errors.message}>
                    <textarea
                      rows={3}
                      className={`${FIELD} min-h-[5.5rem] resize-y leading-relaxed`}
                      placeholder="Your vision, preferred style, key dates or must-haves…"
                      {...bind('message')}
                    />
                  </Field>

                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs font-medium text-red-700"
                    >
                      <AlertCircle size={15} className="shrink-0 text-red-600" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group inline-flex w-full items-center justify-between gap-6 rounded-full bg-[#574A24] py-2 pl-8 pr-2 text-sm font-semibold text-[#FAE8B4] transition-colors duration-300 hover:bg-[#43381a] disabled:cursor-progress disabled:opacity-70 sm:w-fit sm:justify-start ${FOCUS}`}
                  >
                    {isSubmitting ? 'Sending your inquiry…' : 'Send inquiry'}
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#CBBD93] text-[#574A24]"
                    >
                      <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export { HomeContactSection as ElegantContactSection };
export default HomeContactSection;