import React, { useState, useEffect } from "react";
import NavigationPanel from "./NavigationPanel";
import NavigationPanelResponsive from "./NavigationPanelResponsive";

const SmoothNavigationPanel = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Verificamos al montar el componente
    window.addEventListener("resize", handleResize);

    // Delay para iniciar la transición
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 10);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Estilos distintos para desktop y mobile
  const desktopContainerStyle = {
    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(200px)",
  };

  const mobileContainerStyle = {
    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(100px)",
  };

  return (
    <>
      {isMobile ? (
        <div
          className="absolute bottom-0 left-0 w-full z-50"
          style={mobileContainerStyle}
        >
          <NavigationPanelResponsive />
        </div>
      ) : (
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-50"
          style={desktopContainerStyle}
        >
          <NavigationPanel />
        </div>
      )}
    </>
  );
};

export default SmoothNavigationPanel;
