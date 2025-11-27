import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Users, Target, Eye, Heart, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_CONFIG.name} - Ghana's premier supplier of high-quality housewares, tiles, bathroom fixtures, and home improvement products. Our story, mission, and values.`,
};

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We source only the finest materials and products from trusted manufacturers worldwide, ensuring every item meets our rigorous standards.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction drives everything we do. Our expert team is dedicated to helping you find the perfect products for your projects.",
  },
  {
    icon: Heart,
    title: "Passion for Design",
    description: "We believe beautiful spaces improve lives. Our curated collections reflect our love for exceptional design and craftsmanship.",
  },
  {
    icon: Target,
    title: "Integrity",
    description: "We build lasting relationships through honest advice, fair pricing, and transparent business practices.",
  },
];

const milestones = [
  { year: "2010", title: "Founded", description: "Geowags was established in Accra with a vision to bring premium home products to Ghana." },
  { year: "2014", title: "Expanded", description: "Opened our flagship showroom and expanded our product range to include bathroom fixtures." },
  { year: "2018", title: "Growth", description: "Partnered with international brands and became a trusted supplier for architects and designers." },
  { year: "2023", title: "Innovation", description: "Launched our digital platform to serve customers nationwide with enhanced convenience." },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "50+", label: "Partner Brands" },
];

export default function AboutPage() {
  return (
    <div className="pt-[var(--header-height)]">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--geowags-red)] rounded-full blur-[150px]" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container relative">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-sm uppercase tracking-[0.2em] text-[var(--geowags-red)] font-medium">
              About Us
            </span>
            <h1 className="heading-display text-white mb-6">
              Building Beautiful Spaces Together
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              For over a decade, Geowags has been Ghana&apos;s trusted partner in
              transforming houses into homes. We bring world-class products and
              expert guidance to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--geowags-red)]" />
            </div>

            {/* Content */}
            <div>
              <span className="caption text-[var(--geowags-red)] mb-4 block">Our Story</span>
              <h2 className="heading-1 text-gray-900 mb-6">
                A Legacy of Quality & Service
              </h2>
              <div className="space-y-4 text-gray-600 mb-8">
                <p>
                  Geowags was founded with a simple but powerful mission: to make
                  premium home improvement products accessible to everyone in Ghana.
                  What started as a small tile showroom in Accra has grown into the
                  country&apos;s leading destination for housewares, tiles, and bathroom
                  fixtures.
                </p>
                <p>
                  Our founder&apos;s passion for design and quality craftsmanship laid
                  the foundation for what Geowags represents today. We&apos;ve built
                  lasting relationships with the world&apos;s finest manufacturers,
                  allowing us to offer products that combine exceptional quality with
                  competitive pricing.
                </p>
                <p>
                  Today, we serve thousands of homeowners, architects, interior
                  designers, and contractors across Ghana. Our team of experts is
                  dedicated to helping every customer find the perfect products for
                  their unique vision.
                </p>
              </div>
              <Link href="/products" className="btn btn-primary btn-large group">
                Explore Our Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-4xl lg:text-5xl font-display font-bold text-[var(--geowags-red)] mb-2">
                  {stat.value}
                </span>
                <span className="text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="p-8 lg:p-12 bg-gray-50">
              <div className="w-14 h-14 flex items-center justify-center bg-[var(--geowags-red)] text-white mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="heading-2 text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To be Ghana&apos;s most trusted supplier of premium home improvement
                products, delivering exceptional quality, expert guidance, and
                outstanding service to every customer. We aim to make beautiful,
                functional spaces accessible to all.
              </p>
            </div>

            <div className="p-8 lg:p-12 bg-gray-900 text-white">
              <div className="w-14 h-14 flex items-center justify-center bg-[var(--geowags-red)] text-white mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="heading-2 mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To transform the home improvement industry in Ghana by setting new
                standards for product quality, customer experience, and design
                innovation. We envision a future where every Ghanaian home reflects
                the aspirations of its owners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <span className="caption text-[var(--geowags-red)] mb-4 block">What Drives Us</span>
            <h2 className="heading-1 text-gray-900 mb-4">Our Core Values</h2>
            <p className="body-large text-gray-600">
              These principles guide everything we do at Geowags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="bg-white p-8">
                  <div className="w-14 h-14 flex items-center justify-center bg-gray-100 text-[var(--geowags-red)] mb-6">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="heading-4 text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="caption text-[var(--geowags-red)] mb-4 block">Our Journey</span>
            <h2 className="heading-1 text-gray-900 mb-4">Key Milestones</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-[var(--geowags-red)] font-display text-2xl font-bold mb-2 block">
                    {milestone.year}
                  </span>
                  <h4 className="heading-4 text-gray-900 mb-2">{milestone.title}</h4>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[var(--geowags-red)] rounded-full -translate-x-1/2 ring-4 ring-white" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--geowags-red)]">
        <div className="container text-center">
          <h2 className="heading-1 text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Visit our showroom or get in touch with our team. We&apos;re here to help
            you find the perfect products for your space.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn btn-large bg-white text-[var(--geowags-red)] hover:bg-gray-100"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="btn btn-large border-white text-white hover:bg-white/10"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

