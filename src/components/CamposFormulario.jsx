import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Ajusta la ruta según la ubicación de firebaseConfig.js

export const CamposFormulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  // Usamos useWatch para vigilar el estado del checkbox en tiempo real
  const aceptaTerminos = useWatch({
    control,
    name: "terminos",
    defaultValue: false,
  });

  const onSubmit = async (data) => {
    // Convertir edad a número
    data.edad = parseInt(data.edad, 10);
    
    try {
      await addDoc(collection(db, "formularios"), data);
      alert("Formulario enviado");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el formulario");
    }
  };  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto space-y-4 p-4 rounded w-full"
    >
      <input
        {...register("nombre", { required: "El nombre es obligatorio" })}
        placeholder="Nombre"
        className="w-full border border-[#ffffff30] p-2 rounded bg-transparent"
      />
      {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}

      <input
        {...register("ciudad", { required: "La ciudad es obligatoria" })}
        placeholder="Ciudad"
        className="w-full border border-[#ffffff30] p-2 rounded bg-transparent"
      />
      {errors.ciudad && <p className="text-red-500">{errors.ciudad.message}</p>}

      <input
        {...register("whatsapp", {
          required: "El número de WhatsApp es obligatorio",
          pattern: {
            value: /^[0-9]{10,15}$/,
            message: "Solo números, entre 10 y 15 dígitos",
          },
        })}
        placeholder="Número de WhatsApp"
        className="w-full border border-[#ffffff30] p-2 rounded bg-transparent"
      />
      {errors.whatsapp && (
        <p className="text-red-500">{errors.whatsapp.message}</p>
      )}

      <input
        type="number"
        {...register("edad", {
          required: "La edad es obligatoria",
          min: { value: 18, message: "Debes ser mayor de 18 años" },
          max: { value: 99, message: "Edad máxima permitida: 99" },
        })}
        placeholder="Edad"
        className="w-full border border-[#ffffff30] p-2 rounded bg-transparent"
      />
      {errors.edad && <p className="text-red-500">{errors.edad.message}</p>}

      <input
        type="email"
        {...register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de email inválido",
          },
        })}
        placeholder="Correo Electrónico"
        className="w-full border border-[#ffffff30] p-2 rounded bg-transparent"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <textarea
        placeholder="Cuéntanos por qué quieres ser un Guardián"
        {...register("mensaje", { required: "El mensaje es obligatorio" })}
        className="w-full border border-[#ffffff30] p-2 rounded bg-transparent"
        rows="4"
      />
      {errors.mensaje && (
        <p className="text-red-500">{errors.mensaje.message}</p>
      )}

      {/* Checkbox de Términos y Condiciones */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("terminos", { required: "Debes aceptar los términos" })}
          className="w-5 h-5"
        />
        <label className="text-xs text-[#9b9a9a]">
          Autorizo el tratamiento de mis datos personales para la finalidad
          descrita en la{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://interrapidisimo.com/proteccion-de-datos-personales/"
            className="underline"
          >
            Política de tratamiento de datos Personales de Inter Rapidísimo.
          </a>
        </label>
      </div>
      {errors.terminos && (
        <p className="text-red-500">{errors.terminos.message}</p>
      )}

      <button
        type="submit"
        disabled={!aceptaTerminos}
        className={`w-full group cursor-pointer flex justify-center items-center gap-5 z-50 xs:text-xs lg:text-base border font-bold font-Manrope tracking-[0.3em] rounded-lg py-2 lg:px-16 mt-4 ${
          aceptaTerminos
            ? "md:bg-black md:bg-opacity-40 hover:bg-white hover:text-black text-white"
            : "opacity-10 cursor-not-allowed"
        }`}
      >
        ÚNETE
      </button>
    </form>
  );
};
