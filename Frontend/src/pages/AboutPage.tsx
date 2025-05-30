import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsSection from "../components/Stats-Section";
import img1 from "../assets/16a.jpg";
import img2 from "../assets/25b.jpg";
import img3 from "../assets/18a.jpg";
import img4 from "../assets/24a.jpg";
import img5 from "../assets/14a.jpg";

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
      image: img4,
    },
    {
      title: "With Signature Style",
      description:
        "Each creation bears our distinctive style while honoring your individual vision.",
      image: img5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pb-16">
        <section
          className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
          style={{ backgroundImage: `url(${img2})` }}
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
                  Welcome to Melange Gems and Jewels, a women-owned company
                  specializing in the manufacturing and export of 925 sterling
                  silver and gold jewelry. We create exquisite designs featuring
                  lab-grown diamonds, natural diamonds, semi-precious gemstones,
                  and cubic zirconia (CZ) for clients worldwide.
                </p>

                <p className="mb-6 text-gray-700">
                  Founded by Ms. Surbhi Jain, our Creative Director, we take
                  pride in empowering women, with 70% of our workforce being
                  skilled artisans who bring passion and precision to every
                  design. As a leading OEM jewelry manufacturer, we provide
                  customized designs and tailor-made jewelry solutions for
                  retail stores, designers, and brands. From concept to
                  creation, our expert design team transforms your ideas into
                  reality using advanced 3D CAD modeling and precision
                  manufacturing.
                </p>

                <p className="text-gray-700">
                  Our state-of-the-art production facility is equipped with
                  cutting-edge technology, ensuring high-quality craftsmanship,
                  ethical sourcing, and sustainability. We specialize in
                  creating bespoke jewelry using recycled gold and silver,
                  promoting eco-friendly practices in the jewelry industry. With
                  over a decade of experience, we supply to retail stores and TV
                  shopping channels across the USA, UK, Canada, Australia, and
                  15 other countries worldwide. Whether you need private-label
                  jewelry, custom collections, or wholesale production, we
                  deliver excellence with every piece.
                </p>
              </div>

              <div className="relative">
                <div className="relative z-10 border-[3px] border-[#d4b978]">
                  <div className="transform translate-x-4 translate-y-4">
                    <img
                      src={img3}
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
                  At Melange Gems and Jewels, we specialize in transforming
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
                    At Melange Gems and Jewels, every creation is a
                    masterpiece—whether it's a one-of-a-kind bespoke piece or a
                    large-scale production design. Our quality speaks for
                    itself, reflecting our passion, precision, and core values.
                    Every collection undergoes rigorous testing and control
                    group evaluations before reaching our customers.
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
