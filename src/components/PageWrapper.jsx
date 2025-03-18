// PageWrapper.js
import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: -100 },  // Empieza desplazado a la derecha
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 }      // Sale desplazándose a la izquierda
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut"
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
