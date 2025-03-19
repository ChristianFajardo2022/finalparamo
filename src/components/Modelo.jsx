import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import Lottie from "lottie-react";
import animatedSVG from "./puntos/BotonesAnimados.json";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

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
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

// Iluminación
function Lights() {
  return (
    <>
      <ambientLight intensity={8} color="white" />
      <directionalLight intensity={1} position={[5, 10, 7.5]} />
    </>
  );
}

// Carga del modelo 3D
function Model3D() {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    new GLTFLoader().load(
      "/3d/ParamoTotal.glb",
      (loaded) => {
        loaded.scene.scale.set(0.08, 0.08, 0.08);
        loaded.scene.position.set(1.5, -7, 0);
        loaded.scene.rotation.y = THREE.MathUtils.degToRad(115);
        setGltf(loaded);
      },
      undefined,
      (error) => console.error("Error al cargar el modelo:", error)
    );
  }, []);

  if (!gltf) return null;
  return <primitive object={gltf.scene} />;
}

// Animación de zoom de la cámara usando GSAP con camera.lookAt
function ZoomAnimation({ initialPos, finalPos, duration, onComplete, target }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...initialPos);
    if (target) {
      camera.lookAt(new THREE.Vector3(...target));
    }
    gsap.to(camera.position, {
      duration: duration,
      x: finalPos[0],
      y: finalPos[1],
      z: finalPos[2],
      ease: "power2.out",
      onUpdate: () => {
        camera.updateProjectionMatrix();
        if (target) {
          camera.lookAt(new THREE.Vector3(...target));
        }
      },
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  }, [camera, initialPos, finalPos, duration, onComplete, target]);

  return null;
}

