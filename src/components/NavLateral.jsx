import { motion } from "framer-motion";
import { useState } from "react";

export const NavLateral = () => {
  const [active, setactive] = useState(null);
  const [activeNav, setactiveNav] = useState(0);
  const navItems = [
    { titulo: "Intro", icono: "/iconos/home.svg", ancla: "/#intro" },
    { titulo: "El Páramo", icono: "/iconos/360.svg", ancla: "/#modelo" },
    { titulo: "Experto", icono: "/iconos/search.svg", ancla: "/#experto" },
    {
      titulo: "Formulario",
      icono: "/iconos/letter.svg",
      ancla: "/#formulario",
    },
    { titulo: "Plan de siembra", icono: "/iconos/book.svg", ancla: "/#plan" },
  ];

  const handleHover = (i) => {
    setactive(i);
  };
  const handleHoverLeave = () => {
    setactive(null);
  };

  return (
    <div className="fixed right-16 top-1/2 -translate-y-1/2 z-[100]">
      <div className="w-full flex flex-col gap-12">
        {navItems.map((item, i) => (
          <a
            href={item.ancla}
            key={i}
            onClick={() => setactiveNav(i)}
            onMouseEnter={() => handleHover(i)}
            onMouseLeave={handleHoverLeave}
            className={`${
              activeNav == i ? "opacity-100" : "opacity-25"
            } cursor-pointer w-full flex justify-end items-center gap-2 hover:opacity-100`}
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: active == i ? 1 : 0,
                x: active == i ? 0 : -50,
              }}
              className="font-semibold text-white"
            >
              {item.titulo}
            </motion.span>
            <figure className="w-10 h-10 inline-block">
              <img
                className="w-full h-full object-contain"
                src={item.icono}
                alt={item.titulo}
              />
            </figure>
          </a>
        ))}
      </div>
    </div>
  );
};
