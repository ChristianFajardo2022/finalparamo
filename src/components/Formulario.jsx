import { CamposFormulario } from "./CamposFormulario";

export const Formulario = () => {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center text-white relative overflow-auto px-5"
      style={{
        backgroundImage: "url('/background-form.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-[#000000a8] backdrop-blur-xl z-0 inline-block" />

      <div className="z-10 lg:w-[80%] xs:w-full bg-[#000000a8] mx-auto rounded-2xl h-[90vh] flex flex-col justify-center items-center">
        <h2 className="font-Tusker md:text-7xl xs:text-3xl text-center lg:leading-tight">
          HAZTE GUARDIAN DEL PARAMO AQUÍ:
        </h2>
        <div className="lg:w-[26rem] xs:w-full max-lg:text-xs">
          <CamposFormulario />
        </div>
      </div>
    </div>
  );
};
