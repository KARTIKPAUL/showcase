import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost", 
      'www.kodekalp.com', 
      'randomuser.me', 
      'placehold.co', 
      'images.unsplash.com',
      "blog.yourprojectcode.com",
      "secure.gravatar.com",  
      "res.cloudinary.com",
      "images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com",
      "th.bing.com",
      "img.freepik.com",
      "i.pinimg.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
