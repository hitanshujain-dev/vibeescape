import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animatePageLoad = (heroRef, filtersRef, sectionHeaderRef, cardsRef, ctaRef) => {
  const tl = gsap.timeline();

  if (heroRef.current) {
    tl.fromTo(heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }

  if (filtersRef.current?.children) {
    tl.fromTo(filtersRef.current.children,
      { opacity: 0, scale: 0.9, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)" },
      "-=0.5"
    );
  }

  if (sectionHeaderRef.current) {
    tl.fromTo(sectionHeaderRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
  }

  if (cardsRef.current?.children) {
    tl.fromTo(cardsRef.current.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );
  }

  if (ctaRef.current) {
    tl.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }
  return tl;
};

export const animateCardHover = (cardEl, imgEl, isEnter) => {
  if (isEnter) {
    gsap.to(cardEl, { scale: 1.03, y: -8, boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 30px rgba(232,137,255,0.2)", duration: 0.4, ease: "power3.out" });
    if (imgEl) gsap.to(imgEl, { scale: 1.1, duration: 0.8, ease: "power3.out" });
  } else {
    gsap.to(cardEl, { scale: 1, y: 0, boxShadow: "0 4px 24px rgba(0,0,0,0.2)", duration: 0.4, ease: "power3.out" });
    if (imgEl) gsap.to(imgEl, { scale: 1, duration: 0.6, ease: "power3.out" });
  }
};

export const initScrollTriggerCards = (selector) => {
  const cards = gsap.utils.toArray(selector);
  cards.forEach(card => {
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};

export const animateButtonPress = (btnEl, isDown) => {
    if(isDown) {
        gsap.to(btnEl, { scale: 0.95, duration: 0.1, ease: "power1.inOut"});
    } else {
        gsap.to(btnEl, { scale: 1, duration: 0.3, ease: "back.out(2)"});
    }
}
