import React, { useState, useEffect } from "react";

const PlanResponsive = () => {
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
      className="w-full h-full flex flex-col justify-center items-center text-white relative overflow-auto px-5"
      style={{
        backgroundImage: "url('/plan.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full bg-black bg-opacity-80 rounded-2xl gap-10 translate-y-6">
        <div className="w-full h-full flex flex-col items-center justify-center gap-12 -translate-y-20 px-5">
          <figure className="w-36 relative">
            <img
              className="w-full h-full object-contain shadow-2xl shadow-black"
              src="/plansiembra.jpg"
              alt="Plán de siembra"
            />
          </figure>
          <h1 className="font-Tusker text-3xl text-center">
            CONOCE EL PLAN DE SIEMBRA 2025 <br />
            GUARDIANES DEL PÁRAMO
          </h1>
          <p className="text-xs font-Manrope text-center text-[#9b9a9a]">
            Adoptar un plan de siembra y manejo del suelo nos ha permitido
            aplicar técnicas eficientes, que aseguran una logística responsable
            y que no genere daños ecosistémicos.
            <br />
            <span className="mt-4 inline-block">
              Hemos verificando constantemente el impacto sobre el suelo,
              adoptando una estrategia de protección que enriquezca el páramo.
            </span>
          </p>
          <button
            onClick={handleDownload}
            className="border rounded-md px-6 py-1 bg-none text-white border-white text-sm tracking-[0.1rem]"
          >
            DESCARGA ACÁ EL INFORME
          </button>
        </div>
        {/*         <h1 className="font-Tusker text-[38px] leading-[1.1em] text-center">
          TODOS DEBERÍAMOS <br /> RECONCILIARNOS <br /> SEMBRANDO UN FRAILEJÓN.
        </h1>
        <p>
          Sana heridas del pasado sembrando un frailejón junto a esa persona que
          en algún momento de tu vida tuviste una diferencia.
        </p>
        <p>INSCRÍBETE AQUÍ Y ENVÍALE LA INVITACIÓN.</p>
        <button className="border rounded-3xl px-8 py-1 bg-white text-black">
          SIGUIENTE
        </button>
 */}{" "}
      </div>
      {/* El NavigationPanelResponsive se incluye al final del contenido, en el flujo normal */}
    </div>
  );
};

export default PlanResponsive;
