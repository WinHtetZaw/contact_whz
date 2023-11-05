export const containerVariant = {
  hidden: { opacity: 1, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
  },
};
