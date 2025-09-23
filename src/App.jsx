import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setFadeOut(true);

      const hideTimer = setTimeout(() => {
        setLoading(false);
      }, 600);

      return () => clearTimeout(hideTimer);
    }, 1500);

    return () => clearTimeout(showTimer);
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center bg-black transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
      </main>
      <Services />
      <Register />
      <Contact />
      <Footer />
    </>
  );
}

