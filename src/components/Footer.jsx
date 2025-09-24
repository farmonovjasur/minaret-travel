import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const iconsRef = useRef([]);

  // Social icon hover interaktiv animatsiyasi
  useEffect(() => {
    iconsRef.current.forEach((el) => {
      if (!el) return;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { y: -4, scale: 1.1, duration: 0.2, ease: "power1.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { y: 0, scale: 1, duration: 0.2, ease: "power1.out" });
      });
    });
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-100 py-8">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Social Icons */}
        <div className="flex gap-6 mb-4">
          <a ref={(el) => (iconsRef.current[0] = el)} href="https://www.facebook.com/share/14NRdApscG1/" className="text-gray-100 text-2xl">
            <i className="lni lni-facebook-original"></i>
          </a>
          <a ref={(el) => (iconsRef.current[1] = el)} href="https://www.instagram.com/minaret_travel_group?igsh=dHVjbnFvaDNnNnE=" className="text-gray-100 text-2xl">
            <i className="lni lni-instagram-original"></i>
          </a>
          <a ref={(el) => (iconsRef.current[2] = el)} href="https://t.me/MinaretTravelGroup" className="text-gray-100 text-2xl">
            <i className="lni lni-telegram-original"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Minaret Travel. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
