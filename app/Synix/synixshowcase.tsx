"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaPlay, FaPause, FaArrowRight, FaArrowLeft, FaHeart, FaShare } from "react-icons/fa"

export default function SynixShowcase() {
  const shareUrl = "https://synix.in/"
  const shareTitle = "Synix - Innovative IT Solutions"
  const shareText = "Transform your business with Synix's cutting-edge IT services and digital solutions."

  const [activeTab, setActiveTab] = useState("overview")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const playerRef = useRef<HTMLIFrameElement | null>(null)

  // Gallery images with metadata
  const galleryImages = [
    {
      src: "/images/ShowCase/synix/homepage.jpg",
      alt: "Synix Homepage",
      title: "Modern IT Solutions Portal",
      description: "The professional interface showcasing our IT services and expertise.",
      category: "UI Design",
    },
    {
      src: "/images/ShowCase/synix/services.jpg",
      alt: "IT Services",
      title: "Comprehensive IT Solutions",
      description: "Detailed overview of our software development and IT services.",
      category: "Services",
    },
    {
      src: "/images/ShowCase/synix/team.jpg",
      alt: "Expert Team",
      title: "Technical Experts",
      description: "Meet our team of experienced IT professionals and developers.",
      category: "Team",
    },
    {
      src: "/images/ShowCase/synix/projects.jpg",
      alt: "Projects",
      title: "Our Successful Projects",
      description: "Showcase of our innovative IT solutions and implementations.",
      category: "Projects",
    },
    {
      src: "/images/ShowCase/synix/contact.jpg",
      alt: "Contact Section",
      title: "Client Engagement",
      description: "Easy communication channels for our IT services.",
      category: "Features",
    },
    {
      src: "/images/ShowCase/synix/mobile-view.jpg",
      alt: "Mobile Responsive",
      title: "Mobile-Friendly Design",
      description: "Optimized experience for clients on smartphones.",
      category: "UI Design",
    },
  ]

  // Features list
  const features = [
    {
      icon: "💻",
      title: "Software Development",
      description: "Custom software solutions tailored to your needs",
    },
    {
      icon: "🌐",
      title: "Web Development",
      description: "Modern, responsive websites and web applications",
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      description: "iOS and Android applications for your business",
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and services",
    },
    {
      icon: "🔒",
      title: "Cybersecurity",
      description: "Comprehensive protection for your digital assets",
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Actionable insights from your business data",
    },
  ]

  // Stats
  const stats = [
    { label: "Years of Experience", value: "8+" },
    { label: "Satisfied Clients", value: "150+" },
    { label: "Completed Projects", value: "300+" },
    { label: "Technical Experts", value: "20+" },
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
            className="relative mx-auto mt-12 aspect-video max-w-7xl overflow-hidden rounded-2xl border border-blue-500/20 shadow-2xl"
          >
            <div className="group relative h-full w-full">
              <iframe
                ref={playerRef}
                src="https://www.youtube.com/embed/it-solutions-video-id?enablejsapi=1&controls=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Synix IT Solutions Overview"
                className="h-full w-full"
              />

              {/* Video overlay with play button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={toggleVideo}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-300 hover:scale-110"
                >
                  {isVideoPlaying ? <FaPause className="h-6 w-6" /> : <FaPlay className="h-6 w-6 pl-1" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="mx-auto max-w-7xl sticky top-16 z-10 border-b border-blue-900/50 bg-[#003366]/80 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            {["overview", "gallery", "features", "stats"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mr-6 whitespace-nowrap px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-blue-400 text-blue-300"
                    : "text-blue-200/70 hover:text-blue-100"
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
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-teal-500 opacity-10 blur-3xl"></div>
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
                <h2 className="text-3xl font-bold text-blue-500">About Synix</h2>
                <p className="mt-4 dark:text-blue-100/80">
                  Synix provides innovative IT solutions with a client-focused approach. 
                  We offer cutting-edge technology services using modern frameworks and methodologies.
                </p>
                <p className="mt-4 dark:text-blue-100/80">
                  With over 8 years of experience, our team is committed to delivering exceptional 
                  IT services including software development, web solutions, and digital transformation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-400">Company Details</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-blue-900/20 p-4">
                    <span className="text-sm dark:text-blue-300">Specializations</span>
                    <p className="font-medium">Software & Web Development</p>
                  </div>
                  <div className="rounded-lg bg-blue-900/20 p-4">
                    <span className="text-sm dark:text-blue-300">Technologies</span>
                    <p className="font-medium">Modern Frameworks & Tools</p>
                  </div>
                  <div className="rounded-lg bg-blue-900/20 p-4">
                    <span className="text-sm dark:text-blue-300">Location</span>
                    <p className="font-medium">Global Reach</p>
                  </div>
                  <div className="rounded-lg bg-blue-900/20 p-4">
                    <span className="text-sm dark:text-blue-300">Established</span>
                    <p className="font-medium">2015</p>
                  </div>
                  <div className="rounded-lg bg-blue-900/20 p-4">
                    <span className="text-sm dark:text-blue-300">Team</span>
                    <p className="font-medium">IT Professionals</p>
                  </div>
                  <div className="rounded-lg bg-blue-900/20 p-4">
                    <span className="text-sm dark:text-blue-300">Website</span>
                    <p className="font-medium">WordPress</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-400">Our Mission</h3>
                <ul className="mt-4 space-y-3 dark:text-blue-100/80">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Deliver innovative digital solutions
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Empower businesses through technology
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Drive digital transformation
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Use cutting-edge development tools
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Maintain highest quality standards
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative max-w-full rounded-2xl border border-blue-500/20">
              <div className="inline-block h-[800px] overflow-y-auto">
                <Image
                  src="/images/ShowCase/synix/full-website-screenshot.jpg"
                  alt="Synix Website"
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
              <h2 className="text-3xl font-bold text-blue-500">IT Solutions Showcase</h2>
              <p className="mx-auto mt-4 max-w-2xl dark:text-blue-100/80">
                Explore our IT services, technical team, and successful projects through these images.
              </p>
            </div>

            {/* Main Gallery Carousel */}
            <div
              className="relative mx-auto max-w-7xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-blue-500/20 shadow-2xl">
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
                        <span className="inline-block rounded-full bg-blue-500/80 px-3 py-1 text-xs font-medium">
                          {galleryImages[currentGalleryIndex].category}
                        </span>
                        <h3 className="mt-2 text-2xl font-bold text-white">{galleryImages[currentGalleryIndex].title}</h3>
                        <p className="mt-2 max-w-lg text-blue-100/90">
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
                        currentGalleryIndex === index ? "w-6 bg-blue-400" : "bg-white/50"
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
                    currentGalleryIndex === index ? "border-blue-400" : "border-transparent"
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
              <h2 className="text-3xl font-bold text-blue-500">IT Services</h2>
              <p className="mx-auto mt-4 max-w-2xl dark:text-blue-100/80">
                We offer comprehensive IT solutions using modern technologies and agile methodologies.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20"></div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl">
                    {feature.icon}
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-blue-100/80">{feature.description}</p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-white">Development Process</h3>
                  <p className="mt-4 text-blue-100/80">
                    Our software development methodology ensures quality and efficiency:
                  </p>
                  <ul className="mt-6 space-y-2 text-blue-100/80">
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-400">✓</span>
                      Requirement analysis and planning
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-400">✓</span>
                      Agile development methodology
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-400">✓</span>
                      Continuous integration and testing
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-400">✓</span>
                      Quality assurance and deployment
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-400">✓</span>
                      Ongoing maintenance and support
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-64 w-64">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500/20 animate-pulse">
                      <div className="h-48 w-48 rounded-full bg-teal-500/20 animate-pulse delay-300">
                        <div className="flex h-full items-center justify-center">
                          <span className="text-6xl">💻</span>
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
              <h2 className="text-3xl font-bold text-blue-500">Our Achievements</h2>
              <p className="mx-auto mt-4 max-w-2xl text-blue-100/80">
                Synix has been delivering innovative IT solutions for businesses since 2015.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20"></div>

                  <h3 className="mb-2 text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-blue-100/80">{stat.label}</p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-white">Client Testimonials</h3>
                  <p className="mt-4 text-blue-100/80">
                    Our clients' success stories demonstrate our commitment to excellence:
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-lg bg-blue-900/30 p-4">
                      <p className="italic text-blue-100/90">
                        "Synix developed a custom CRM that transformed our sales process, increasing efficiency by 40%."
                      </p>
                      <p className="mt-2 text-right text-sm font-medium text-blue-300">— David Wilson, Sales Director</p>
                    </div>
                    <div className="rounded-lg bg-blue-900/30 p-4">
                      <p className="italic text-blue-100/90">
                        "The mobile app developed by Synix helped us engage customers and increased our revenue by 25%."
                      </p>
                      <p className="mt-2 text-right text-sm font-medium text-blue-300">— Sarah Johnson, Marketing Head</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Service Quality</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Client Satisfaction</span>
                        <span className="text-sm font-medium text-blue-300">97%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-blue-900/30">
                        <div className="h-2 w-[97%] rounded-full bg-gradient-to-r from-blue-400 to-teal-400"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Project Success Rate</span>
                        <span className="text-sm font-medium text-blue-300">94%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-blue-900/30">
                        <div className="h-2 w-[94%] rounded-full bg-gradient-to-r from-blue-400 to-teal-400"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">On-Time Delivery</span>
                        <span className="text-sm font-medium text-blue-300">92%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-blue-900/30">
                        <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-blue-400 to-teal-400"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Client Retention</span>
                        <span className="text-sm font-medium text-blue-300">85%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-blue-900/30">
                        <div className="h-2 w-[85%] rounded-full bg-gradient-to-r from-blue-400 to-teal-400"></div>
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
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-teal-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-blue-900/80 to-teal-900/80 p-8 text-center backdrop-blur-md sm:p-12">
            <h2 className="text-3xl font-bold text-white">Transform Your Business with Technology</h2>
            <p className="mx-auto mt-4 max-w-xl text-blue-100/80">
              Experience innovative IT solutions with Synix's expert team of developers.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://synix.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-blue-500 px-8 py-3 font-medium text-white transition-all hover:bg-blue-600"
              >
                Visit Website <FaArrowRight className="ml-2" />
              </a>
              <a
                href="https://synix.in/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-teal-500 px-8 py-3 font-medium text-white transition-all hover:bg-teal-600"
              >
                Contact Us <FaArrowRight className="ml-2" />
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button onClick={handleShare} className="flex items-center justify-center rounded-full bg-blue-900/30 p-3 text-white transition-all hover:bg-blue-900/50">
                <FaShare className="h-5 w-5" />
              </button>
              <div className="h-8 w-px bg-blue-700/30"></div>
              <div className="flex -space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-medium text-white">
                  SY
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-xs font-medium text-white">
                  IT
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400/20 text-xs font-medium text-white">
                  DEV
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900/50 text-xs font-medium text-white">
                  +80
                </div>
              </div>
              <span className="text-sm text-blue-200">300+ Shared</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}