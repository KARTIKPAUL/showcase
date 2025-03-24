"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import CaseCarousel from "../Cases/caseCarousel";
import Description from "./Description";

// Sample data for showcases
const showcases = [
  {
    id: 1,
    title: "Minimal Misty Showcase",
    image: "/images/showcase/misty-showcase.jpg",
    views: "10.9K",
    author: "You",
  },
  {
    id: 2,
    title: "Follow // Image Showcase",
    image: "/images/showcase/follow-showcase.jpg",
    views: "10.4K",
    author: "You",
  },
  {
    id: 3,
    title: "Nebular Haze Effect",
    image: "/images/showcase/nebular-effect.jpg",
    views: "9.5K",
    author: "You",
  },
  {
    id: 4,
    title: "Floating Circle Effect",
    image: "/images/showcase/floating-circle.jpg",
    views: "8.4K",
    author: "You",
  },
  {
    id: 5,
    title: "Night Scene Capture",
    image: "/images/showcase/night-scene.jpg",
    views: "7.9K",
    author: "You",
  },
  {
    id: 6,
    title: "Fashion Display New In",
    image: "/images/showcase/fashion-display.jpg",
    views: "6.1K",
    author: "You",
  },
];

const tags = [
  { name: "wordpress", theme: "blue" },
  { name: "womenempowerment", theme: "purple" },
  { name: "news", theme: "green" },
  { name: "technology", theme: "red" },
  { name: "education", theme: "amber" },
];

const getColorClasses = (theme : string) => {
  const themeColors = {
    blue: "bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600",
    purple:
      "bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-600",
    green: "bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-600",
    red: "bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600",
    amber: "bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-600",
  };

  //return themeColors[theme] || themeColors.blue; // Default to blue if theme not found
};

const carouselItems = [
  // {
  //   src: "/images/ShowCase/desktopView.png",
  //   alt: "Digital Marketing",
  //   title: "Digital Marketing",
  //   description: "Boost your online presence with data-driven strategies",
  // },
  {
    src: "/images/ShowCase/Image3.png",
    alt: "Digital Marketing",
    title: "Digital Marketing",
    description: "Boost your online presence with data-driven strategies",
  },
  {
    src: "/images/ShowCase/Image4.png",
    alt: "IOT Development",
    title: "IoT Development",
    description: "Connecting your devices for a smarter tomorrow",
  },
  {
    src: "/images/ShowCase/Image4.png",
    alt: "Mobile App Development",
    title: "Mobile App Development",
    description: "Native and cross-platform solutions for your business",
  },
  {
    src: "/images/Carousel/socialMedia.webp",
    alt: "Social Media Solutions",
    title: "Social Media Solutions",
    description: "Engage with your audience across all platforms",
  },
];

// Updated images array with sample metadata
const images = [
  {
    src: "/images/ShowCase/desktopView.png",
    alt: "Dashboard Overview",
    title: "Smart Dashboard",
    description:
      "Interactive dashboard with real-time analytics and user activity monitoring.",
  },
  {
    src: "/images/ShowCase/Image3.png",
    alt: "Mobile Interface",
    title: "Mobile Experience",
    description:
      "Seamless mobile optimization with gesture-based navigation and dark mode.",
  },
  {
    src: "/images/ShowCase/Image4.png",
    alt: "Data Visualization",
    title: "Advanced Analytics",
    description:
      "Customizable charts and graphs for deep data insights and reporting.",
  },
  {
    src: "/images/ShowCase/desktopView.png",
    alt: "Collaboration Hub",
    title: "Team Workspace",
    description:
      "Real-time collaboration features with comment threads and file sharing.",
  },
];

export default function ReimaginedShowcase() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* Video Section */}
      <section className="border-b border-gray-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
            <iframe
              src="https://www.youtube.com/embed/BdSn001dTas?si=2gmS4eY6eKXqbce9"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Description */}
      <Description />
      {/* Info Section */}
      <section className="border-b border-gray-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 text-sm md:flex-row">
            <div>
              <p className="text-gray-400">
                SuperWomen.live is a Marathi digital platform dedicated to
                empowering women in Maharashtra,by highlighting their
                achievements and promoting social awareness.
              </p>
              <p className="mt-2 text-gray-400">
                {" "}
                The website features a variety of content, including news,
                health, agriculture, and literature, all aimed at inspiring and
                informing its audience. It also showcases stories of women
                excelling in various fields, providing role models for the
                community.
              </p>
              <p className="mt-2 text-gray-400">
                {" "}
                Newspaper is your news, entertainment, music fashion website. We
                provide you with the latest breaking news and videos straight
                from the entertainment industry.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-gray-500">Tags</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1.5 ${getColorClasses(tag.theme)} cursor-pointer rounded-full text-sm font-medium transition-colors duration-200`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="border-b border-gray-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium">Original Work</h3>
              <p className="mt-2 text-sm text-gray-400">
                https://superwomen.live/
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400">
                SuperWomen.live is a groundbreaking Marathi digital platform
                dedicated to women's empowerment and social awareness in
                Maharashtra. Developed by Kodekloud, this comprehensive portal
                features.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                * Regional updates from Gandhi and surrounding areas.In-depth
                articles & interviews.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                * Newspaper is your news, entertainment, music fashion website.
                We provide you with the latest breaking news and videos straight
                from the entertainment industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-4xl font-bold text-purple-900">
              Platform Preview
              <span className="ml-4 rounded-full bg-purple-100 px-4 py-1 text-lg text-purple-700">
                {images.length} Premium Views
              </span>
            </h2>
            <p className="text-lg text-gray-100">
              Explore our immersive digital experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative h-72 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {/* Image with Gradient Overlay */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="transform object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {/* Top Badge */}
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-sm text-purple-700">
                      #{index + 1} Feature
                    </span>
                    <button className="rounded-full bg-white/90 p-2 transition-colors hover:bg-white">
                      ⭐
                    </button>
                  </div>

                  {/* Bottom Content */}
                  <div className="text-white">
                    <h3 className="mb-2 text-xl font-bold">
                      {image.title || "Feature Preview"}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm">
                      {image.description ||
                        "Innovative feature enhancing user experience"}
                    </p>
                    <div className="flex gap-3">
                      <button className="flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white/30">
                        👁 Quick View
                      </button>
                      <button className="flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white/30">
                        📌 Save
                      </button>
                    </div>
                  </div>
                </div>

                {/* Static Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-purple-900">
                      {image.alt}
                    </span>
                    <div className="flex items-center gap-1">
                      🔥
                      <span className="font-medium">
                        {Math.floor(Math.random() * 1000)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel */}

      <div className="flex items-center justify-center">
        <CaseCarousel items={carouselItems} />
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-8 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Ready to Explore the Platform?
          </h2>
          <a
            href="https://superwomen.live"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded border border-gray-400 bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white hover:text-black"
          >
            Visit SuperWomen.live →
          </a>
        </div>
      </section>
    </div>
  );
}
