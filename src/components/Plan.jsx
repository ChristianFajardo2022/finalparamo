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
        <div className="w-[75%] h-[600px] bg-black bg-opacity-80 rounded-3xl flex">
          <div className="w-[45%] flex justify-center items-center">
              <img
                className="w-[400px] shadow-2xl shadow-black -translate-y-32"
                src="/plansiembra.jpg"
                alt="Plán de siembra"
              />
          </div>
          <div className="w-[55%] h-full flex flex-col justify-center gap-10 p-10 ">
            <h1 className="font-Tusker md:text-7xl xs:text-3xl lg:leading-tight">
              CONOCE EL PLAN DE SIEMBRA 2025 <br />
              GUARDIANES DEL PÁRAMO
            </h1>
              <p className="font-Manrope md:text-lg xs:text-xs">
                Adoptar un plan de siembra y manejo del suelo nos ha permitido
                aplicar técnicas eficientes, que aseguran una logística
                responsable y que no genere daños ecosistémicos.
                <br /> Hemos verificando constantemente el impacto sobre el
                suelo, adoptando una estrategia de protección que enriquezca el
                páramo.
              </p>
              <button
                onClick={handleDownload}
                className="rounded-lg w-96 bg-black bg-opacity-50 hover:bg-white hover:text-black border py-2 tracking-[0.3em]"
              >
                DESCARGA ACÁ EL INFORME
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