// Escena 3D con puntos interactivos
function Scene({ animateZoom, onHover, onSelect, onZoomComplete }) {
  const { camera, size } = useThree();
  const [zoomComplete, setZoomComplete] = useState(false);

  // Cada punto tiene una imagen diferente para el hover y datos para el popup
  const points = [
    {
      id: 1,
      position: [-10, 2, -2.5],
      text: "El agua es el principio de todo",
      hoverImage: "/puntos/blu-olimpica.png",
      popupContent: "La montaña nos recordó por qué vale la pena cuidarla.",
      videoUrl: "https://youtu.be/h91sTCbZmfU",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/blu-olompica2.png",
    },
    {
      id: 2,
      position: [-8, 2.5, -8],
      text: "Un viaje que te cambia el alma",
      hoverImage: "/puntos/caracol-rcn.png",
      popupContent:
        "El páramo les llenó el alma, sembrar frailejones, los comprometió con el cuidado de esta tierra.",
      videoUrl: "https://youtu.be/GNbJcA2GMsg",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/caracol-rcn2.png",
    },
    {
      id: 3,
      position: [-8, 0, 4],
      text: "La montaña habla al alma",
      hoverImage: "/puntos/citroen-gwm.png",
      popupContent:
        "Cada paso en el páramo fue un pacto silencioso con la vida.",
      videoUrl: "https://youtu.be/QVjTLb7O9Lk",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/citroen-gwm2.png",
    },
    {
      id: 4,
      position: [-5, 0, -0],
      text: "Cuidar el agua, cuidar la vida",
      hoverImage: "/puntos/claro-movistar.png",
      popupContent:
        "Caminaron hasta el origen del agua y entendieron que protegerla es protegernos.",
      videoUrl: "https://youtu.be/LMRRRg1y1pQ",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/claro-movistar2.png",
    },
    {
      id: 5,
      position: [-1, 1, -4],
      text: "La promesa que nace en la montaña",
      hoverImage: "/puntos/dhl-deprisa.png",
      popupContent:
        "Allí entendieron que la vida y el agua empiezan en ese silencio que lo dice todo.",
      videoUrl: "https://youtu.be/3hpZ1cpyneo",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/dhl-deprisa2.png",
    },
    {
      id: 6,
      position: [-0.2, 0.2, 1.5],
      text: "Subieron buscando una respuesta",
      hoverImage: "/puntos/falabella-aval.png",
      popupContent:
        "En el páramo todo se hizo claro: estamos aquí para cuidar.",
      videoUrl: "https://youtu.be/Llxs-ttMDq4",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/falabella-aval2.png",
    },
    {
      id: 7,
      position: [1, 1, 5],
      text: "Volvieron siendo parte de la montaña",
      hoverImage: "/puntos/margarita-ramo.png",
      popupContent:
        "Cada paso fue una promesa de volver a cuidar lo que importa.",
      videoUrl: "https://youtu.be/EOUJBerNoiI",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/margarita-ramo2.png",
    },
    {
      id: 8,
      position: [9, 1.2, 2],
      text: "El agua también tiene guardianes",
      hoverImage: "/puntos/ramo-pepsico.png",
      popupContent:
        "Llegaron al páramo y la montaña los convirtió en defensores de la vida.",
      videoUrl: "https://youtu.be/zP4JLhBd8zY",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/pepsico-ramo2.png",
    },
    {
      id: 9,
      position: [5, 1, 8],
      text: "La montaña les pidió cuidarla",
      hoverImage: "/puntos/rappi-amazon.png",
      popupContent:
        "No se conquista el páramo, se entiende, se respeta y se protege.",
      videoUrl: "https://youtu.be/oUg511UHShQ",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/rappi-amazon2.png",
    },
    {
      id: 10,
      position: [0.8, 0, 11],
      text: "Ahí entendieron lo que es el origen",
      hoverImage: "/puntos/suzuki-autogermana.png",
      popupContent:
        "Descubrieron que el agua nace en ese frío que también abraza.",
      videoUrl: "https://youtu.be/o47HOSVhXhI",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/suzuki-autogermana2.png",
    },
    {
      id: 11,
      position: [8, 2, 12],
      text: "Ser guardianes, la verdadera cima",
      hoverImage: "/puntos/taxislibres-picap.png",
      popupContent:
        "Subieron por la experiencia y bajaron con la responsabilidad de proteger la montaña.",
      videoUrl: "https://youtu.be/fe_kxkVQE20",
      hoverUno: "CONOCE LA HISTORIA DE",
      imageHoverDos: "/puntos/taxislibres-picap2.png",
    },
  ];

  // Convierte la posición 3D a coordenadas de pantalla
  const computeScreenPosition = (position) => {
    const vector = new THREE.Vector3(...position);
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = (-vector.y * 0.5 + 0.5) * size.height;
    return { x, y };
  };

  return (
    <>
      <Background360 />
      <Lights />
      <Model3D />
      <OrbitControls
        makeDefault
        enableDamping 
        dampingFactor={0.01} // Ajusta la suavidad (0.1 es suave pero puedes probar con 0.05 o 0.2)
        enableZoom={false} // Desactiva el zoom
        target={[5, 2, -3]} // Punto de enfoque
        minPolarAngle={Math.PI / 2 - 0.15}
        maxPolarAngle={Math.PI / 2 + 0.15}
        minAzimuthAngle={-0.65 - 0.195}
        maxAzimuthAngle={-0.65 + 0.195}
      />
      {animateZoom && !zoomComplete && (
        <ZoomAnimation
          initialPos={[-10, 8, 18]}
          finalPos={[-8, 3, 14]}
          duration={5}
          onComplete={() => {
            setZoomComplete(true);
            if (onZoomComplete) onZoomComplete(true);
          }}
          target={[5, 2, -3]}
        />
      )}
      {zoomComplete &&
        points.map((point, index) => (
          <Html
            key={point.id}
            position={point.position}
            center
            zIndexRange={[0, 0]}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.3,
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{ width: "35px", cursor: "pointer" }}
              onPointerOver={() => {
                const screenPos = computeScreenPosition(point.position);
                onHover({ ...point, screenPos });
              }}
              onPointerOut={() => onHover(null)}
              onClick={(e) => {
                e.stopPropagation();
                const screenPos = computeScreenPosition(point.position);
                onSelect({ ...point, screenPos });
              }}
            >
              <Lottie animationData={animatedSVG} loop={true} />
            </motion.div>
          </Html>
        ))}
    </>
  );
}

