// IntroSection.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player/youtube";

const IntroSection = ({ isPlaying }) => {
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleButtonClick = () => {
    setShowFullScreenVideo(true);
  };

  const handleVideoEnded = () => {
    // Simplemente oculta el modal; la navegación se hará mediante scroll a la siguiente sección.
    setShowFullScreenVideo(false);
    setShowSkipButton(false);
  };

  // Detección de mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Muestra el botón "Omitir" 5 segundos después de iniciar el modal
  useEffect(() => {
    let timer;
    if (showFullScreenVideo) {
      timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showFullScreenVideo]);

  return (
    <>
      {/* Video de background local */}
      <figcaption className=" w-full h-full inline-block">

      <video
        autoPlay
        loop
        muted
        className=" w-full h-full object-cover object-center z-0"
      >
        <source src="/Intro-GP2-(1).mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      </figcaption>

      {/* Contenido principal de IntroSection */}
      <motion.div
        className="primeraParte absolute inset-0 z-30 overflow-hidden"
        initial={{ opacity: 1 }}
        animate={isPlaying ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.div
          className="w-full h-[10vh] bg-black bg-opacity-85 flex justify-between md:px-44 xs:px-5"
          initial={{ y: 0 }}
          animate={isPlaying ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img className="w-5" src="/prosp.svg" alt="Logo" />
          <img className="w-[124px]" src="/Guardianes.svg" alt="Guardianes" />
        </motion.div>

        <motion.div
          className="text-white w-full h-[80vh] flex flex-col items-center justify-center "
          initial={{ opacity: 1 }}
          animate={isPlaying ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="font-Tusker md:text-[162px] xs:text-[82px] text-center md:px-0 xs:px-20 leading-none">
              EL PÁRAMO NOS UNE
            </h1>
            <div className="flex flex-col items-center justify-center">
              <p className="font-Manrope text-center my-10 md:px-0 xs:px-14 text-[19px]">
                Esta montaña es capaz de unir la niebla, sus cumbres y los frailejones
                <br />
                para producir el milagro del agua.{" "}
                <strong>También tiene el poder de unir a personas.</strong>
              </p>
              <button
                className="rounded-lg bg-black bg-opacity-50 hover:bg-white w-auto md:px-14 xs:px-8 py-2 mt-8 text-white hover:text-black font-Manrope border tracking-[0.3em]"
                onClick={handleButtonClick}
              >
                DESCUBRE AQUÍ
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-[10vh] bg-black bg-opacity-85"
          initial={{ y: 0 }}
          animate={isPlaying ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Modal para reproducir el video de YouTube */}
      {showFullScreenVideo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* Fondo con efecto blur */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50"></div>
          {/* Contenedor del modal: 85% de ancho y 85% (desktop) o 55% (mobile) de alto */}
          <motion.div
            className="relative rounded-lg overflow-hidden"
            style={{ width: "85%", height: isMobile ? "55%" : "85%" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ReactPlayer
              url="https://youtu.be/rEWcQNiE5HE"  // Reemplaza por el ID del video deseado
              playing
              controls={true}
              width="100%"
              height="100%"
              onEnded={handleVideoEnded}
            />
            {showSkipButton && (
              <button
                className="absolute top-16 right-2 z-50 px-8 py-2 text-transparent hover:text-white flex"
                onClick={handleVideoEnded}
              >
                Omitir
                <img className="w-8" src="/puntos/CerrarModal.svg" alt="Omitir" />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default IntroSection;
