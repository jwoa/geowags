"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: [SITE_CONFIG.phone],
    action: { label: "Call now", href: `tel:${SITE_CONFIG.phone}` },
  },
  {
    icon: Mail,
    title: "Email",
    details: [SITE_CONFIG.email],
    action: { label: "Send email", href: `mailto:${SITE_CONFIG.email}` },
  },
  {
    icon: MapPin,
    title: "Location",
    details: [SITE_CONFIG.address],
    action: { label: "Get directions", href: "https://maps.google.com" },
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM", "Sun: Closed"],
  },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="pt-[var(--header-height)]">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl">
            <span className="inline-block mb-4 text-sm uppercase tracking-[0.2em] text-[var(--geowags-red)] font-medium">
              Contact Us
            </span>
            <h1 className="heading-1 text-gray-900 mb-6">
              Let&apos;s Start a Conversation
            </h1>
            <p className="body-large text-gray-600">
              Have questions about our products? Planning a project? Our team is
              ready to help. Reach out through any of the channels below or fill
              out the contact form.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => {
              const IconComponent = info.icon;
              return (
                <div key={info.title} className="p-6 bg-gray-50">
                  <div className="w-12 h-12 flex items-center justify-center bg-white text-[var(--geowags-red)] mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="heading-4 text-gray-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                  {info.action && (
                    <a
                      href={info.action.href}
                      target={info.action.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 text-sm text-[var(--geowags-red)] font-medium mt-3 hover:gap-2 transition-all"
                    >
                      {info.action.label}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="heading-2 text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-50 border border-green-200 p-8 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="heading-4 text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-700">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="label">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`input ${errors.name ? "border-red-500" : ""}`}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="label">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`input ${errors.email ? "border-red-500" : ""}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input"
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="label">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="input"
                          placeholder="Your company (optional)"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="label">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="products">Product Information</option>
                        <option value="quote">Request a Quote</option>
                        <option value="support">Customer Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="label">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`input textarea ${errors.message ? "border-red-500" : ""}`}
                        placeholder="Tell us about your project or inquiry..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-large w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="heading-2 text-gray-900 mb-2">Visit Our Showroom</h2>
              <p className="text-gray-600 mb-8">
                Experience our products in person at our Accra showroom. Our team
                is ready to assist you.
              </p>

              {/* Map Placeholder */}
              <div className="relative aspect-[4/3] bg-gray-100 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-[var(--geowags-red)]" />
                      <p className="text-sm">Interactive map coming soon</p>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--geowags-red)] font-medium mt-2 hover:gap-2 transition-all"
                      >
                        Open in Google Maps
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Services */}
              <div className="bg-gray-50 p-6">
                <h3 className="heading-4 text-gray-900 mb-4">Our Services</h3>
                <ul className="space-y-3">
                  {[
                    "Product consultation and recommendations",
                    "Professional measurement services",
                    "Delivery across Ghana",
                    "Installation referrals",
                    "Bulk order discounts",
                  ].map((service) => (
                    <li key={service} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--geowags-teal)] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container text-center">
          <h2 className="heading-3 text-gray-900 mb-4">Have More Questions?</h2>
          <p className="text-gray-600 mb-6">
            Check out our frequently asked questions or reach out directly.
          </p>
          <Link href="/faq" className="btn btn-outline">
            View FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}

