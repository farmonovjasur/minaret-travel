import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";


import bgImg from "../assets/img/about/bg-about.jpg";
import img1 from "../assets/img/about/about1.jpg";
import img2 from "../assets/img/about/about2.jpg";
import img3 from "../assets/img/about/about3.jpg";

export default function About() {
  const { t } = useTranslation();
  const cardsRef = useRef([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  const services = t("aboutSection.cards", { returnObjects: true });
  const cards =
    Array.isArray(services) && services.length > 0
      ? services.map((c, i) => ({
          img: [img1, img2, img3][i] || img1,
          title: c.title,
          desc: c.desc,
        }))
      : [
          {
            img: img1,
            title: "Guided Tours",
            desc: "Experience the best of Uzbekistan with our expert guides.",
          },
          {
            img: img2,
            title: "Hotel Reservations",
            desc: "Comfortable accommodations for your journey.",
          },
          {
            img: img3,
            title: "Cultural Programs",
            desc: "Immerse yourself in authentic local experiences.",
          },
        ];

  return (
    <section
      id="about"
      className="relative w-full min-h-screen mt-50 flex items-center justify-center text-white py-16"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-75"
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("aboutSection.title")}
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            {t("aboutSection.description")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => setSelectedCard(item)}
              className="bg-white/10 rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20 cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              className="relative bg-white/10 backdrop-blur-lg p-4 md:p-5 rounded-2xl shadow-xl max-w-2xl w-full border border-white/20"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 text-white text-xl hover:text-gray-300"
              >
                <i className="lni lni-close"></i>
              </button>

              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={selectedCard.img}
                  alt={selectedCard.title}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
              </div>

              {/* Text */}
              <div className="mt-4 text-center">
                <h3 className="text-base font-semibold mb-1">
                  {selectedCard.title}
                </h3>
                <p className="text-sm text-gray-200">{selectedCard.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
