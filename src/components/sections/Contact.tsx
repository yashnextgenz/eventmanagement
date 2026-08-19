'use client';

import { contactInfo } from '@/lib/data';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2, CheckCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guests: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const inputClass =
  'w-full px-4 py-3 bg-ivory border border-dark-text/10 rounded-sm text-dark-text text-sm placeholder:text-dark-text/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-300';

const labelClass = 'block text-xs uppercase tracking-wider text-dark-text/60 mb-1.5 font-medium';

const errorInputClass =
  'w-full px-4 py-3 bg-ivory border border-red-400 rounded-sm text-dark-text text-sm placeholder:text-dark-text/40 focus:outline-none focus:border-red-400 focus:ring-red-400/20 transition-all duration-300';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guests: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const contactItems = [
    { icon: Phone, label: 'Phone', value: contactInfo.phone, href: undefined },
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MapPin, label: 'Address', value: contactInfo.address, href: undefined },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with us',
      href: contactInfo.whatsapp,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-24 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-gold-dark uppercase font-semibold"
          >
            GET IN TOUCH
          </motion.p>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-2 mb-4" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text"
          >
            Let&apos;s Talk About Your Event
          </motion.h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
          {/* Left Column — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-gold" size={20} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-dark-text/50">
                      {item.label}
                    </span>
                    <p className="text-base text-dark-text font-medium mt-1">{item.value}</p>
                  </div>
                </div>
              );

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'WhatsApp' ? '_blank' : undefined}
                    rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    className="block group"
                  >
                    <div className="transition-all duration-300 group-hover:opacity-80">
                      {content}
                    </div>
                  </a>
                );
              }

              return <div key={item.label}>{content}</div>;
            })}
          </motion.div>

          {/* Right Column — Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-sm p-6 md:p-8 shadow-sm border border-gold/10">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? errorInputClass : inputClass}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? errorInputClass : inputClass}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? errorInputClass : inputClass}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Event Type */}
                  <div>
                    <label htmlFor="eventType" className={labelClass}>
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label htmlFor="eventDate" className={labelClass}>
                      Event Date
                    </label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label htmlFor="guests" className={labelClass}>
                      Number of Guests
                    </label>
                    <input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      placeholder="Estimated guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your event vision..."
                      value={formData.message}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-gold text-dark-text py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      SENDING...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={18} />
                      ENQUIRY SENT!
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      SEND ENQUIRY
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <div className="w-full h-[300px] md:h-[400px] rounded-sm overflow-hidden border border-gold/10">
            <iframe
              src={contactInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sree Souram Event Management Location"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
