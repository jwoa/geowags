import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Users, Target, Eye, Heart } from "lucide-react";
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
  { year: "1981", title: "Founded", description: "Geowags was established by Mr. George Wiafe-Agyekum as a sole proprietorship, bringing quality sanitary ware to the Ghanaian market." },
  { year: "1990", title: "Incorporated", description: "The company was incorporated as a limited liability company, expanding operations and establishing a network of showrooms across Ghana." },
  { year: "2000s", title: "Global Partnerships", description: "Partnered with world-leading manufacturers including Vado (UK), Grespania (Spain), Gala (Spain), and Reginox (Netherlands)." },
  { year: "2018", title: "Digital Expansion", description: "Launched comprehensive online presence, making our full product catalog accessible to customers nationwide." },
];

const stats = [
  { value: "40+", label: "Years Experience" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "600+", label: "Products" },
  { value: "30+", label: "Team Members" },
];

const team = [
  {
    name: "Mr. George Wiafe-Agyekum",
    role: "Founder & C.E.O",
    image: "/images/team/george-wiafe-agyekum.png",
    description: "Founded Geowags in 1981 with a vision to make quality building materials accessible to Ghanaians. For over four decades, Mr. George has built lasting partnerships with world-leading manufacturers.",
  },
  {
    name: "Mr. Kwame Wiafe-Agyekum",
    role: "Managing Director",
    image: "/images/team/kwame-wiafe-agyekum.png",
    description: "Leading operations and strategic growth, Mr. Kwame continues the family legacy of quality and customer excellence that has defined Geowags since 1981.",
  },
  {
    name: "Mr. Eric Abrakwah",
    role: "General Manager",
    image: "/images/team/eric-abrakwah.png",
    description: "With deep expertise in building materials, Mr. Eric oversees our showroom operations and ensures customers receive expert guidance on product selection.",
  },
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
              For over four decades, Geowags has been Ghana&apos;s trusted partner in transforming houses into homes. We bring world-class products and expert guidance to every project.
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
                  Geowags was founded in 1981 by Mr. George Wiafe-Agyekum with a 
                  simple but powerful mission: to make quality sanitary ware, tiles, 
                  paints, and kitchen products available to the Ghanaian market.
                </p>
                <p>
                  What started as a sole proprietorship has grown into one of 
                  Ghana&apos;s most trusted names in building materials. In 1990, the 
                  company was incorporated as a limited liability company, marking 
                  a new chapter of growth and expansion across the country.
                </p>
                <p>
                  The name Geowags has long been synonymous with quality, design, 
                  and style when it comes to bathrooms, paints, and kitchens. We 
                  represent tested and trusted brands from around the world — Vado 
                  from the UK, Grespania from Spain, Gala from Spain, Reginox from 
                  the Netherlands, and many others.
                </p>
                <p>
                  As a fresh and innovative company, we pride ourselves on our 
                  choice of products — quality branded goods at exceptional value 
                  for money. Our experienced staff is always at hand to offer 
                  advice and an exceptional level of customer service.
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

      {/* Team Photo */}
      <section className="page-content">
        <div className="container">
          <div className="section-header">
            <span className="caption text-primary mb-4 block">Our Team</span>
            <h2 className="heading-1">The People Behind Geowags</h2>
            <p className="body-large text-subtle">
              Our dedicated team of over 30 professionals is committed to serving you.
            </p>
          </div>

          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-lg mb-16">
            <Image
              src="/images/hero/aboutus.jpg"
              alt="The Geowags team at our showroom"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Leadership */}
          <div className="section-header">
            <h3 className="heading-2">Leadership Team</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="surface text-center stack-md">
                <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-full border-4 border-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div>
                  <h4 className="heading-4">{member.name}</h4>
                  <span className="text-primary text-sm font-medium uppercase tracking-wider">
                    {member.role}
                  </span>
                </div>
                <p className="text-subtle text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-content section-muted">
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

