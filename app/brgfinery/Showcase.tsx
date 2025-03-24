"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaPlay, FaPause, FaArrowRight, FaArrowLeft, FaHeart, FaShare } from "react-icons/fa"

export default function BrgFineryShowcase() {
  
  const shareUrl = "https://brgfinery.com/"
  const shareTitle = "BRG Finery - Premium Ethnic Wear & Fashion"
  const shareText = "Discover exquisite ethnic fashion collections at BRG Finery - Traditional wear with modern elegance."

  const [activeTab, setActiveTab] = useState("overview")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);

  // Gallery images with metadata
  const galleryImages = [
    {
      src: "/images/ShowCase/brgfinery/homepage.jpg",
      alt: "BRG Finery Homepage",
      title: "Elegant Fashion Portal",
      description: "The luxurious interface showcasing BRG Finery's premium ethnic collections.",
      category: "UI Design",
    },
    {
      src: "/images/ShowCase/brgfinery/collections.jpg",
      alt: "Fashion Collections",
      title: "Exquisite Collections",
      description: "Curated selection of traditional and contemporary ethnic wear.",
      category: "Products",
    },
    {
      src: "/images/ShowCase/brgfinery/product-detail.jpg",
      alt: "Product Details",
      title: "Detailed Product Views",
      description: "High-quality displays of fabric, craftsmanship and design details.",
      category: "E-Commerce",
    },
    {
      src: "/images/ShowCase/brgfinery/mens-section.jpg",
      alt: "Men's Collection",
      title: "Men's Ethnic Wear",
      description: "Premium sherwanis, kurtas and traditional menswear.",
      category: "Collections",
    },
    {
      src: "/images/ShowCase/brgfinery/womens-section.jpg",
      alt: "Women's Collection",
      title: "Women's Ethnic Fashion",
      description: "Sarees, lehengas and contemporary ethnic outfits.",
      category: "Collections",
    },
    {
      src: "/images/ShowCase/brgfinery/mobile-view.jpg",
      alt: "Mobile Shopping",
      title: "Mobile-Optimized",
      description: "Seamless shopping experience on all devices.",
      category: "UI Design",
    },
  ]

  // Features list
  const features = [
    {
      icon: "👘",
      title: "Premium Fabrics",
      description: "Finest quality silks, cottons and traditional textiles",
    },
    {
      icon: "🧵",
      title: "Artisan Craftsmanship",
      description: "Handcrafted details and traditional techniques",
    },
    {
      icon: "👗",
      title: "Diverse Collections",
      description: "Wide range of ethnic wear for all occasions",
    },
    {
      icon: "📦",
      title: "Nationwide Delivery",
      description: "Reliable shipping across India",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Multiple payment options with SSL security",
    },
    {
      icon: "📱",
      title: "Easy Returns",
      description: "Hassle-free return policy",
    },
  ]

  // Stats
  const stats = [
    { label: "Collections", value: "200+" },
    { label: "Happy Customers", value: "5,000+" },
    { label: "Cities Served", value: "50+" },
    { label: "Years in Fashion", value: "10+" },
  ]

  // Handle video play/pause
  const toggleVideo = () => {
    if (playerRef.current) {
      try {
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
    <div className="min-h-screen text-black dark:text-white bg-amber-50 dark:bg-gray-900">
      {/* Hero Section with Video */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mx-auto mt-12 aspect-video max-w-7xl overflow-hidden rounded-2xl border border-amber-500/20 shadow-2xl"
          >
            <div className="group relative h-full w-full">
              <iframe
                ref={playerRef}
                src="https://www.youtube.com/embed/fashion-video-id?enablejsapi=1&controls=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="BRG Finery Fashion Collection"
                className="h-full w-full"
              />

              {/* Video overlay with play button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={toggleVideo}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-600 text-white transition-transform duration-300 hover:scale-110"
                >
                  {isVideoPlaying ? <FaPause className="h-6 w-6" /> : <FaPlay className="h-6 w-6 pl-1" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="mx-auto max-w-7xl sticky top-16 z-10 border-b border-amber-900/50 bg-[#5c2c00]/80 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            {["overview", "gallery", "features", "stats"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mr-6 whitespace-nowrap px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-amber-400 text-amber-300"
                    : "text-amber-200/70 hover:text-amber-100"
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
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-amber-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-red-800 opacity-10 blur-3xl"></div>
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
                <h2 className="text-3xl font-bold text-amber-600">About BRG Finery</h2>
                <p className="mt-4 dark:text-amber-100/80">
                  BRG Finery is a premium ethnic wear brand offering exquisite traditional fashion with contemporary 
                  elegance. We specialize in handcrafted sarees, lehengas, sherwanis and fusion wear.
                </p>
                <p className="mt-4 dark:text-amber-100/80">
                  Our collections showcase India's rich textile heritage through modern designs, catering to fashion-conscious 
                  individuals who appreciate quality craftsmanship and unique styles.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-500">Brand Details</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-amber-900/20 p-4">
                    <span className="text-sm dark:text-amber-300">Product Range</span>
                    <p className="font-medium">Ethnic Wear & Accessories</p>
                  </div>
                  <div className="rounded-lg bg-amber-900/20 p-4">
                    <span className="text-sm dark:text-amber-300">Materials</span>
                    <p className="font-medium">Silk, Cotton, Banarasi, Chanderi</p>
                  </div>
                  <div className="rounded-lg bg-amber-900/20 p-4">
                    <span className="text-sm dark:text-amber-300">Location</span>
                    <p className="font-medium">Pan-India Presence</p>
                  </div>
                  <div className="rounded-lg bg-amber-900/20 p-4">
                    <span className="text-sm dark:text-amber-300">Established</span>
                    <p className="font-medium">2013</p>
                  </div>
                  <div className="rounded-lg bg-amber-900/20 p-4">
                    <span className="text-sm dark:text-amber-300">Craftsmanship</span>
                    <p className="font-medium">Handwoven & Hand-embroidered</p>
                  </div>
                  <div className="rounded-lg bg-amber-900/20 p-4">
                    <span className="text-sm dark:text-amber-300">Platform</span>
                    <p className="font-medium">Shopify E-Commerce</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-500">Our Philosophy</h3>
                <ul className="mt-4 space-y-3 dark:text-amber-100/80">
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    Preserve traditional textile arts through contemporary designs
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    Support artisan communities and sustainable practices
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    Offer exceptional quality with attention to detail
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    Create fashion that celebrates cultural heritage
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    Provide personalized styling consultations
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative max-w-full rounded-2xl border border-amber-500/20">
              <div className="inline-block h-[800px] overflow-y-auto">
                <Image
                  src="/images/ShowCase/brgfinery/full-website-screenshot.jpg"
                  alt="BRG Finery Website"
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
              <h2 className="text-3xl font-bold text-amber-600">Fashion Collections</h2>
              <p className="mx-auto mt-4 max-w-2xl dark:text-amber-100/80">
                Explore our premium ethnic wear collections through these curated images.
              </p>
            </div>

            {/* Main Gallery Carousel */}
            <div
              className="relative mx-auto max-w-7xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-amber-500/20 shadow-2xl">
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
                        <span className="inline-block rounded-full bg-amber-600/80 px-3 py-1 text-xs font-medium">
                          {galleryImages[currentGalleryIndex].category}
                        </span>
                        <h3 className="mt-2 text-2xl font-bold text-white">{galleryImages[currentGalleryIndex].title}</h3>
                        <p className="mt-2 max-w-lg text-amber-100/90">
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
                        currentGalleryIndex === index ? "w-6 bg-amber-400" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>



            {/* Thumbnails Section (Part of Gallery) */}
<div className="grid grid-cols-3 gap-4 sm:grid-cols-6 mt-8">
  {galleryImages.map((image, index) => (
    <button
      key={index}
      onClick={() => setCurrentGalleryIndex(index)}
      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 ${
        currentGalleryIndex === index 
          ? "border-amber-600 scale-105 shadow-lg shadow-amber-500/20" 
          : "border-transparent hover:border-amber-400/50"
      }`}
    >
      <Image 
        src={image.src} 
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity ${
        currentGalleryIndex === index ? "opacity-0" : "opacity-70"
      }`}></div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40 text-center">
        <span className="text-xs font-medium text-white truncate">
          {image.category}
        </span>
      </div>
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
      <h2 className="text-3xl font-bold text-amber-600">Why Choose BRG Finery</h2>
      <p className="mx-auto mt-4 max-w-2xl text-amber-700/80 dark:text-amber-100/80">
        Premium features that make us the preferred choice for ethnic fashion
      </p>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-50/80 to-amber-100/60 dark:from-amber-900/30 dark:to-amber-800/20 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20"></div>
          
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-xl">
            {feature.icon}
          </div>
          
          <h3 className="mb-2 text-xl font-semibold text-amber-800 dark:text-amber-100">{feature.title}</h3>
          <p className="text-amber-600/90 dark:text-amber-200/80">{feature.description}</p>
          
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-300 group-hover:w-full"></div>
        </motion.div>
      ))}
    </div>

    <div className="rounded-2xl bg-gradient-to-r from-amber-600/20 to-red-700/20 p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-100">Shopping Experience</h3>
          <p className="mt-4 text-amber-700/90 dark:text-amber-200/80">
            Our e-commerce platform is designed for seamless ethnic fashion shopping:
          </p>
          <ul className="mt-6 space-y-2 text-amber-700/90 dark:text-amber-200/80">
            <li className="flex items-center">
              <span className="mr-2 text-amber-600">✓</span>
              High-resolution product images with zoom functionality
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-amber-600">✓</span>
              Detailed fabric and care information for each product
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-amber-600">✓</span>
              Virtual try-on features for select products
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-amber-600">✓</span>
              Size guide with measurement charts
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-amber-600">✓</span>
              Personalized styling recommendations
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-amber-500/20 animate-pulse">
              <div className="h-48 w-48 rounded-full bg-red-600/20 animate-pulse delay-300">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl">👗</span>
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
      <h2 className="text-3xl font-bold text-amber-600">BRG Finery in Numbers</h2>
      <p className="mx-auto mt-4 max-w-2xl text-amber-700/80 dark:text-amber-100/80">
        Our journey in redefining ethnic fashion across India
      </p>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-50/80 to-amber-100/80 dark:from-amber-900/30 dark:to-amber-800/20 p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20"></div>
          <h3 className="mb-2 text-3xl font-bold text-amber-800 dark:text-amber-100">{stat.value}</h3>
          <p className="text-amber-600 dark:text-amber-200/80">{stat.label}</p>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-300 group-hover:w-full"></div>
        </motion.div>
      ))}
    </div>

    <div className="rounded-2xl bg-gradient-to-r from-amber-600/20 to-red-700/20 p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-100">Customer Love</h3>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-amber-900/20 p-4">
              <p className="italic text-amber-100/90">
                "The Banarasi silk saree I purchased is absolutely stunning! The craftsmanship is exceptional and the fabric quality is top-notch."
              </p>
              <p className="mt-2 text-right text-sm font-medium text-amber-300">— Priya M., Mumbai</p>
            </div>
            <div className="rounded-lg bg-amber-900/20 p-4">
              <p className="italic text-amber-100/90">
                "My wedding lehenga arrived perfectly on time and exceeded all expectations. BRG Finery made me feel like royalty!"
              </p>
              <p className="mt-2 text-right text-sm font-medium text-amber-300">— Ananya R., Delhi</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-100">Quality Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700 dark:text-amber-200">Customer Satisfaction</span>
                <span className="text-sm font-medium text-amber-600 dark:text-amber-300">98%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-amber-200/80 dark:bg-amber-900/30">
                <div className="h-2 w-[98%] rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700 dark:text-amber-200">On-Time Delivery</span>
                <span className="text-sm font-medium text-amber-600 dark:text-amber-300">96%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-amber-200/80 dark:bg-amber-900/30">
                <div className="h-2 w-[96%] rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700 dark:text-amber-200">Repeat Customers</span>
                <span className="text-sm font-medium text-amber-600 dark:text-amber-300">65%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-amber-200/80 dark:bg-amber-900/30">
                <div className="h-2 w-[65%] rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)}
         {/* CTA Section */}
         <section className="relative overflow-hidden py-16">
        

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-amber-900/30 to-red-900/80 p-8 text-center backdrop-blur-md sm:p-12">
              <h2 className="text-3xl font-bold text-amber-50">Discover BRG Finery Collections</h2>
              <p className="mx-auto mt-4 max-w-xl text-amber-100/80">
                Explore our exquisite ethnic wear collections and experience the perfect blend of tradition and contemporary fashion.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://brgfinery.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-amber-600 px-8 py-3 font-medium text-white transition-all hover:bg-amber-700"
                >
                  Shop Now <FaArrowRight className="ml-2" />
                </a>
                <a
                  href="https://brgfinery.com/collections/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-red-800/90 px-8 py-3 font-medium text-white transition-all hover:bg-red-800"
                >
                  View Collections <FaArrowRight className="ml-2" />
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-4">
                <button onClick={handleShare} className="flex items-center justify-center rounded-full bg-amber-900/30 p-3 text-amber-100 transition-all hover:bg-amber-900/50">
                  <FaShare className="h-5 w-5" />
                </button>
                <div className="h-8 w-px bg-amber-700/30"></div>
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600/20 text-xs font-medium text-white">
                    BR
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-800/20 text-xs font-medium text-white">
                    GF
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-xs font-medium text-white">
                    DS
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-900/50 text-xs font-medium text-white">
                    +120
                  </div>
                </div>
                <span className="text-sm text-amber-200">1,200+ Shared</span>
              </div>
            </div>
          </div>
        </section>
    </div>
</div>
  )
}