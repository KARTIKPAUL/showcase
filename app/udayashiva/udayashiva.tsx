"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaPlay, FaPause, FaArrowRight, FaArrowLeft, FaHeart, FaShare } from "react-icons/fa"

export default function UdayaShivaShowcase() {
  const shareUrl = "https://www.udayashiva.in/"
  const shareTitle = "Udaya Shiva - Premium Construction Services"
  const shareText = "Experience top-quality construction and building solutions with Udaya Shiva's expert team."

  const [activeTab, setActiveTab] = useState("overview")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const playerRef = useRef<HTMLIFrameElement | null>(null)

  // Gallery images with metadata
  const galleryImages = [
    {
      src: "/images/ShowCase/udayashiva/homepage.jpg",
      alt: "Udaya Shiva Homepage",
      title: "Modern Construction Portal",
      description: "The welcoming interface showcasing construction services and projects.",
      category: "UI Design",
    },
    {
      src: "/images/ShowCase/udayashiva/projects.jpg",
      alt: "Construction Projects",
      title: "Our Completed Projects",
      description: "Showcase of our high-quality construction projects and buildings.",
      category: "Projects",
    },
    {
      src: "/images/ShowCase/udayashiva/services.jpg",
      alt: "Construction Services",
      title: "Comprehensive Services",
      description: "Detailed overview of our construction and building services.",
      category: "Services",
    },
    {
      src: "/images/ShowCase/udayashiva/team.jpg",
      alt: "Expert Team",
      title: "Professional Team",
      description: "Meet our team of experienced construction professionals.",
      category: "Team",
    },
    {
      src: "/images/ShowCase/udayashiva/contact.jpg",
      alt: "Contact Section",
      title: "Easy Communication",
      description: "Convenient system for contacting our construction team.",
      category: "Features",
    },
    {
      src: "/images/ShowCase/udayashiva/mobile-view.jpg",
      alt: "Mobile Responsive",
      title: "Mobile-Friendly Design",
      description: "Optimized experience for clients on smartphones.",
      category: "UI Design",
    },
  ]

  // Features list
  const features = [
    {
      icon: "🏗️",
      title: "Quality Construction",
      description: "Residential, commercial, and industrial building solutions",
    },
    {
      icon: "👷",
      title: "Expert Team",
      description: "Experienced construction professionals with specialized skills",
    },
    {
      icon: "🏭",
      title: "Modern Techniques",
      description: "State-of-the-art construction methods and materials",
    },
    {
      icon: "📅",
      title: "Timely Delivery",
      description: "Projects completed on schedule with quality assurance",
    },
    {
      icon: "📐",
      title: "Custom Designs",
      description: "Tailored construction solutions for your needs",
    },
    {
      icon: "📍",
      title: "Service Areas",
      description: "Serving clients across multiple regions",
    },
  ]

  // Stats
  const stats = [
    { label: "Years of Experience", value: "10+" },
    { label: "Completed Projects", value: "50+" },
    { label: "Happy Clients", value: "100+" },
    { label: "Service Areas", value: "Multiple" },
  ]

  // Handle video play/pause
  const toggleVideo = () => {
    if (playerRef.current) {
      try {
        if (playerRef.current.contentWindow) {
          const message = JSON.stringify({
            event: "command",
            func: isVideoPlaying ? "pauseVideo" : "playVideo",
          })
          playerRef.current.contentWindow.postMessage(message, "*")
        }
        setIsVideoPlaying(!isVideoPlaying)
      } catch (error) {
        console.error("Error controlling YouTube player:", error)
      }
    }
  }

  // YouTube player state listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        if (data.info && data.info.playerState !== undefined) {
          if (data.info.playerState === 1) {
            setIsVideoPlaying(true)
          } else if (data.info.playerState === 2) {
            setIsVideoPlaying(false)
          }
        }
      } catch (e) {
        // Not a JSON message or not from YouTube
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      const shareLink = `https://www.addtoany.com/share#url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&description=${encodeURIComponent(shareText)}`
      window.open(shareLink, "_blank")
    }
  }

  // Gallery navigation
  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  // Auto-rotate gallery
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextGalleryImage()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="min-h-screen text-black dark:text-white">
      {/* Hero Section with Video */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mx-auto mt-12 aspect-video max-w-7xl overflow-hidden rounded-2xl border border-orange-500/20 shadow-2xl"
          >
            <div className="group relative h-full w-full">
              <iframe
                ref={playerRef}
                src="https://www.youtube.com/embed/construction-video-id?enablejsapi=1&controls=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Udaya Shiva Construction Showcase"
                className="h-full w-full"
              />

              {/* Video overlay with play button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={toggleVideo}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white transition-transform duration-300 hover:scale-110"
                >
                  {isVideoPlaying ? <FaPause className="h-6 w-6" /> : <FaPlay className="h-6 w-6 pl-1" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="mx-auto max-w-7xl sticky top-16 z-10 border-b border-orange-900/50 bg-[#663300]/80 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            {["overview", "gallery", "features", "stats"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mr-6 whitespace-nowrap px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-orange-400 text-orange-300"
                    : "text-orange-200/70 hover:text-orange-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative overflow-hidden mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-amber-500 opacity-10 blur-3xl"></div>
        </div>
        
        {/* Overview Section */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-12 md:grid-cols-2"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-orange-500">About Udaya Shiva</h2>
                <p className="mt-4 dark:text-orange-100/80">
                  Udaya Shiva provides premium construction services with a client-centered approach. 
                  Our company offers comprehensive building solutions using modern techniques and quality materials.
                </p>
                <p className="mt-4 dark:text-orange-100/80">
                  With over 10 years of experience, our team is committed to delivering exceptional 
                  construction services including residential, commercial, and industrial projects.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-400">Company Details</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-orange-900/20 p-4">
                    <span className="text-sm dark:text-orange-300">Specializations</span>
                    <p className="font-medium">Construction & Building</p>
                  </div>
                  <div className="rounded-lg bg-orange-900/20 p-4">
                    <span className="text-sm dark:text-orange-300">Technologies</span>
                    <p className="font-medium">Modern Construction Methods</p>
                  </div>
                  <div className="rounded-lg bg-orange-900/20 p-4">
                    <span className="text-sm dark:text-orange-300">Location</span>
                    <p className="font-medium">Multiple Service Areas</p>
                  </div>
                  <div className="rounded-lg bg-orange-900/20 p-4">
                    <span className="text-sm dark:text-orange-300">Established</span>
                    <p className="font-medium">2013</p>
                  </div>
                  <div className="rounded-lg bg-orange-900/20 p-4">
                    <span className="text-sm dark:text-orange-300">Team</span>
                    <p className="font-medium">Skilled Professionals</p>
                  </div>
                  <div className="rounded-lg bg-orange-900/20 p-4">
                    <span className="text-sm dark:text-orange-300">Website</span>
                    <p className="font-medium">WordPress</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-400">Our Mission</h3>
                <ul className="mt-4 space-y-3 dark:text-orange-100/80">
                  <li className="flex items-start">
                    <span className="mr-2 text-orange-400">•</span>
                    Provide high-quality construction services
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-orange-400">•</span>
                    Deliver projects on time and within budget
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-orange-400">•</span>
                    Use best materials and construction practices
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-orange-400">•</span>
                    Ensure client satisfaction at every stage
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-orange-400">•</span>
                    Maintain transparency in all operations
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative max-w-full rounded-2xl border border-orange-500/20">
              <div className="inline-block h-[800px] overflow-y-auto">
                <Image
                  src="/images/ShowCase/udayashiva/full-website-screenshot.jpg"
                  alt="Udaya Shiva Website"
                  width={1200}
                  height={800}
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Section */}
        {activeTab === "gallery" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-500">Project Showcase</h2>
              <p className="mx-auto mt-4 max-w-2xl dark:text-orange-100/80">
                Explore our construction projects, team, and services through these images.
              </p>
            </div>

            {/* Main Gallery Carousel */}
            <div
              className="relative mx-auto max-w-7xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-orange-500/20 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGalleryIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={galleryImages[currentGalleryIndex].src}
                      alt={galleryImages[currentGalleryIndex].alt}
                      fill
                      className="object-cover"
                    />

                    {/* Image overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <span className="inline-block rounded-full bg-orange-500/80 px-3 py-1 text-xs font-medium">
                          {galleryImages[currentGalleryIndex].category}
                        </span>
                        <h3 className="mt-2 text-2xl font-bold text-white">{galleryImages[currentGalleryIndex].title}</h3>
                        <p className="mt-2 max-w-lg text-orange-100/90">
                          {galleryImages[currentGalleryIndex].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                <button
                  onClick={prevGalleryImage}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={nextGalleryImage}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <FaArrowRight />
                </button>

                {/* Pagination dots */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGalleryIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        currentGalleryIndex === index ? "w-6 bg-orange-400" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

             {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    currentGalleryIndex === index ? "border-orange-400" : "border-transparent"
                  }`}
                >
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  <div
                    className={`absolute inset-0 bg-black/30 transition-opacity ${
                      currentGalleryIndex === index ? "opacity-0" : "opacity-50"
                    }`}
                  ></div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

        {/* Features Section */}
        {activeTab === "features" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-500">Construction Services</h2>
              <p className="mx-auto mt-4 max-w-2xl dark:text-orange-100/80">
                We offer comprehensive construction services using quality materials and modern techniques.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-900/40 to-orange-800/20 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl transition-all group-hover:bg-orange-500/20"></div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl">
                    {feature.icon}
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-orange-100/80">{feature.description}</p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300 group-hover:w-full"></div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-white">Construction Process</h3>
                  <p className="mt-4 text-orange-100/80">
                    Our construction process ensures quality at every stage:
                  </p>
                  <ul className="mt-6 space-y-2 text-orange-100/80">
                    <li className="flex items-center">
                      <span className="mr-2 text-orange-400">✓</span>
                      Detailed project planning and design
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-orange-400">✓</span>
                      Quality material selection and procurement
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-orange-400">✓</span>
                      Skilled workforce and professional supervision
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-orange-400">✓</span>
                      Regular quality checks and progress updates
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-orange-400">✓</span>
                      Timely completion and handover
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-64 w-64">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-orange-500/20 animate-pulse">
                      <div className="h-48 w-48 rounded-full bg-amber-500/20 animate-pulse delay-300">
                        <div className="flex h-full items-center justify-center">
                          <span className="text-6xl">🏗️</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        {activeTab === "stats" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-500">Our Achievements</h2>
              <p className="mx-auto mt-4 max-w-2xl text-orange-100/80">
                Udaya Shiva has been delivering quality construction services for over a decade.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-900/40 to-orange-800/20 p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl transition-all group-hover:bg-orange-500/20"></div>

                  <h3 className="mb-2 text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-orange-100/80">{stat.label}</p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300 group-hover:w-full"></div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-white">Client Testimonials</h3>
                  <p className="mt-4 text-orange-100/80">
                    Our clients' satisfaction is our greatest achievement. Here's what they say about their experiences:
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-lg bg-orange-900/30 p-4">
                      <p className="italic text-orange-100/90">
                        "Udaya Shiva built our dream home exactly as we envisioned. Their attention to detail was exceptional."
                      </p>
                      <p className="mt-2 text-right text-sm font-medium text-orange-300">— Rajesh Kumar, Homeowner</p>
                    </div>
                    <div className="rounded-lg bg-orange-900/30 p-4">
                      <p className="italic text-orange-100/90">
                        "The commercial complex was delivered on time and within budget. Highly professional team."
                      </p>
                      <p className="mt-2 text-right text-sm font-medium text-orange-300">— Priya Enterprises, Business Owner</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Service Quality</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-200">Client Satisfaction</span>
                        <span className="text-sm font-medium text-orange-300">97%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-orange-900/30">
                        <div className="h-2 w-[97%] rounded-full bg-gradient-to-r from-orange-400 to-amber-400"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-200">Project Success Rate</span>
                        <span className="text-sm font-medium text-orange-300">95%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-orange-900/30">
                        <div className="h-2 w-[95%] rounded-full bg-gradient-to-r from-orange-400 to-amber-400"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-200">On-Time Delivery</span>
                        <span className="text-sm font-medium text-orange-300">92%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-orange-900/30">
                        <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-orange-400 to-amber-400"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-200">Budget Adherence</span>
                        <span className="text-sm font-medium text-orange-300">94%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-orange-900/30">
                        <div className="h-2 w-[94%] rounded-full bg-gradient-to-r from-orange-400 to-amber-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-amber-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-orange-900/80 to-amber-900/80 p-8 text-center backdrop-blur-md sm:p-12">
            <h2 className="text-3xl font-bold text-white">Start Your Construction Project</h2>
            <p className="mx-auto mt-4 max-w-xl text-orange-100/80">
              Experience quality construction services with Udaya Shiva's professional team.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://www.udayashiva.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-orange-500 px-8 py-3 font-medium text-white transition-all hover:bg-orange-600"
              >
                Visit Website <FaArrowRight className="ml-2" />
              </a>
              <a
                href="https://www.udayashiva.in/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-amber-500 px-8 py-3 font-medium text-white transition-all hover:bg-amber-600"
              >
                Contact Us <FaArrowRight className="ml-2" />
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button onClick={handleShare} className="flex items-center justify-center rounded-full bg-orange-900/30 p-3 text-white transition-all hover:bg-orange-900/50">
                <FaShare className="h-5 w-5" />
              </button>
              <div className="h-8 w-px bg-orange-700/30"></div>
              <div className="flex -space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-xs font-medium text-white">
                  US
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-xs font-medium text-white">
                  CS
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/20 text-xs font-medium text-white">
                  RC
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-900/50 text-xs font-medium text-white">
                  +80
                </div>
              </div>
              <span className="text-sm text-orange-200">400+ Shared</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}