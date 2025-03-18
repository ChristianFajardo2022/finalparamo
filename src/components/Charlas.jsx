import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationPanelResponsive from "./NavigationPanelResponsive"; // Importa el menú
import NavigationPanel from "./NavigationPanel";


const Charlas = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [currentVideo, setCurrentVideo] = useState("/opcion3.mp4"); // Video inicial
  const [videoDuration, setVideoDuration] = useState(""); // Duración dinámica
  const videoRef = useRef(null);
  const inactivityTimer = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const videoThumbnails = [
    { src: "/opcion3.mp4", label: "Nos unimos a Corpoboyacá" },
    { src: "/opcion4.mp4", label: "Detrás de esta siembra" },
    { src: "/opcion4.mp4", label: "Charlas de expertos" },
    /*     { src: "/opcion4.mp4", label: "Guardianes del Páramo" },
    { src: "/opcion4.mp4", label: "Guardianes del Páramo" },
 */
  ];

  // Detecta si es mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Se ejecuta al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Función para formatear la duración (en segundos) a mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs} minutos`;
  };

  // Reproducir video al hacer clic
  const handlePlayVideo = () => {
    setIsPlaying(true);
    setShowUI(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Reiniciar el temporizador de inactividad
  const resetInactivityTimer = () => {
    setShowUI(true);
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setShowUI(false);
    }, 3000); // Ocultar UI tras 3 segundos sin movimiento
  };

  // Cambiar video desde el carrusel
  const handleVideoChange = (newVideo) => {
    setCurrentVideo(newVideo);
    setIsPlaying(false);
    setShowUI(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // Manejar la inactividad
  useEffect(() => {
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {isMobile ? <NavigationPanelResponsive /> : <NavigationPanel />}

      {/* Contenedor del video principal */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl"
        onMouseMove={resetInactivityTimer} // Detectar movimiento del mouse
      >
        <video
          ref={videoRef}
          className="w-full h-auto object-cover"
          src={currentVideo}
          muted
          playsInline
          controls={isPlaying}
          // Cuando se cargan los metadatos del video, se obtiene su duración
          onLoadedMetadata={() => {
            if (videoRef.current && videoRef.current.duration) {
              setVideoDuration(formatTime(videoRef.current.duration));
            }
          }}
        />
        {/* UI flotante: Aparece con movimiento del mouse y desaparece tras 3 segundos de inactividad */}
        <AnimatePresence>
          {showUI && (
            <motion.div
              className="absolute bottom-0 w-full md:h-[60%] xs:h-auto flex flex-col bg-white justify-between p-14 text-white md:mb-0 xs:mb-16"
              style={{
                background:
                  "linear-gradient(to top, rgba(0, 0, 0), transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Título y descripción */}
              <div className="md:w-[40%] xs:w-full">
                <h1 className="font-Tusker md:text-[80px] xs:text-[38px] text-start leading-tight">
                  CHARLAS QUE SANAN
                </h1>
                <p className="mt-2 text-[18px] font-Manrope">
                  <strong>Duración:</strong> {videoDuration || "00:00 minutos"}
                </p>
                <p className="md:mt-2 xs:mt-4 md:mb-4 xs:mb-8 md:text-[20px] xs:text-[14px] font-Manrope ">
                  Descripción: Corpoboyacá brindó el apoyo, la guía y las
                  herramientas académicas necesarias para garantizar que la
                  siembra que fue capaz de unir.
                </p>
                {/* Botón de Play (oculta la UI) */}
                {!isPlaying && (
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
                )}
              </div>

              {/* Carrusel de miniaturas con videos */}
              <div className="flex flex-col mt-5">
                <p className="text-[18px] font-Manrope">MÁS CHARLAS</p>
                <div className="flex gap-10 mt-4">
                  {videoThumbnails.map((video, index) => (
                    <button
                      key={index}
                      className="md:w-52 xs:w-20 md:h-40 xs:h-20 bg-gray-700 rounded-xl overflow-hidden relative"
                      onClick={() => handleVideoChange(video.src)}
                    >
                      <video
                        className="w-full h-full object-cover"
                        src={video.src}
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center p-1">
                        {video.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Charlas;
