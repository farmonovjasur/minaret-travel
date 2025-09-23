import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useTranslation();
  const steps = t("servicesSection.timeline", { returnObjects: true });
  const serviceList = Array.isArray(steps) ? steps : [];

  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="services" className="relative w-full py-30 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-indigo-950">
            {t("servicesSection.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            {t("servicesSection.description")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden md:block h-full w-1 bg-gray-200 -translate-x-1/2"></div>

          <div className="space-y-10 md:space-y-16">
            {serviceList.map((step, index) => (
              <div
                key={index}
                ref={(el) => (refs.current[index] = el)}
                className={`relative flex flex-col md:flex-row items-center md:items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md border text-blue-600 text-2xl z-10">
                  <i className={step.icon}></i>
                </div>

                {/* Line connector */}
                <div className="hidden md:block absolute top-7 left-1/2 w-3 h-3 rounded-full bg-blue-600 -translate-x-1/2"></div>

                {/* Content */}
                <div
                  className={`mt-6 md:mt-0 md:max-w-md px-6 py-4 bg-white shadow-md rounded-xl border 
                  ${index % 2 === 0 ? "md:ml-8" : "md:mr-8"}`}
                >
                  <span className="text-sm font-semibold text-blue-500">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="text-center mt-14 text-gray-700 font-medium">
          {t("servicesSection.socialProof")}
        </div>
      </div>
    </section>
  );
}
