import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const ContactForm = ({ initialService = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedService: initialService || 'Wedding Planning',
    eventOrStayDate: '',
    estimatedGuests: '',
    preferredLocation: '',
    message: ''
  });

  useEffect(() => {
    if (initialService) {
      // Find if matches id or title
      const found = servicesData.find(
        (s) => s.id === initialService || s.title.toLowerCase() === initialService.toLowerCase()
      );
      if (found) {
        setFormData((prev) => ({ ...prev, selectedService: found.title }));
      } else {
        setFormData((prev) => ({ ...prev, selectedService: initialService }));
      }
    }
  }, [initialService]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number or WhatsApp is required.';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please provide a valid phone number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide brief details of your event, stay, or consulting requirements.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters describing your request.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      selectedService: 'Wedding Planning',
      eventOrStayDate: '',
      estimatedGuests: '',
      preferredLocation: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="form-success-banner"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="success-icon-box">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="success-title">Inquiry Received</h3>
        <p className="success-desc">
          Thank you, <strong>{formData.fullName}</strong>. Your inquiry for{' '}
          <strong>{formData.selectedService}</strong> has been received by S4Consultancy. A dedicated hospitality specialist will contact you directly within 24 hours.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleReset}
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form className="contact-form-luxury" onSubmit={handleSubmit} noValidate>
      <div className="form-grid-2">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="e.g. Eleanor Vance"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <div className="form-error">
              <AlertCircle size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
              {errors.fullName}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="e.g. eleanor@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="form-error">
              <AlertCircle size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
              {errors.email}
            </div>
          )}
        </div>
      </div>

      <div className="form-grid-2">
        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone / WhatsApp Number *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="e.g. +91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="form-error">
              <AlertCircle size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
              {errors.phone}
            </div>
          )}
        </div>

        {/* Service Selection Dropdown containing all 8 core services */}
        <div className="form-group">
          <label htmlFor="selectedService" className="form-label">
            Required Service *
          </label>
          <select
            id="selectedService"
            name="selectedService"
            className="form-select font-medium"
            value={formData.selectedService}
            onChange={handleChange}
          >
            <option value="Wedding Planning">1. Wedding Planning</option>
            <option value="Banquet Booking & Consultancy">2. Banquet Booking & Consultancy</option>
            <option value="Resorts">3. Resorts</option>
            <option value="Hotel Stays">4. Hotel Stays</option>
            <option value="Corporate Events">5. Corporate Events</option>
            <option value="Destination Weddings">6. Destination Weddings</option>
            <option value="Management Consultancy">7. Management Consultancy</option>
            <option value="Group Booking">8. Group Booking</option>
          </select>
        </div>
      </div>

      <div className="form-grid-3">
        {/* Event / Stay Date */}
        <div className="form-group">
          <label htmlFor="eventOrStayDate" className="form-label">
            Preferred Date / Month
          </label>
          <input
            id="eventOrStayDate"
            type="text"
            name="eventOrStayDate"
            className="form-input"
            placeholder="e.g. November 2026 / Q4"
            value={formData.eventOrStayDate}
            onChange={handleChange}
          />
        </div>

        {/* Estimated Guests / Rooms */}
        <div className="form-group">
          <label htmlFor="estimatedGuests" className="form-label">
            Expected Guests / Keys
          </label>
          <input
            id="estimatedGuests"
            type="text"
            name="estimatedGuests"
            className="form-input"
            placeholder="e.g. 150 Guests or 25 Rooms"
            value={formData.estimatedGuests}
            onChange={handleChange}
          />
        </div>

        {/* Location Preference */}
        <div className="form-group">
          <label htmlFor="preferredLocation" className="form-label">
            Destination / City
          </label>
          <input
            id="preferredLocation"
            type="text"
            name="preferredLocation"
            className="form-input"
            placeholder="e.g. Udaipur, Goa, Dubai..."
            value={formData.preferredLocation}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Message / Scope */}
      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Event Requirements & Inquiries *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`form-textarea ${errors.message ? 'error' : ''}`}
          placeholder="Please share details such as your vision, preferred style, specific dates, or key requirements for S4Consultancy..."
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && (
          <div className="form-error">
            <AlertCircle size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
            {errors.message}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="form-submit-row">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {isSubmitting ? (
            <span>Transmitting Inquiry...</span>
          ) : (
            <>
              <span>Submit S4Consultancy Inquiry</span>
              <Send size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
