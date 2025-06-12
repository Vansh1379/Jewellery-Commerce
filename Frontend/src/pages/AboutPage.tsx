import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsSection from "../components/Stats-Section";
import img1 from "../assets/16a.jpg";
import img4 from "../assets/24a.jpg";
import img5 from "../assets/14a.jpg";

interface AboutPageData {
  id: number;
  Banner: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  whatWeDoTitle: string;
  whatWeDoDescription1: string;
  whatWeDoDescription2: string;
  img: string;
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const values = [
    {
      title: "Committed to Work",
      description:
        "We are dedicated to delivering exceptional craftsmanship in every piece we create.",
      image: img1,
    },
    {
      title: "Unique Design Ideas",
      description:
        "Our designs blend traditional techniques with contemporary aesthetics for truly unique pieces.",
      image: img4,
    },
    {
      title: "With Signature Style",
      description:
        "Each creation bears our distinctive style while honoring your individual vision.",
      image: img5,
    },
  ];

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://melangjewelers-production-1.up.railway.app/api/product/about-page"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch about page data");
        }

        const data = await response.json();
        setAboutData(data.aboutPage);
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load about page data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#d4b978] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading about page...</p>
        </div>
      </div>
    );
  }

  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "About page data not found"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#d4b978] text-white rounded hover:bg-[#b8a068] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pb-16">
        {/* Hero Section with Dynamic Banner */}
        <section
          className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
          style={{ backgroundImage: `url(${aboutData.Banner})` }}
        >
          <div className="absolute inset-0 bg-black/50 z-0" />

          <div className="relative z-10 container px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-serif mb-4">
              About Melange Gems And Jewels
            </h1>
            <div className="w-24 h-[1px] bg-[#d4b978] mb-6 mx-auto" />
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Where passion meets craftsmanship to create timeless jewellery
              pieces,
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Founded by Ms. Surbhi Jain
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Our Story Section with Dynamic Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <span className="text-sm uppercase tracking-widest text-[#a38d5d]">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">
                  {aboutData.title}
                </h2>
                <div className="w-20 h-[1px] bg-[#d4b978] mb-8"></div>

                <p className="mb-6 text-gray-700">{aboutData.description1}</p>

                {aboutData.description2 && (
                  <p className="mb-6 text-gray-700">
                    {aboutData.description2.replace(/\r\n/g, " ").trim()}
                  </p>
                )}

                {aboutData.description3 && (
                  <p className="text-gray-700">
                    {aboutData.description3
                      .replace(/\r\n/g, " ")
                      .replace(/Jewelry craftsmanship|Jewelry detail/g, "")
                      .trim()}
                  </p>
                )}
              </div>

              {/* Right side image from API */}
              <div className="relative">
                <div className="relative z-10 border-[3px] border-[#d4b978]">
                  <div className="transform translate-x-4 translate-y-4">
                    <img
                      src={aboutData.img}
                      alt="Jewelry craftsmanship"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 w-2/3 z-0">
                  <img
                    src={img1}
                    alt="Jewelry detail"
                    className="w-full h-auto object-cover border-[3px] border-[#d4b978]"
                  />
                </div>
              </div>
            </div>

            {/* What We Do Section with Dynamic Content */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <span className="text-sm uppercase tracking-widest text-[#a38d5d]">
                  Our Expertise
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                  What We Do
                </h2>
                <div className="w-24 h-[1px] bg-[#d4b978] mx-auto mb-6"></div>
                <p className="max-w-2xl mx-auto text-gray-600">
                  {aboutData.whatWeDoTitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#f9f5f0] p-8">
                  <h3 className="text-xl font-serif mb-4">Our Craftsmanship</h3>
                  <div className="text-gray-700">
                    {aboutData.whatWeDoDescription1
                      .split("\r\n\r\n")
                      .map((paragraph, index) => (
                        <p key={index} className={index === 0 ? "mb-4" : ""}>
                          {paragraph.trim()}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="bg-[#f9f5f0] p-8">
                  <h3 className="text-xl font-serif mb-4">Our Approach</h3>
                  <div className="text-gray-700">
                    {aboutData.whatWeDoDescription2
                      .split("\r\n\r\n")
                      .map((paragraph, index) => (
                        <p key={index} className={index === 0 ? "mb-4" : ""}>
                          {paragraph.trim()}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Values Section (keeping static as it's not in API) */}
            <div>
              <div className="text-center mb-12">
                <span className="text-sm uppercase tracking-widest text-[#a38d5d]">
                  Our Values
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                  What Drives Us
                </h2>
                <div className="w-24 h-[1px] bg-[#d4b978] mx-auto mb-6"></div>
                <p className="max-w-2xl mx-auto text-gray-600">
                  Driven by our four pillars of style, quality, innovation, and
                  affordability, our commitment to delivering the finest
                  products at wholesale prices is unwavering.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="group">
                    <div className="relative overflow-hidden mb-6">
                      <img
                        src={value.image || "/placeholder.svg"}
                        alt={value.title}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-serif mb-3 text-center">
                      {value.title}
                    </h3>
                    <div className="w-12 h-[1px] bg-[#d4b978] mx-auto mb-4"></div>
                    <p className="text-gray-600 text-center">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <StatsSection />
      </main>

      <Footer />
    </div>
  );
}
