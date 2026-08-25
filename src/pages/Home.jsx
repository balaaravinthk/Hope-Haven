import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import About from "../components/About";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";



function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <HowItWorks />
      <ContactSection />
      <Footer />
     
      
    </>
  );
}

export default Home;