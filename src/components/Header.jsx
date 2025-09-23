import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import logo from "../assets/img/header/logo.png";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const langRefDesktop = useRef(null);
  const langRefMobile = useRef(null);

  // Scroll bo‘lganda header class o‘zgarishi
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menyu animatsiyasi
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: -30, opacity: 0, display: "none" },
        { y: 0, opacity: 1, display: "block", duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  // Tashqi bosilganda til oynasini yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (langRefDesktop.current && !langRefDesktop.current.contains(event.target)) &&
        (langRefMobile.current && !langRefMobile.current.contains(event.target))
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tilni o‘zgartirish funksiyasi
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
    document.documentElement.lang = lng; // html lang update
  };

  // Hozirgi til nomi
  const getCurrentLanguageName = () => {
    switch (i18n.language) {
      case "en":
        return t("english");
      case "ru":
        return t("russian");
      case "uz":
        return t("uzbek");
      default:
        return t("english");
    }
  };

  // Til tanlash dropdown
  const LanguageDropdown = ({ isMobile = false }) => (
    <div
      className={`relative ${isMobile ? "w-full mt-4" : ""}`}
      ref={isMobile ? langRefMobile : langRefDesktop}
    >
      <button
        onClick={() => setLangOpen(!langOpen)}
        className={`flex items-center ${isMobile ? "justify-center w-full" : ""} gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors`}
      >
        <span className="text-xl">🌐</span>
        <span className="font-medium">{getCurrentLanguageName()}</span>
        <span className={`transform transition-transform ${langOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {langOpen && (
        <div
          className={`absolute ${isMobile ? "left-0 right-0" : "right-0"} mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50`}
        >
          {[
            { code: "en", flag: "🇺🇸", label: t("english") },
            { code: "ru", flag: "🇷🇺", label: t("russian") },
            { code: "uz", flag: "🇺🇿", label: t("uzbek") },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center ${isMobile ? "justify-center" : ""} w-full px-4 py-3 hover:bg-amber-50 transition-colors ${
                i18n.language === lang.code ? "bg-amber-100 text-amber-800" : ""
              }`}
            >
              <span className="text-lg mr-2">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Social links reusable
  const SocialLinks = ({ isMobile = false }) => (
    <div className={`flex ${isMobile ? "justify-center gap-6 mt-6" : "items-center gap-4"}`}>
      {[
        { href: "https://www.instagram.com/minaret_travel_group?igsh=dHVjbnFvaDNnNnE=", icon: "lni-instagram", label: "Instagram" },
        { href: "https://t.me/+LaK9XjzWCA9hNTYy", icon: "lni-telegram", label: "Telegram" },
        { href: "https://www.facebook.com/share/14NRdApscG1/", icon: "lni-facebook", label: "Facebook" },
      ].map((social) => (
        <a
          key={social.icon}
          href={social.href}
          className="bg-amber-500 text-white flex items-center justify-center text-2xl w-12 h-12 rounded-full hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
          aria-label={social.label}
        >
          <i className={`lni ${social.icon}`}></i>
        </a>
      ))}
    </div>
  );

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all ${
        scrolled ? "bg-white/30 backdrop-blur-sm" : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Minaret Travel logo" className="h-24 w-auto" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-8 font-semibold text-gray-800 items-center">
          <a href="#about" className="hover:text-amber-600 transition-colors">{t("about")}</a>
          <a href="#services" className="hover:text-amber-600 transition-colors">{t("services")}</a>
          <a href="#contact" className="hover:text-amber-600 transition-colors">{t("contact")}</a>

          {/* Language Dropdown */}
          <LanguageDropdown />
        </nav>

        {/* Desktop social networks */}
        <div className="hidden lg:flex">
          <SocialLinks />
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700 p-2 flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <span className="text-2xl">✖</span>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="lg:hidden bg-white shadow-lg border-t border-gray-200"
        style={{ display: "none" }}
      >
        <div className="flex flex-col items-center gap-4 py-6 px-4">
          <a href="#about" className="w-full text-center py-3 hover:bg-amber-50 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>{t("about")}</a>
          <a href="#services" className="w-full text-center py-3 hover:bg-amber-50 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>{t("services")}</a>
          <a href="#contact" className="w-full text-center py-3 hover:bg-amber-50 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>{t("contact")}</a>

          {/* Language Dropdown Mobile */}
          <LanguageDropdown isMobile />

          {/* Mobile social networks */}
          <SocialLinks isMobile />
        </div>
      </div>
    </header>
  );
}
