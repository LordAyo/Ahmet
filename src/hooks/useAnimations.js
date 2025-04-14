import { useMemo } from "react";

export const useAnimations = () => {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.3,
          staggerChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.2 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hover: {
        scale: 1.02,
        transition: { duration: 0.3 },
      },
      tap: {
        scale: 0.98,
        transition: { duration: 0.2 },
      },
    }),
    []
  );

  const overlayVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.2 },
      },
    }),
    []
  );

  return {
    containerVariants,
    itemVariants,
    cardVariants,
    overlayVariants,
  };
};
