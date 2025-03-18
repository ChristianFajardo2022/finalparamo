import React, { useState, useEffect } from "react";
import NavigationPanelResponsive from "./NavigationPanelResponsive";

const PlanResponsive = () => {
      useEffect(() => {
        document.body.style.overflow =  "auto";
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
      className="w-full flex flex-col items-center text-white relative overflow-auto"
      style={{
        backgroundImage: "url('/plan.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-[90%] mt-60 bg-black bg-opacity-80 rounded-3xl flex flex-col items-center justify-center gap-10 pb-10 mb-40 px-5">
        <div className="w-[45%] relative pb-20">
          <img
            className="w-[300px] absolute left-1/2 -translate-x-1/2 top-[-150px] shadow-2xl shadow-black"
            src="/plansiembra.jpg"
            alt="Plán de siembra"
          />
        </div>

        <h1 className="font-Tusker text-[38px] leading-[1.1em] text-center">
          CONOCE EL PLAN DE SIEMBRA 2025 <br />
          GUARDIANES DEL PÁRAMO
        </h1>
        <p className="font-Manrope text-center">
          Adoptar un plan de siembra y manejo del suelo nos ha permitido aplicar
          técnicas eficientes, que aseguran una logística responsable y que no
          genere daños ecosistémicos.
          <br /> Hemos verificando constantemente el impacto sobre el suelo,
          adoptando una estrategia de protección que enriquezca el páramo.
        </p>
        <button
          onClick={handleDownload}
          className="border rounded-3xl px-8 py-1 bg-white text-black"
        >
          DESCARGA ACÁ EL INFORME
        </button>
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
 */}      </div>
      {/* El NavigationPanelResponsive se incluye al final del contenido, en el flujo normal */}
      <NavigationPanelResponsive />
    </div>
  );
};

export default PlanResponsive;
