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
  const overlayStyle = {
    opacity: 0.08,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23E5E7EB' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
  };

  return (
    <div className="page-layout">
      {/* Hero Section */}
      <section className="page-header">
        <div className="container">
          <div className="page-header__body">
            <span className="hero__eyebrow">About Us</span>
            <h1 className="heading-display">Building Beautiful Spaces Together</h1>
            <p className="body-large text-subtle">
              For over a decade, Geowags has been Ghana&apos;s trusted partner in transforming houses into homes. We bring world-class products and expert guidance to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="page-content">
        <div className="container">
          <div className="about-grid">
            {/* Image */}
            <div className="about-visual">
              <div className="about-visual__frame">
                <div
                  className="absolute inset-0"
                  style={overlayStyle}
                />
              </div>
              <div className="about-visual__accent" />
            </div>

            {/* Content */}
            <div className="stack-lg">
              <span className="caption text-primary">Our Story</span>
              <h2 className="heading-1">A Legacy of Quality & Service</h2>
              <div className="stack-md text-subtle">
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
      <section className="page-content section-muted">
        <div className="container">
          <div className="grid-responsive grid-four">
            {stats.map((stat) => (
              <div key={stat.label} className="surface text-center stack-sm">
                <span className="heading-1 text-primary">
                  {stat.value}
                </span>
                <span className="text-subtle">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="page-content">
        <div className="container">
          <div className="grid-two">
            <div className="surface stack-md">
              <div className="feature-card__icon" style={{ background: "var(--geowags-red)", color: "white" }}>
                <Target className="w-7 h-7" />
              </div>
              <h3 className="heading-2">Our Mission</h3>
              <p className="text-subtle leading-relaxed">
                To be Ghana&apos;s most trusted supplier of premium home improvement
                products, delivering exceptional quality, expert guidance, and
                outstanding service to every customer. We aim to make beautiful,
                functional spaces accessible to all.
              </p>
            </div>

            <div className="surface stack-md">
              <div className="feature-card__icon" style={{ background: "var(--geowags-red)", color: "white" }}>
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="heading-2">Our Vision</h3>
              <p className="text-subtle leading-relaxed">
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
      <section className="page-content section-muted">
        <div className="container">
          <div className="section-header">
            <span className="caption text-primary mb-4 block">What Drives Us</span>
            <h2 className="heading-1">Our Core Values</h2>
            <p className="body-large text-subtle">
              These principles guide everything we do at Geowags.
            </p>
          </div>

          <div className="about-features__grid">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="surface stack-sm" style={{ height: "100%" }}>
                  <div className="feature-card__icon">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="heading-4">{value.title}</h3>
                  <p className="text-subtle text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-content">
        <div className="container">
          <div className="section-header">
            <span className="caption text-primary mb-4 block">Our Journey</span>
            <h2 className="heading-1">Key Milestones</h2>
          </div>

          <div className="stack-lg" style={{ maxWidth: "48rem", margin: "0 auto" }}>
            {milestones.map((milestone) => (
              <div key={milestone.year} className="surface stack-sm">
                <span className="text-primary font-display text-2xl font-bold">
                  {milestone.year}
                </span>
                <h4 className="heading-4">{milestone.title}</h4>
                <p className="text-subtle text-sm leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--geowags-red)]">
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

