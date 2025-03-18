import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player/youtube";

const Experto = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta si es mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Se ejecuta al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Al hacer clic, se muestra el reproductor y se inicia el video
  const handlePlayVideo = () => {
    setShowPlayer(true);
    setIsPlaying(true);
  };

  return (
    <div
      className="relative w-full h-screen flex md:items-center xs:items-end md:pb-0 xs:pb-40 justify-center text-white overflow-hidden"
      style={{
        backgroundImage: isMobile
          ? "url('/bgExpertoResponsive.png')" // Imagen para mobile
          : "url('/expertoBack.jpg')",         // Imagen para desktop
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     
      {/* Contenedor del reproductor */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          background: isMobile
            ? "" : "linear-gradient(to right, rgb(0 0 0 / 75%), transparent)",
        }}
      >
        {showPlayer && (
          <ReactPlayer
            url="https://www.youtube.com/watch?v=vkjj3wDjFIs"
            playing={isPlaying}
            controls={false}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  iv_load_policy: 3,
                  playsinline: 1,
                },
              },
            }}
          />
        )}
      </div>
      {/* Contenido superpuesto con animación */}
      <motion.div
        className="relative w-full flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={isPlaying ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className=" md:w-1/2 xs:w-full flex flex-col items-start justify-center md:pl-40  md:pr-10 md:p-10 xs:pr-0 xs:px-10 xs:gap-5 md:gap-0">
          <h1 className="font-Tusker md:text-[80px] xs:text-[38px] text-start leading-tight">
            DETRÁS DE ESTA SIEMBRA <br /> ESTÁN LOS 15 AÑOS DE TRABAJO
            <br /> DE CARLOS PÉREZ.
          </h1>
          <p className="md:text-[20px] xs:text-[14px] font-Manrope max-w-[90%] text-start">
            Este biólogo experto nos cuenta cómo, junto a Inter Rapidísimo,
            ayudó a crear un modelo de enriquecimiento vegetal basado en un
            estudio topográfico, la creación de un plan de siembra por núcleos y
            la asignación de un guardabosques.
          </p>
          <button
            onClick={handlePlayVideo}
            className="group cursor-pointer flex gap-5 z-50 xs:text-[14px] border font-bold font-Manrope tracking-[0.3em] rounded-lg py-2 px-16 mt-4 md:bg-black md:bg-opacity-40 xs:bg-white hover:bg-white hover:text-black xs:text-black md:text-white"
          >
            <img
              className="w-4 block group-hover:hidden"
              src="/playblanco.svg"
              alt="Play Blanco"
            />
            <img
              className="w-4 md:hidden xs:block group-hover:block"
              src="/playNegro.svg"
              alt="Play Negro"
            />
            VER AHORA
          </button>
        </div>
        <div className="md:w-1/2 xs:w-0 flex items-center justify-center"></div>
      </motion.div>
    </div>
  );
};

export default Experto;
