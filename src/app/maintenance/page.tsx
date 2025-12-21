import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const contactEmail =
  process.env.NEXT_PUBLIC_MAINTENANCE_EMAIL || SITE_CONFIG.email;

export const metadata: Metadata = {
  title: "Scheduled Maintenance",
  description:
    "Geowags is temporarily offline for scheduled maintenance. We will be back shortly with an improved experience.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="section w-full">
        <div className="container flex flex-col items-center gap-14 md:gap-16">
          <div className="max-w-3xl text-center stack-xl">
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
            <div className="flex flex-col items-center gap-5">
              <p className="body-large text-gray-700">
                For any urgent inquiries, please reach out via email.
              </p>
              <Link
                href={`mailto:${contactEmail}`}
                className="btn btn-primary"
                aria-label="Email Geowags support"
              >
                Email Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
