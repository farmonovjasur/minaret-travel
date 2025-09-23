import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Fade-in animatsiya
    [infoRef.current, mapRef.current].forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Hover animatsiya info
    if (infoRef.current) {
      infoRef.current.addEventListener("mouseenter", () => {
        gsap.to(infoRef.current, { scale: 1.03, duration: 0.3 });
      });
      infoRef.current.addEventListener("mouseleave", () => {
        gsap.to(infoRef.current, { scale: 1, duration: 0.3 });
      });
    }

    // Hover animatsiya map
    if (mapRef.current) {
      mapRef.current.addEventListener("mouseenter", () => {
        gsap.to(mapRef.current, { x: 5, y: -5, duration: 0.3 });
      });
      mapRef.current.addEventListener("mouseleave", () => {
        gsap.to(mapRef.current, { x: 0, y: 0, duration: 0.3 });
      });
    }
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-16 bg-gray-300"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-950">
          {t("contactSection.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Info column */}
          <div
            ref={infoRef}
            className="space-y-4 p-6 rounded-xl cursor-pointer"
          >
            <p className="text-lg flex items-center gap-2">
              <i className="lni lni-phone bg-amber-500 p-4 rounded-full"></i>
              {t("contactSection.phone")}: +998914407177
            </p>
            <p className="text-lg flex items-center gap-2">
              <i className="lni lni-map-marker bg-amber-500 p-4 rounded-full"></i>
              {t("contactSection.address")}: Buxoro shaxri. Ibroxim Mo'minov ko'chasi 38/2-uy
            </p>
          </div>

          {/* Map column */}
          <div
            ref={mapRef}
            className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3066.841508130655!2d64.43586437597885!3d39.765666771551736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMznCsDQ1JzU2LjQiTiA2NMKwMjYnMTguNCJF!5e0!3m2!1sru!2s!4v1758610177086!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Firma Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
