import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button, ButtonProps, chakra, Image } from "@chakra-ui/react";
import { GiSpy, GiCardAceHearts } from "react-icons/gi";

interface CardProps extends ButtonProps {
  isFlipped: boolean;
  imageUrl: string;
}

const ChakraBox = chakra(motion.div, {});

const buttonVariants: Variants = {
  hover: {
    scale: 1.2,
    y: -8,
    boxShadow: "10px 10px 32px 12px rgba(0,0,0,0.75);",
  },
  flip: {
    rotateY: 180,
    transition: { duration: 0.35 },
    zIndex: 10,
  },
};

export const Card = ({ isFlipped, imageUrl, ...props }: CardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCard(isFlipped);
    }, 350 / 2);
  }, [isFlipped]);

  return (
    <ChakraBox
      variants={buttonVariants}
      animate={isFlipped ? "flip" : isHover ? "hover" : "none"}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      bg="#FCFDF2"
      borderRadius="20px"
      cursor="pointer"
      w="150px"
      h="220px"
      p="0"
    >
      <Button
        w="150px"
        h="220px"
        p="0"
        bg="transparent"
        borderRadius="20px"
        {...props}
      >
        {!showCard ? (
          <GiSpy color="black" size="70px" />
        ) : (
          <Image
            src={imageUrl}
            borderRadius="20px"
            w="150px"
            h="220px"
            m="0"
            objectFit="cover"
          />
        )}
      </Button>
    </ChakraBox>
  );
};
