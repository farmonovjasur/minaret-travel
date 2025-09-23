import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import planeImg from "../assets/img/register/plane.png";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_COUNTRIES = [
  "Uzbekistan",
  "United States",
  "Russia",
  "United Kingdom",
  "Germany",
  "France",
  "China",
  "India",
  "Japan",
  "Kazakhstan",
];

export default function Register() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneSuffix, setPhoneSuffix] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const formRef = useRef(null);
  const planeRef = useRef(null);
  const fieldsRef = useRef([]);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxjFQkGSY8tB3HKqWORHeol1cAi4PQs7hfIDuSgyDCDMioRW6J7IkXor-f41uZRH8cixw/exec";

  // Countries load
  useEffect(() => {
    let mounted = true;
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const list = data
          .map((c) => c.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        setCountries(list);
      })
      .catch(() => setCountries(FALLBACK_COUNTRIES))
      .finally(() => mounted && setLoadingCountries(false));
    return () => (mounted = false);
  }, []);

  // GSAP fields animation
  useEffect(() => {
    // Form fields fade in
    fieldsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Plane floating animation
    if (planeRef.current) {
      gsap.to(planeRef.current, {
        y: 20,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(planeRef.current, {
        rotate: 5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }
  }, []);

  const validate = () => {
    if (!firstName.trim()) return t("registerSection.validation.firstName");
    if (!lastName.trim()) return t("registerSection.validation.lastName");
    if (!phoneSuffix.trim()) return t("registerSection.validation.phone");
    if (!/^\d{9}$/.test(phoneSuffix.trim()))
      return t("registerSection.validation.phoneFormat");
    if (!country) return t("registerSection.validation.country");
    if (!message.trim()) return t("registerSection.validation.message");
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const err = validate();
    if (err) {
      setFeedback({ type: "error", text: err });
      return;
    }

    setSubmitting(true);

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: `+998${phoneSuffix.trim()}`,
      country,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setFeedback({ type: "success", text: t("registerSection.success") });
      setFirstName("");
      setLastName("");
      setPhoneSuffix("");
      setCountry("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", text: t("registerSection.error") });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFeedback(null), 6000);
    }
  };

  return (
    <section
      id="register"
      ref={formRef}
      className="relative w-full py-16 bg-white/60"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left column: Plane image with GSAP animation */}
          <div className="relative w-full flex justify-center items-center">
            <img
              ref={planeRef}
              src={planeImg}
              alt="Plane"
              className="w-72 md:w-96 select-none pointer-events-none"
            />
          </div>

          {/* Right column: Form */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {t("registerSection.title")}
              </h2>
              <p className="text-gray-600 mb-6">{t("registerSection.description")}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div ref={(el) => (fieldsRef.current[0] = el)}>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      {t("registerSection.firstName")}
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder={t("registerSection.placeholders.firstName")}
                      required
                    />
                  </div>
                  <div ref={(el) => (fieldsRef.current[1] = el)}>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      {t("registerSection.lastName")}
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder={t("registerSection.placeholders.lastName")}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div ref={(el) => (fieldsRef.current[2] = el)}>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      {t("registerSection.phone")}
                    </label>
                    <div className="flex items-center rounded-lg border overflow-hidden">
                      <span className="px-3 text-sm bg-gray-100 text-gray-700">+998</span>
                      <input
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={9}
                        value={phoneSuffix}
                        onChange={(e) =>
                          setPhoneSuffix(e.target.value.replace(/\D/g, ""))
                        }
                        className="flex-1 px-3 py-2 focus:outline-none"
                        placeholder={t("registerSection.placeholders.phone")}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {t("registerSection.phoneHint")}
                    </p>
                  </div>

                  <div ref={(el) => (fieldsRef.current[3] = el)}>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      {t("registerSection.country")}
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      required
                    >
                      <option value="">
                        {loadingCountries
                          ? t("registerSection.loadingCountries")
                          : t("registerSection.placeholders.country")}
                      </option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div ref={(el) => (fieldsRef.current[4] = el)}>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    {t("registerSection.message")}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={t("registerSection.placeholders.message")}
                    required
                  />
                </div>

                <div
                  ref={(el) => (fieldsRef.current[5] = el)}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{t("registerSection.noteLabel")}: </span>
                    <span className="text-gray-500">{t("registerSection.noteText")}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="ml-3 inline-flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-60 transition"
                  >
                    {submitting
                      ? t("registerSection.sending")
                      : t("registerSection.submit")}
                  </button>
                </div>

                {feedback && (
                  <div
                    className={`mt-2 p-3 rounded-md text-sm ${
                      feedback.type === "success"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {feedback.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
