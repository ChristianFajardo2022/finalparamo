import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function NavigationPanelResponsive() {
  const navigate = useNavigate();
  const navigationItems = [
    { label: "El páramo", icon: "/botoneslaterales/paramo3d.svg", alt: "Paramo 3d", route: "/" },
    { label: "Experto", icon: "/botoneslaterales/experto.svg", alt: "Experto", route: "/experto" },
/*     { label: "Charlas que sanan", icon: "/botoneslaterales/charlas.svg", alt: "Charlas", route: "/charlas" },
 */    { label: "Plán de siembra", icon: "/botoneslaterales/plan.svg", alt: "Plan de siembra", route: "/plan" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Refs para detección de swipe/touch y mouse
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(null);

  // Transición automática cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, navigationItems.length]);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? navigationItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % navigationItems.length);
  };

  // Handlers para dispositivos táctiles
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrevious();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Handlers para interacción con mouse (arrastrar)
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    // Se podría implementar un efecto de arrastre en tiempo real si se desea.
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    const diff = dragStartX.current - e.clientX;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrevious();
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  return (
    <div className="w-screen h-24 absolute font-Manrope left-0 bottom-10 z-[80] text-white">
      <div className="relative">
        {/* Contenedor del slider */}
        <div
          className="w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex items-center justify-center"
              >
                <button
                  className="flex flex-col  items-center justify-center text-white focus:outline-none"
                  onClick={() => navigate(item.route)}
                >
                  <img className="w-12 ml-2" src={item.icon} alt={item.alt} />
                  <span>{item.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Flecha izquierda */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-2 rounded-full focus:outline-none"
          onClick={goToPrevious}
        >
          &lt;
        </button>

        {/* Flecha derecha */}
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-2 rounded-full focus:outline-none"
          onClick={goToNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default NavigationPanelResponsive;
