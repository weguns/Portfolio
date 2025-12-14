import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

type TextType = "subtitle" | "title";

interface WeightConfig {
    min: number;
    max: number;
    default: number;
}

const FONT_WEIGHTS: Record<TextType, WeightConfig> = {
    subtitle: {min: 100, max: 400, default: 100},
    title: {min: 400, max: 900, default: 400},
};

const renderText = (text: string, className: string, baseWeight: number = 400) => {
    return (
        <span aria-label={text} role="text">
      {[...text].map((char, i) => (
          <span key={i} className={className} aria-hidden="true"
                style={{fontVariationSettings: `'wght' ${baseWeight}`}}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
    );
};

const setupTextHover = (container: HTMLElement | null, type: TextType): (() => void) => {
    if (!container) return () => {
    };

    // Select spans strictly
    const letters = container.querySelectorAll<HTMLSpanElement>("span[aria-hidden='true']");
    const {min, max, default: base} = FONT_WEIGHTS[type];

    const animateLetter = (letter: HTMLElement, weight: number, duration = 0.25, force = false) => gsap.to(letter, {
        duration,
        ease: "power2.out",
        fontVariationSettings: `'wght' ${weight}`,
        overwrite: force ? true : "auto",
    });

    const handleMouseMove = (e: MouseEvent) => {
        const {left} = container.getBoundingClientRect();
        // Calculate mouse relative to container
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const {left: l, width: w} = letter.getBoundingClientRect();
            const letterCenter = l - left + w / 2;
            const distance = Math.abs(mouseX - letterCenter);

            // Calculate intensity
            const intensity = Math.exp(-(distance ** 2) / 2000);
            const targetWeight = min + (max - min) * intensity;

            animateLetter(letter, targetWeight);
        });
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) => animateLetter(letter, base, 0.3, true));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const Welcome = () => {
    // 4. Clean Ref Typing
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, "title");
        const subTitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            subTitleCleanup();
            titleCleanup();
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Alireza! Welcome to my", "text-3xl font-georama", 100)}
            </p>

            <h1 ref={titleRef} className="mt-7">
                {renderText("portfolio", "text-9xl italic font-georama", 400)}
            </h1>

            <div className="small-screen">
                <p>This Portfolio is designed for desktop/tablet screens only</p>
            </div>
        </section>
    );
};

export default Welcome;