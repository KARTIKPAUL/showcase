import React from "react";
import Head from "next/head";
import { ChevronRight } from "lucide-react";

const Description: React.FC = () => {
  const categories = [
    {
      title: "Super Woman",
      description:
        "Highlighting women's achievements and empowerment initiatives",
    },
    {
      title: "Maharashtra",
      description: "Covering political developments and state affairs",
    },
    {
      title: "Literature",
      description: "Exploring literary works and discussions",
    },
    { title: "News Videos", description: "Providing video news content" },
    { title: "Health", description: "Sharing health-related news and updates" },
    {
      title: "Agriculture",
      description: "Discussing farming and rural developments",
    },
    // {
    //   title: "Gondia",
    //   description: "Reporting local news from the Gondia district",
    // },
  ];

  return (
    <>
      <Head>
        <title>SuperWomen.live - Empowering Women</title>
        <meta
          name="description"
          content="A Marathi-language news website covering women empowerment, politics, health, agriculture, and more."
        />
      </Head>

      <div className="min-h-screen ">
        {/* Hero Section with Background Image */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-800 opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-800 opacity-80"></div>

          <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-white bg-opacity-20 px-4 py-1 backdrop-blur-sm">
              <span className="font-medium text-white">
                मराठी न्यूज़ पोर्टल
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-white">
              SuperWomen<span className="text-pink-300">.live</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white opacity-90">
              Empowering women through impactful news, stories, and information
              in Marathi
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="rounded-lg bg-pink-500 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-pink-600 hover:shadow-xl">
                Latest Stories
              </button>
              <button className="rounded-lg bg-white bg-opacity-20 px-6 py-3 font-medium text-white backdrop-blur-sm transition hover:bg-opacity-30">
                Watch Videos
              </button>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="h-12 w-full fill-current text-purple-50"
            >
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
            </svg>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-12">
          {/* Featured Categories Section */}
          <section className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-purple-800">
                Explore Categories
              </h2>
              <a
                href="#"
                className="flex items-center font-medium text-pink-600 hover:text-pink-700"
              >
                View All <ChevronRight size={18} className="ml-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="rounded-xl border-l-4 border-pink-500 bg-white p-6 shadow-md transition hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl font-semibold text-purple-800">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="mb-20 overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="md:flex">
              <div className="p-8 md:w-3/5">
                <h2 className="mb-6 text-3xl font-bold text-purple-800">
                  About <span className="text-pink-600">SuperWomen.live</span>
                </h2>
                <p className="mb-4 text-gray-600">
                  SuperWomen.live is your premier Marathi news portal focused on
                  women's empowerment, state affairs, health, agriculture, and
                  local developments. Our platform delivers the latest breaking
                  news and videos directly from various industries.
                </p>
                <p className="mb-6 text-gray-600">
                  Designed and developed by KodeKalp Global Technologies Private
                  Limited, they are committed to providing accurate, timely, and
                  impactful content that makes a difference in the lives of
                  women across Maharashtra.
                </p>

                
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 p-8 md:w-2/5">
                <div className="text-center">
                  <div className="mb-4 inline-block rounded-full bg-white p-2">
                    <img
                      src="/api/placeholder/80/80"
                      alt="Testimonial"
                      className="h-16 w-16 rounded-full"
                    />
                  </div>
                  <blockquote className="mb-4 italic text-white">
                    "SuperWomen.live has been instrumental in highlighting the
                    stories of women from rural Maharashtra. Their platform gave
                    voice to our agricultural initiatives."
                  </blockquote>
                  <p className="font-bold text-white">सुनीता पाटील</p>
                  <p className="text-sm text-pink-200">
                    शेतकरी संघटना अध्यक्षा
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Description;
