import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
    // Hero Text Reveal (Cinematic Fade Up)
    const tl = gsap.timeline();
    tl.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out",
    })
        .from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.2");

    // Stagger Cards (Subtle Fade Up)
    gsap.utils.toArray('.stagger-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // Timeline Line Drawing
    gsap.from(".timeline-line", {
        scrollTrigger: {
            trigger: ".experience-section",
            start: "top center",
            end: "bottom center",
            scrub: 1
        },
        height: 0,
        ease: "none"
    });
}
