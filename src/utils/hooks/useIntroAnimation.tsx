import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const useIntroAnimation = () => {
  useGSAP(() => {
    const mainTL = gsap
      .timeline({
        defaults: {
          duration: 0.8,
        },
      })
      .set("body", { delay: 0.2 })
      .from("header", {
        opacity: 0,
        y: -20,
      })
      .from(
        "main",
        {
          opacity: 0,
          scale: 0.95,
        },
        "<+=0.3"
      )
      .from(
        "footer",
        {
          opacity: 0,
          y: 20,
        },
        "<+=0.3"
      );
  }, []);

  return {};
};

export default useIntroAnimation;
