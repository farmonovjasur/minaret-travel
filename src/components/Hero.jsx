import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import heroImg from "../assets/img/hero/hero-img.png";
import heroBg from "../assets/img/hero/hero-bg.svg";

export default function Hero() {
    const { t } = useTranslation();
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(
            titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(
                textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                "-=0.4"
            )
            .fromTo(
                buttonsRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.3"
            );
    }, []);

    const bgUrl =
        typeof heroBg === "string"
            ? heroBg
            : heroBg && heroBg.default
                ? heroBg.default
                : null;

    return (
        <section className="relative h-screen">
            {/* Background as <img> */}
            {bgUrl && (
                <img
                    src={bgUrl}
                    alt="bg"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ zIndex: -1 }}
                />
            )}

            <div className="pt-30 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 lg:px-20 overflow-hidden">
                {/* Left Content */}
                <div className="max-w-xl space-y-6 text-center md:text-left">
                    <h1
                        ref={titleRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-indigo-950"
                    >
                        {t("heroTitle", {
                            defaultValue: "Travel, enjoy and live a new and full life",
                        })}
                    </h1>
                    <p ref={textRef} className="text-lg md:text-xl text-gray-600">
                        {t("heroSubtitle", {
                            defaultValue: "Discover new places with us, adventure awaits.",
                        })}
                    </p>
                    <div
                        ref={buttonsRef}
                        className="flex justify-center md:justify-start gap-4"
                    >
                        <a href="#register" className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg">
                            {t("register", { defaultValue: "Register Now" })}
                        </a>
                    </div>
                </div>

                {/* Right Image */}
                <div className="mt-10 md:mt-0">
                    <img
                        src={heroImg}
                        alt="Hero visual"
                        className="w-full max-w-md md:max-w-lg lg:max-w-xl"
                    />
                </div>
            </div>

        </section>
    );
}
