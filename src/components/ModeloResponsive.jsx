import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import ReactPlayer from "react-player/youtube";
import { useNavigate } from "react-router-dom";

// Fondo 360
function Background360() {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load(
      "/Foto_360_3.jpg",
      (tex) => {
        tex.encoding = THREE.sRGBEncoding;
        setTexture(tex);
      },
      undefined,
      (error) => console.error("Error al cargar la textura 360:", error)
    );
  }, []);

  if (!texture) return null;
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

// Escena con fondo 360 y puntos interactivos (se muestran solo si interactive es true)
function Scene({ onSelect, interactive }) {
  const { camera, size } = useThree();

  // Lista de puntos (modal se mostrará al hacer clic en ellos)
  const points = [
    {
      id: 1,
      position: [-10, -2, -2.5],
      text: "El agua es el principio de todo",
      popupContent:
        "La montaña nos recordó por qué vale la pena cuidarla.",
      videoUrl: "https://youtu.be/3hpZ1cpyneo",
      image: "/puntos/puntosResponsive/RespOlimpica-Blu.png"
    },
    {
      id: 2,
      position: [-8, -2.5, -8],
      text: "Un viaje que te cambia el alma",
      popupContent:
        "El páramo les llenó el alma, sembrar frailejones, los comprometió con el cuidado de esta tierra.",
      videoUrl: "https://youtu.be/GNbJcA2GMsg",
      image: "/puntos/puntosResponsive/respCaracol-Rcn.png"
    },
    {
      id: 3,
      position: [-8, -1, 4],
      text: "La montaña habla al alma",
      popupContent:
        "Cada paso en el páramo fue un pacto silencioso con la vida.",
      videoUrl: "https://youtu.be/LMRRRg1y1pQ",
      image: "/puntos/puntosResponsive/respCitroen-gwn.png"
    },
    {
      id: 4,
      position: [-5, 0, 0],
      text: "Cuidar el agua, cuidar la vida",
      popupContent:
        "Caminaron hasta el origen del agua y entendieron que protegerla es protegernos.",
      videoUrl: "https://www.youtube.com/watch?v=VIDEOID1",
      image: "/puntos/puntosResponsive/RespClaro-Movistar.png"
    },
    {
      id: 5,
      position: [-1, -1, -4],
      text: "La promesa que nace en la montaña",
      popupContent:
        "Allí entendieron que la vida y el agua empiezan en ese silencio que lo dice todo.",
      videoUrl: "https://youtu.be/h91sTCbZmfU",
      image: "/puntos/puntosResponsive/RespDhl-Deprisa.png"
    },
    {
      id: 6,
      position: [-0.2, -2, 1.5],
      text: "Subieron buscando una respuesta",
      popupContent:
        "En el páramo todo se hizo claro: estamos aquí para cuidar.",
      videoUrl: "https://youtu.be/QVjTLb7O9Lk",
      image: "/puntos/puntosResponsive/RespAval-Falabella.png"
    },
    {
      id: 7,
      position: [1, 0, 5],
      text: "Volvieron siendo parte de la montaña",
      popupContent:
        "Cada paso fue una promesa de volver a cuidar lo que importa.",
      videoUrl: "https://youtu.be/zP4JLhBd8zY",
      image: "/puntos/puntosResponsive/RespMargarita-Ramo.png"
    },
    {
      id: 8,
      position: [9, -1.2, 2],
      text: "El agua también tiene guardianes",
      popupContent:
        "Llegaron al páramo y la montaña los convirtió en defensores de la vida.",
      videoUrl: "https://www.youtube.com/watch?v=VIDEOID1",
      image: "/puntos/puntosResponsive/RespRamo-Pepsico.png"
    },
    {
      id: 9,
      position: [5, -1, 8],
      text: "La montaña les pidió cuidarla",
      popupContent:
        "No se conquista el páramo, se entiende, se respeta y se protege.",
      videoUrl: "https://youtu.be/oUg511UHShQ",
      image: "/puntos/puntosResponsive/RespRappi-Amazon.png"
    },
    {
      id: 10,
      position: [0.8, 0, 11],
      text: "Ahí entendieron lo que es el origen",
      popupContent:
        "Descubrieron que el agua nace en ese frío que también abraza.",
      videoUrl: "https://www.youtube.com/watch?v=VIDEOID1",
      image: "/puntos/puntosResponsive/RespSuzuki-Autogermana.png"
    },
    {
      id: 11,
      position: [8, -2, 12],
      text: "Ser guardianes, la verdadera cima",
      popupContent:
        "Subieron por la experiencia y bajaron con la responsabilidad de proteger la montaña.",
      videoUrl: "https://youtu.be/Llxs-ttMDq4",
      image: "/puntos/puntosResponsive/RespTaxislibres-Picap.png"
    },
  ];

  // Convierte una posición 3D a coordenadas de pantalla (útil para posicionar el modal)
  const computeScreenPosition = (position) => {
    const vector = new THREE.Vector3(...position);
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = (-vector.y * 0.5 + 0.5) * size.height;
    return { x, y };
  };

  // Configuración para distribuir los puntos alrededor de la cámara
  const radius = 20; // Distancia desde la cámara
  const totalPoints = points.length;

  return (
    <>
      <Background360 />
      <OrbitControls enableZoom={true} minDistance={1} maxDistance={1} />
      {interactive &&
        points.map((point, index) => {
          // Calcula la posición en un círculo horizontal
          const angle = (index / totalPoints) * Math.PI * 2;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          // Conservamos el valor original de "y" o lo puedes ajustar para variar la altura
          const y = point.position[1];
          const newPosition = [x, y, z];

          return (
            <Html key={point.id} position={newPosition} center zIndexRange={[0, 0]}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.3, duration: 0.5, ease: "easeOut" }}
                style={{ width: "225px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  const screenPos = computeScreenPosition(newPosition);
                  onSelect({ ...point, screenPos });
                }}
              >
                <img src={point.image} alt="Punto interactivo" />
              </motion.div>
            </Html>
          );
        })}
    </>
  );
}

