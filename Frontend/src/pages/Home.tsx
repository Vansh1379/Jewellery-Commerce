import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero-Section";
import AboutSection from "../components/About-Section";
import FeaturedProducts from "../components/Featured-Products";
import CollectionGrid from "../components/Collection-Grid";
import StatsSection from "../components/Stats-Section";
import ContactCta from "../components/ContactCta";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <CollectionGrid />
      <StatsSection />
      <ContactCta />
      <Footer />
    </div>
  );
};

export default Home;
