import React, { useState, useEffect } from "react";

const Plan = () => {
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

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  // Función para descargar el PDF
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Concepto-Técnico-interapidisimo-VoboPV-(3).pdf"; // Asegúrate de que la ruta sea correcta
    link.download = "informe.pdf"; // Nombre del archivo descargado
    link.click();
  };

  return (
    <div
      className="w-full h-full flex flex-col text-white relative"
      style={{
        backgroundImage: "url('/plan.jpg')", // Reemplaza con la ruta de tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center my-[200px]">
        <div className="w-[70%] flex">
          <div className="w-[45%]"></div>
          <div className="w-[55%]">
            <h1 className="font-Tusker text-[65px] leading-[1.1em]">
              CONOCE EL PLAN DE SIEMBRA 2025 <br />
              GUARDIANES DEL PÁRAMO
            </h1>
          </div>
        </div>
        <div className="w-[70%] h-[500px] bg-black bg-opacity-80 rounded-3xl flex flex-col">
          <div className="w-full h-1/2 flex">
            <div className="w-[45%] h-full relative">
              <img
                className="w-[300px] absolute left-1/2 -translate-x-1/2 top-[-150px] shadow-2xl shadow-black"
                src="/plansiembra.jpg"
                alt="Plán de siembra"
              />
            </div>
            <div className="w-[55%] h-full flex flex-col items-start justify-center gap-5 pr-80">
              <p className="font-Manrope">
                Adoptar un plan de siembra y manejo del suelo nos ha permitido
                aplicar técnicas eficientes, que aseguran una logística
                responsable y que no genere daños ecosistémicos.
                <br /> Hemos verificando constantemente el impacto sobre el
                suelo, adoptando una estrategia de protección que enriquezca el
                páramo.
              </p>
              <button
                onClick={handleDownload}
                className="border rounded-3xl px-8 py-1 bg-white text-black"
              >
                DESCARGA ACÁ EL INFORME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