// Componente principal Modelo
// Cuando se activa interactive se muestran los puntos sobre el fondo 360 y también el overlay de introducción.
// El modal se muestra al hacer clic en un punto.
const ModeloResponsive = ({ animateZoom, interactive }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <div className="w-full h-screen relative ">
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 90 }}
        gl={{ outputEncoding: THREE.sRGBEncoding }}
      >
        <Scene onSelect={setSelectedPoint} interactive={interactive} />
      </Canvas>
      {/* Overlay de introducción: se muestra cuando interactive es true y no hay modal abierto */}
      <AnimatePresence>
        {interactive && !selectedPoint && (
          <motion.div
            key="tituloPuntos"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="w-full h-32 absolute z-50 top-[15%] rounded-2xl flex items-center justify-center text-white"
          >
            <div className="text-center">
              <h1 className="font-Tusker text-[38px] leading-none">
                CADA UNO DE ESTOS FRAILEJONES
                <br /> TIENE UNA HISTORIA PARA CONTARTE.
              </h1>
              <p className="text-[19px] font-Manrope">
                Haz clic en los puntos para conocerla.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modal de información: se activa al hacer clic en un punto */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            className="backdrop-blur-xl"
            key="popup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              zIndex: 9999,
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-[95%] max-w-md bg-black text-[#999999] rounded-3xl relative flex flex-col items-center justify-start pt-10 pb-5 px-4">
                <button
                  onClick={() => setSelectedPoint(null)}
                  style={{ border: "none", cursor: "pointer" }}
                  className="absolute right-4 top-4"
                >
                  <img
                    className="w-6"
                    src="/puntos/CerrarModal.svg"
                    alt="Cerrar modal"
                  />
                </button>
                <div className="w-full relative aspect-video rounded-3xl overflow-hidden">
                  <ReactPlayer
                    url={selectedPoint.videoUrl}
                    width="100%"
                    height="100%"
                    controls={false}
                    playing={true}
                  />
                </div>
                <div className="w-full mt-4 text-center">
                  <h1 className="font-Tusker text-2xl">
                    {selectedPoint.text}
                  </h1>
                  <p className="font-Manrope text-sm">
                    {selectedPoint.popupContent}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModeloResponsive;
