import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Scheduled Maintenance",
  description:
    "Geowags is temporarily offline for scheduled maintenance. We will be back shortly with an improved experience.",
  robots: { index: false, follow: false },
};

const statusHighlights = [
  {
    label: "Current status",
    detail: "Scheduled maintenance in progress",
  },
  {
    label: "Next update",
    detail: "We expect to be back shortly",
  },
  {
    label: "Need help?",
    detail: `Email ${SITE_CONFIG.email} or call ${SITE_CONFIG.phone}`,
  },
];

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-white flex items-center">
      <section className="section w-full">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="caption text-gray-500 tracking-[0.2em] uppercase">
              Maintenance
            </p>
            <h1 className="heading-display text-gray-900">
              We&apos;re polishing things up.
            </h1>
            <p className="body-large text-gray-600 text-pretty">
              Our site is temporarily offline while we apply upgrades to deliver
              a smoother, more refined experience. Thank you for your patience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`mailto:${SITE_CONFIG.email}`}
                className="btn btn-primary"
                aria-label="Email Geowags support"
              >
                Email Support
              </Link>
              <Link
                href="/contact"
                className="btn btn-secondary"
                aria-label="Contact Geowags"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
            {statusHighlights.map((item) => (
              <article
                key={item.label}
                className="card p-6 text-left space-y-2"
                aria-label={item.label}
                tabIndex={0}
              >
                <p className="caption text-gray-500">{item.label}</p>
                <p className="body-large text-gray-900">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-gray-500">
            <span className="inline-flex items-center gap-2" aria-live="polite">
              <span
                className="h-2.5 w-2.5 rounded-full bg-[#DC2626] animate-pulse"
                aria-hidden="true"
              />
              Live system status: upgrading in progress
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
