import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCharacterContext } from "../../components/CharacterProvider";

const useCharacterDetailsOpenAnimation = () => {
  const { open } = useCharacterContext();

  useGSAP(
    () => {
      if (!open) return;

      setTimeout(() => {
        const modalTL = gsap
          .timeline({
            defaults: {
              duration: 0.4,
            },
          })
          .from(`.character-details .MuiDialog-container > .MuiPaper-root`, {
            opacity: 0,
            y: -20,
          })
          .from(`.character-details h2`, { opacity: 0 }, "<+=0.1")
          .from(
            `.character-presentation .MuiAvatar-root`,
            {
              opacity: 0,
              scale: 0.9,
            },
            "<+=0.1"
          )
          .from(
            `.character-presentation .MuiChip-root`,
            {
              opacity: 0,
              y: -10,
            },
            "<+=0.1"
          )
          .from(
            `.character-info > *`,
            {
              opacity: 0,
              x: -10,
              stagger: 0.1,
            },
            "<+=0.1"
          );
      }, 50);
    },
    { dependencies: [open] }
  );

  return {};
};

export default useCharacterDetailsOpenAnimation;