// Componente principal que renderiza el Canvas y los overlays externos
const Modelo = ({ animateZoom, interactive }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [zoomComplete, setZoomComplete] = useState(false);

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [-10, 8, 18], fov: 90 }}
        gl={{ outputEncoding: THREE.sRGBEncoding }}
      >
        <Scene
          animateZoom={animateZoom}
          onHover={setHoveredPoint}
          onSelect={setSelectedPoint}
          onZoomComplete={setZoomComplete}
        />
      </Canvas>
      <AnimatePresence>
        {zoomComplete && (
          <motion.div
            key="tituloPuntos"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="w-full h-32 absolute z-50 top-[20%]  rounded-2xl tituloPuntos"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-white ">
              <div className="w-auto h-full flex flex-col items-center justify-center px-8 rounded-2xl opcionHover">
                {hoveredPoint ? (
                  <>
                    <div className=" flex relative">
                      <h1 className=" leading-[2rem] font-Tusker text-[55px]">
                        {hoveredPoint.hoverUno}
                      </h1>
                      <h1 className="absolute right-[-15px] top-[-37px] font-Tusker text-[55px]">
                        :
                      </h1>
                    </div>
                    <p className="text-[19px] mt-5 font-Manrope">
                      <img
                        src={hoveredPoint.imageHoverDos}
                        alt="Imagen hover"
                        style={{ maxWidth: "100%" }}
                      />
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="leading-[3.5rem] font-Tusker md:text-7xl xs:text-3xl uppercase text-center">
                    23 de las marcas más amadas del país,<br/> sembraron vida en el páramo
                    </h1>
                    <p className="md:text-xl xs:text-xs mt-5 font-Manrope">
                    Haz clic en los puntos para conocer su historia.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/*  {hoveredPoint && (
        <div
          style={{
            position: "absolute",
            left: hoveredPoint.screenPos.x,
            top: hoveredPoint.screenPos.y - 10,
            transform: "translate(-50%, -100%)",
            padding: "8px 12px",
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 5,
          }}
        >
          <img
            src={hoveredPoint.hoverImage}
            alt={hoveredPoint.text}
            style={{ width: "230px", height: "auto" }}
          />
        </div>
      )} */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            className="backdrop-blur-xl rounded-xl"
            key="popup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              transform: "translate(-50%, -50%)",
              width: "100vw",
              height: "100vh",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              zIndex: 9999,
            }}
          >
            <div className="w-screen h-screen flex flex-col items-center justify-center">
              <div className="w-[900px] h-[700px] bg-black text-[#999999] rounded-3xl relative flex flex-col items-center justify-start pt-0 pb-10 px-10 contenidoModal">
                <button
                  onClick={() => setSelectedPoint(null)}
                  style={{ border: "none", cursor: "pointer" }}
                  className=" absolute right-12 top-14"
                >
                  <img
                    className="w-6"
                    src="/puntos/CerrarModal.svg"
                    alt="Cerrar modal"
                  />
                </button>
                {/* Se usa ReactPlayer para reproducir el video dinámico del punto */}
                <div className=" w-full h-full rounded-3xl overflow-hidden">
                  <ReactPlayer
                    url={selectedPoint.videoUrl}
                    width="100%"
                    height="100%"
                    controls={false}
                    playing={true}
                  />
                </div>
                <div className="w-full flex flex-col gap-5">
                  <h1 className="font-Tusker text-5xl">
                    {selectedPoint.text}
                  </h1>
                  <p className="font-Manrope text-lg">
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

export default Modelo;
