"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"




import { motion, AnimatePresence } from "framer-motion"
import { FaPlay, FaPause, FaArrowRight, FaArrowLeft, FaHeart, FaShare } from "react-icons/fa"

export default function SuperwomenShowcase() {
  
  const shareUrl = "/showcase/superwomen.live"
  const shareTitle = "SuperWomen.live - Empowering Women in Maharashtra"
  const shareText = "Check out SuperWomen.live, a platform dedicated to empowering women across Maharashtra."


  const [activeTab, setActiveTab] = useState("overview")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);


  // Gallery images with metadata
  const galleryImages = [
    {
      src: "https://th.bing.com/th/id/R.ac54341504588eedd651ff867f1ef949?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0",
      alt: "SuperWomen Homepage",
      title: "Empowering Homepage",
      description: "The main landing page featuring latest news and featured stories of exceptional women.",
      category: "UI Design",
    },
    {
      src: "https://th.bing.com/th/id/OIP.Mvcr0QDsGXOx29cSBfXd6AHaE7?rs=1&pid=ImgDetMain",
      alt: "News Section",
      title: "Regional News Hub",
      description: "Comprehensive news coverage from Maharashtra with focus on women's achievements.",
      category: "Content",
    },
    {
      src: "https://i.pinimg.com/originals/49/73/5b/49735b38c27ca67787e201a8f4b0fd6d.jpg",
      alt: "Health Section",
      title: "Women's Health Portal",
      description: "Resources and articles dedicated to women's health and wellness.",
      category: "Features",
    },
    {
      src: "https://img.freepik.com/premium-photo/iceland-waterfalls-sun-rising-from-back_1095879-428.jpg",
      alt: "Agriculture Section",
      title: "Agricultural Insights",
      description: "Highlighting women's contributions to agriculture and sustainable farming practices.",
      category: "Content",
    },
    {
      src: "https://th.bing.com/th/id/R.71fc55a0f2becd702cc4a893980dea57?rik=XOUhz40Jc9OcYg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images-6.jpg&ehk=BQoi8QCZQtCfHkXWT0TIAxv1vTtTO1rY7ctKskX6Xfs%3d&risl=&pid=ImgRaw&r=0",
      alt: "Literature Section",
      title: "Literary Showcase",
      description: "Platform for women authors and poets to share their literary works.",
      category: "Features",
    },
    {
      src: "https://th.bing.com/th/id/OIP.SQQFm-oK6Lu_eMaiGGRI1AHaE8?rs=1&pid=ImgDetMain",
      alt: "Mobile View",
      title: "Responsive Design",
      description: "Optimized mobile experience for on-the-go access to empowering content.",
      category: "UI Design",
    },
  ]

  // Features list
  const features = [
    {
      icon: "✨",
      title: "Empowerment Stories",
      description: "Inspiring narratives of women breaking barriers and achieving excellence",
    },
    {
      icon: "📰",
      title: "Regional News",
      description: "Latest updates from Maharashtra focused on women's achievements",
    },
    {
      icon: "🌿",
      title: "Health & Wellness",
      description: "Resources and articles dedicated to women's health and wellbeing",
    },
    {
      icon: "🌾",
      title: "Agricultural Insights",
      description: "Highlighting women's contributions to farming and sustainable practices",
    },
    {
      icon: "📚",
      title: "Literary Platform",
      description: "Showcase for women authors and poets to share their creative works",
    },
    {
      icon: "🎯",
      title: "Social Awareness",
      description: "Campaigns and initiatives promoting gender equality and social justice",
    },
  ]

  // Stats
  const stats = [
    { label: "Monthly Visitors", value: "50K+" },
    { label: "Articles Published", value: "1,200+" },
    { label: "Featured Women", value: "350+" },
    { label: "Regional Reach", value: "All Maharashtra" },
  ]

  // Handle video play/pause
  const toggleVideo = () => {
    if (playerRef.current) {
      try {
        // Ensure `contentWindow` is not null
        if (playerRef.current.contentWindow) {
          const message = JSON.stringify({
            event: "command",
            func: isVideoPlaying ? "pauseVideo" : "playVideo",
          });
  
          playerRef.current.contentWindow.postMessage(message, "*");
        }
        setIsVideoPlaying(!isVideoPlaying);
      } catch (error) {
        console.error("Error controlling YouTube player:", error);
      }
    }
  };
  

  // Add this effect to listen for YouTube player state changes
  useEffect(() => {
    // Function to handle messages from the YouTube iframe
    const handleMessage = (event : MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        // YouTube API sends events with info property
        if (data.info && data.info.playerState !== undefined) {
          // PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
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
        console.log("Page shared successfully")
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
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
    <>


      <div className="min-h-screen text-black dark:text-white">
        {/* Hero Section with Video */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 mt-10">
            

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative mx-auto mt-12 aspect-video max-w-7xl overflow-hidden rounded-2xl border border-purple-500/20 shadow-2xl"
            >
              <div className="group relative h-full w-full">
                <iframe
                  ref={playerRef}
                  src="https://www.youtube.com/embed/BdSn001dTas?si=2gmS4eY6eKXqbce9&enablejsapi=1&controls=0&origin=http://localhost:3000"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="SuperWomen.live Showcase"
                  className="h-full w-full"
                />

                {/* Video overlay with play button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    onClick={toggleVideo}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff0099] text-white transition-transform duration-300 hover:scale-110"
                  >
                    {isVideoPlaying ? <FaPause className="h-6 w-6" /> : <FaPlay className="h-6 w-6 pl-1" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>



        {/* Navigation Tabs */}
        <section className="mx-auto max-w-7xl sticky top-16 z-10 border-b border-purple-900/50 bg-[#1a0033]/80 backdrop-blur-md">
          <div className=" px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 scrollbar-hide">
              {["overview", "gallery", "features", "stats"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`mr-6 whitespace-nowrap px-3 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab
                    ? "border-b-2 border-[#ff0099] text-[#ff66cc]"
                    : "text-purple-200/70 hover:text-purple-100"
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
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#ff0099] opacity-10 blur-3xl"></div>
            <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-[#9900ff] opacity-10 blur-3xl"></div>
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
                  <h2 className="text-3xl font-bold text-[#ff66cc]">About the Platform</h2>
                  <p className="mt-4  dark:text-purple-100/80">
                    SuperWomen.live is a groundbreaking Marathi digital platform dedicated to women's empowerment and
                    social awareness in Maharashtra. This comprehensive portal features regional updates, in-depth
                    articles, interviews, and resources specifically designed to inspire and inform its audience.
                  </p>
                  <p className="mt-4 dark:text-purple-100/80">
                    The platform showcases stories of women excelling in various fields, providing role models for the
                    community and creating a space where achievements are celebrated and challenges are addressed.
                  </p>
                </div>


                <div>
                  <h3 className="text-xl font-semibold text-[#ff66cc]">Project Details</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-purple-900/20 p-4">
                      <span className="text-sm dark:text-purple-300">Platform</span>
                      <p className="font-medium">WordPress</p>
                    </div>
                    <div className="rounded-lg bg-purple-900/20 p-4">
                      <span className="text-sm dark:text-purple-300">Languages</span>
                      <p className="font-medium">Marathi, English</p>
                    </div>
                    <div className="rounded-lg bg-purple-900/20 p-4">
                      <span className="text-sm dark:text-purple-300">Target Audience</span>
                      <p className="font-medium">Women in Maharashtra</p>
                    </div>
                    <div className="rounded-lg bg-purple-900/20 p-4">
                      <span className="text-sm dark:text-purple-300">Launch Date</span>
                      <p className="font-medium">2022</p>
                    </div>
                    <div className="rounded-lg bg-purple-900/20 p-4">
                      <span className="text-sm dark:text-purple-300">Categories</span>
                      <p className="font-medium">News, Health, Agriculture</p>
                    </div>
                    <div className="rounded-lg bg-purple-900/20 p-4">
                      <span className="text-sm dark:text-purple-300">Developer</span>
                      <p className="font-medium">KodeKalp</p>
                    </div>
                  </div>
                </div>


                <div>
                  <h3 className="text-xl font-semibold text-[#ff66cc]">Key Objectives</h3>
                  <ul className="mt-4 space-y-3 dark:text-purple-100/80">
                    <li className="flex items-start">
                      <span className="mr-2 text-[#ff0099]">•</span>
                      Highlight achievements of women across various sectors
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#ff0099]">•</span>
                      Provide a platform for sharing stories and experiences
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#ff0099]">•</span>
                      Deliver regional news with a focus on women's issues
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#ff0099]">•</span>
                      Create awareness about health, agriculture, and literature
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#ff0099]">•</span>
                      Build a supportive community for women in Maharashtra
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative  max-w-full rounded-2xl border border-purple-500/20">
                <div className="inline-block h-[800px] overflow-y-auto">
                  <Image
                    src="/images/ShowCase/superwomen/superwomen-website-project-done-by-kodekalp-gondia.png"
                    alt="SuperWomen.live Platform"
                    width={1200}  // Adjust the width to fit your needs for scrolling
                    height={800}  // Set the height to 800px for cropping
                    className="object-cover"
                  />
                </div>
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033] to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-4 flex items-center space-x-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-[#ff0099]"></span>
                    <span className="text-sm font-medium text-purple-200">Live Website</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">SuperWomen.live</h3>
                  <p className="mt-2 text-purple-200">Visit the live platform to explore all features and content.</p>
                  <a
                    href="https://superwomen.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center rounded-full bg-[#ff0099] px-6 py-2 text-sm font-medium text-white transition-all hover:bg-[#ff0099]/90"
                  >
                    Visit Website <FaArrowRight className="ml-2" />
                  </a>
                </div> */}
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
                <h2 className="text-3xl font-bold text-[#ff66cc]">Visual Showcase</h2>
                <p className="mx-auto mt-4 max-w-2xl dark:text-purple-100/80">
                  Explore the visual elements and key sections of the SuperWomen.live platform through this interactive
                  gallery.
                </p>
              </div>

              {/* Main Gallery Carousel */}
              <div
                className="relative mx-auto max-w-7xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-purple-500/20 shadow-2xl">
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
                        src={galleryImages[currentGalleryIndex].src || "/placeholder.svg"}
                        alt={galleryImages[currentGalleryIndex].alt}
                        fill
                        className="object-cover"
                      />

                      {/* Image overlay with info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <span className="inline-block rounded-full bg-[#ff0099]/80 px-3 py-1 text-xs font-medium">
                            {galleryImages[currentGalleryIndex].category}
                          </span>
                          <h3 className="mt-2 text-2xl font-bold">{galleryImages[currentGalleryIndex].title}</h3>
                          <p className="mt-2 max-w-lg text-purple-100/90">
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
                        className={`h-2 w-2 rounded-full transition-all ${currentGalleryIndex === index ? "w-6 bg-[#ff0099]" : "bg-white/50"
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
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${currentGalleryIndex === index ? "border-[#ff0099]" : "border-transparent"
                      }`}
                  >
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                    <div
                      className={`absolute inset-0 bg-black/30 transition-opacity ${currentGalleryIndex === index ? "opacity-0" : "opacity-50"
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
                <h2 className="text-3xl font-bold text-[#ff66cc]">Platform Features</h2>
                <p className="mx-auto mt-4 max-w-2xl dark:text-purple-100/80">
                  SuperWomen.live offers a comprehensive set of features designed to empower, inform, and connect women
                  across Maharashtra.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ff0099]/10"
                  >
                    <div className="absolute -right-6 -top-6 h-24 w-24  rounded-full bg-[#ff0099]/10 blur-2xl transition-all group-hover:bg-[#ff0099]/20"></div>

                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff0099] dark:bg-[#ff0099]/20 text-xl">
                      {feature.icon}
                    </div>

                    <h3 className="mb-2 text-xl font-semibold dark:text-white">{feature.title}</h3>
                    <p className="dark:text-purple-100/80 ">{feature.description}</p>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#ff0099] to-[#9900ff] transition-all duration-300 group-hover:w-full"></div>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-[#ff0099]/20 to-[#9900ff]/20 p-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white">Technical Implementation</h3>
                    <p className="mt-4 dark:text-purple-100/80">
                      SuperWomen.live is built on WordPress with custom themes and plugins to create a seamless user
                      experience. The platform features responsive design, optimized performance, and multilingual support
                      to reach a wider audience.
                    </p>
                    <ul className="mt-6 space-y-2 dark:text-purple-100/80">
                      <li className="flex items-center">
                        <span className="mr-2 text-[#ff0099]">✓</span>
                        Responsive design for all devices
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-[#ff0099]">✓</span>
                        Optimized for Marathi language support
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-[#ff0099]">✓</span>
                        Custom content management system
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-[#ff0099]">✓</span>
                        Social media integration
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-[#ff0099]">✓</span>
                        SEO optimized for regional content
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative h-64 w-64">
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#ff0099]/20 animate-pulse">
                        <div className="h-48 w-48 rounded-full bg-[#9900ff]/20 animate-pulse delay-300">
                          <div className="flex h-full items-center justify-center">
                            <span className="text-6xl">✨</span>
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
                <h2 className="text-3xl font-bold text-[#ff66cc]">Platform Impact</h2>
                <p className="mx-auto mt-4 max-w-2xl dark:text-purple-100/80">
                  SuperWomen.live has made a significant impact in empowering women across Maharashtra through digital
                  content and community building.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/20 p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ff0099]/10"                     >
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full dark:bg-[#ff0099]/10 blur-2xl transition-all dark:group-hover:bg-[#ff0099]/20"></div>

                    <h3 className="mb-2 text-3xl font-bold dark:text-white">{stat.value}</h3>
                    <p className="dark:text-purple-100/80">{stat.label}</p>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#ff0099] to-[#9900ff] transition-all duration-300 group-hover:w-full"></div>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-[#ff0099]/20 to-[#9900ff]/20 p-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white">Success Stories</h3>
                    <p className="mt-4 dark:text-purple-100/80">
                      The platform has successfully highlighted numerous women achievers from various fields, creating
                      role models for the community. From farmers to entrepreneurs, artists to scientists, SuperWomen.live
                      has documented inspiring journeys that motivate others.
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="rounded-lg bg-purple-900/30 p-4">
                        <p className="italic text-purple-100/90">
                          "SuperWomen.live gave me a platform to share my agricultural innovations, connecting me with
                          other women farmers across Maharashtra."
                        </p>
                        <p className="mt-2 text-right text-sm font-medium dark:text-[#ff66cc]">— Sunita Patil, Farmer</p>
                      </div>
                      <div className="rounded-lg bg-purple-900/30 p-4">
                        <p className="italic text-purple-100/90">
                          "Being featured on this platform helped me reach a wider audience for my literary works and
                          connect with other Marathi authors."
                        </p>
                        <p className="mt-2 text-right text-sm font-medium dark:text-[#ff66cc]">— Priya Joshi, Author</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold dark:text-white">Growth Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-purple-200">Audience Growth</span>
                          <span className="text-sm font-medium text-[#ff66cc]">85%</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-purple-900/30">
                          <div className="h-2 w-[85%] rounded-full bg-gradient-to-r from-[#ff0099] to-[#9900ff]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-purple-200">Content Engagement</span>
                          <span className="text-sm font-medium text-[#ff66cc]">72%</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-purple-900/30">
                          <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-[#ff0099] to-[#9900ff]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-purple-200">Social Media Reach</span>
                          <span className="text-sm font-medium text-[#ff66cc]">68%</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-purple-900/30">
                          <div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-[#ff0099] to-[#9900ff]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-purple-200">Regional Coverage</span>
                          <span className="text-sm font-medium text-[#ff66cc]">90%</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-purple-900/30">
                          <div className="h-2 w-[90%] rounded-full bg-gradient-to-r from-[#ff0099] to-[#9900ff]"></div>
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
         

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-[#1a0033]/80 to-[#2d0033]/80 p-8 text-center backdrop-blur-md sm:p-12">
              <h2 className="text-3xl font-bold text-white">Experience SuperWomen.live</h2>
              <p className="mx-auto mt-4 max-w-xl text-purple-100/80">
                Visit the platform to explore inspiring stories, regional news, and resources dedicated to empowering
                women across Maharashtra.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://superwomen.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-[#ff0099] px-8 py-3 font-medium text-white transition-all hover:bg-[#ff0099]/90"
                >
                  Visit Website <FaArrowRight className="ml-2" />
                </a>
                <button onClick={handleShare} className="inline-flex items-center rounded-full bg-purple-900/50 px-8 py-3 font-medium text-white transition-all hover:bg-purple-900/70">
                  <FaShare className="mr-2" /> Share
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-4">
                <button onClick={handleShare} className="flex items-center justify-center rounded-full bg-purple-900/30 p-3 text-white transition-all hover:bg-purple-900/50">
                  <FaShare className="h-5 w-5" />
                </button>
                <div className="h-8 w-px bg-purple-700/30"></div>
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff0099]/20 text-xs font-medium text-white">
                    SP
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9900ff]/20 text-xs font-medium text-white">
                    RK
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff66cc]/20 text-xs font-medium text-white">
                    AJ
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-900/50 text-xs font-medium text-white">
                    +42
                  </div>
                </div>
                <span className="text-sm text-purple-200">450+ Shared</span>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  )
}

