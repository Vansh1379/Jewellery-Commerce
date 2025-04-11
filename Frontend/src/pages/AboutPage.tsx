import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsSection from "../components/Stats-Section";
import img1 from "../assets/16a.jpg";
import img2 from "../assets/17a.jpg";

export default function AboutPage() {
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
      image: img2,
    },
    {
      title: "With Signature Style",
      description:
        "Each creation bears our distinctive style while honoring your individual vision.",
      image: img2,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar on top (normal) */}
      <Navbar />

      <main className="pb-16">
        {/* Hero Section with background image */}
        <section
          className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
          style={{ backgroundImage: `url(${img2})` }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50 z-0" />

          {/* Hero Content */}
          <div className="relative z-10 container px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-serif mb-4">
              About Navkar Designs India
            </h1>
            <div className="w-24 h-[1px] bg-[#d4b978] mb-6 mx-auto" />
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Where passion meets craftsmanship to create timeless jewelry
              pieces
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <span className="text-sm uppercase tracking-widest text-[#a38d5d]">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">
                  We Are Passionate And Always Produce Better Designs For You
                </h2>
                <div className="w-20 h-[1px] bg-[#d4b978] mb-8"></div>

                <p className="mb-6 text-gray-700">
                  Welcome to NAVKAR DESIGNS, INDIA, where creativity meets
                  craftsmanship to bring your jewelry dreams to life! Situated
                  in the heart of Rajasthan's vibrant city, Jaipur, also known
                  as the Pink City, we are the epitome of heritage and modernity
                  in the jewelry industry.
                </p>

                <p className="mb-6 text-gray-700">
                  Navkar Enterprise came into existence in the year 2011 and got
                  its government authorized export license in the year 2015. The
                  word Navkar is a combination of two words: Nav, meaning new,
                  and Akar, meaning design. So, by Navkar, we mean new designs
                  and redefining design.
                </p>

                <p className="text-gray-700">
                  We are located in the heart of Rajasthan, known as Jaipur in
                  modern words and Pink City in accordance with the heritage
                  value associated with Jaipur. Our artisans bring decades of
                  expertise to each piece, combining traditional techniques with
                  contemporary vision.
                </p>
              </div>

              <div className="relative">
                <div className="relative z-10 border-[3px] border-[#d4b978]">
                  <div className="transform translate-x-4 translate-y-4">
                    <img
                      src={img2}
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

            <div className="mb-16 ">
              <div className="text-center mb-12 ">
                <span className="text-sm uppercase tracking-widest text-[#a38d5d] ">
                  Our Expertise
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                  What We Do
                </h2>
                <div className="w-24 h-[1px] bg-[#d4b978] mx-auto mb-6"></div>
                <p className="max-w-2xl mx-auto text-gray-600">
                  At NAVKAR DESIGNS, INDIA, we specialize in transforming
                  sketches into stunning, bespoke jewelry pieces that capture
                  the essence of elegance and individuality.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#f9f5f0] p-8">
                  <h3 className="text-xl font-serif mb-4">Our Craftsmanship</h3>
                  <p className="text-gray-700 mb-4">
                    As a leading 925 sterling jewelry manufacturer and OEM
                    jewelry manufacturer, our team utilizes cutting-edge
                    processing technologies and a diverse array of
                    jewelry-making techniques to ensure impeccable quality and
                    exquisite design.
                  </p>
                  <p className="text-gray-700">
                    From conceptualization to final production, our expertise
                    spans across crafting high-quality gold jewelry, including
                    9kt, 14kt, 18kt, and 22kt gold jewelry. We also excel in
                    creating gold-filled jewelry, 925 sterling silver jewelry,
                    and brass jewelry, all adorned with diamonds, cubic
                    zirconia, and semi-precious gemstones.
                  </p>
                </div>

                <div className="bg-[#f9f5f0] p-8">
                  <h3 className="text-xl font-serif mb-4">Our Approach</h3>
                  <p className="text-gray-700 mb-4">
                    With a keen focus on enhancing the wearer's beauty, we pride
                    ourselves on crafting minimalist jewelry where the metal
                    serves as a canvas to showcase the brilliance of stones and
                    the allure of our unique designs.
                  </p>
                  <p className="text-gray-700">
                    As a prominent custom jewelry manufacturer, we cater to
                    discerning clients worldwide, establishing ourselves as a
                    trusted supplier across 15+ countries, including the United
                    States, Canada, Australia, Japan, and Europe.
                  </p>
                </div>
              </div>
            </div>

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
