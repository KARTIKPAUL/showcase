import React from 'react'
// import Breadcrumb from '@/components/Common/Breadcrumb'
import { Metadata } from 'next';
import SuperwomenShowcase from './SuperwomenShowcase';

// About Metadata
export const metadata: Metadata = {
  title: "Super Women | Project Showcase | KodeKalp Global Technologies",
  description: "Learn about KodeKalp Global Technologies, our mission, values, and how we help businesses grow with innovative technology solutions.",
  keywords: "About KodeKalp, Technology solutions, KodeKalp mission, KodeKalp Global Technologies",
  openGraph: {
    title: "About Us - KodeKalp Global Technologies",
    description: "Discover the story of KodeKalp Global Technologies and how we empower businesses with cutting-edge technology services.",
    url: "https://www.kodekalp.com/about",
    siteName: "KodeKalp Global Technologies",
    type: "website",
    images: [{ url: "https://www.kodekalp.com/logo.png", alt: "KodeKalp Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kodekalp",
    title: "About Us - KodeKalp Global Technologies",
    description: "Get to know more about KodeKalp and our commitment to delivering quality tech solutions to businesses.",
    images: ["https://www.kodekalp.com/logo.png"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.kodekalp.com/about",
  },
  authors: [{ name: "KodeKalp Global Technologies" }],
};

const page = () => {

  return (
    <>
      {/* <Breadcrumb
        pageName="Super Women | Project Showcase"
        description="A Marathi digital platform dedicated to empowering women in Maharashtra by highlighting their achievements
                and promoting social awareness."
      /> */}
      <SuperwomenShowcase />
      {/* <Test/> */}
    </>
  )
}

export default page
