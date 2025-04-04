// Home.js
import React, { useState, useEffect } from "react";
import Modelo from "./components/Modelo";
import ModeloResponsive from "./components/ModeloResponsive";
import IntroSection from "./components/IntroSection";
import Experto from "./components/Experto";
import Plan from "./components/Plan";
import PlanResponsive from "./components/PlanResponsive";
import { Formulario } from "./components/Formulario";
import { NavLateral } from "./components/NavLateral";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detecta si es mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full">
      {!isMobile && <NavLateral />}
      {/* Sección 1: IntroSection */}
      <section id="intro" className="snap-item  relative">
        <IntroSection isPlaying={true} />
      </section>

      {/* Sección 2: Modelo 3D */}
      <section id="modelo" className="snap-item ">
        {isMobile ? (
          <ModeloResponsive animateZoom={true} interactive={true} />
        ) : (
          <Modelo animateZoom={true} interactive={true} />
        )}
      </section>

      {/* Sección 3: Experto */}
      <section id="experto" className="snap-item ">
        <Experto />
      </section>
      <section id="formulario" className="snap-item ">
        <Formulario />
      </section>

      {/* Sección 4: Plan */}
      <section id="plan" className="snap-item ">
        {isMobile ? <PlanResponsive /> : <Plan />}
      </section>
    </div>
  );
};

export default Home;
