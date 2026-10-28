import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
  style = {},
  direction = "y"
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current || !ref.current.parentElement) return;

      const animationVars = {
        ease: "none",
        scrollTrigger: {
          trigger: ref.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      };

      if (direction === "y") {
        animationVars.yPercent = speed * 100;
      } else {
        animationVars.xPercent = speed * 100;
      }

      gsap.to(ref.current, {
        ...animationVars,
        willChange: "transform",
      });
    });

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
