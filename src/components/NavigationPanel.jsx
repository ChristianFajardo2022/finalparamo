import { useNavigate } from "react-router-dom";

function NavigationPanel() {

  return (
    <div className=" w-48 h-full absolute font-Manrope right-0 top-1/2 transform -translate-y-1/2 z-[80] flex flex-col items-center justify-center gap-20 mr-10 text-white  menuLateral">
      <button
        className="w-full flex items-center justify-end text-transparent hover:text-white"
        onClick={() => navigate("/")}
      >
        El páramo
        <img
          className="w-12 ml-2"
          src="/botoneslaterales/paramo3d.svg"
          alt="Paramo 3d"
        />
      </button>
      <button
        className="w-full flex items-center justify-end text-transparent hover:text-white"
        onClick={() => navigate("/experto")}
      >
               Experto
        
        <img
          className="w-12 ml-2"
          src="/botoneslaterales/experto.svg"
          alt="Experto"
        />
      </button>
{/*       <button
        className="w-full flex items-center justify-end leading-5 text-transparent hover:text-white"
        onClick={() => navigate("/charlas")}
      >
                Charlas que sanan
        
        <img
          className="w-10 ml-2"
          src="/botoneslaterales/charlas.svg"
          alt="Charlas"
        />
      </button>
 */}      <button className="w-full flex items-center justify-end leading-5 text-transparent hover:text-white"
       onClick={() => navigate("/plan")}
      >
                Plán de siembra
         
        <img
          className="w-10 ml-2"
          src="/botoneslaterales/plan.svg"
          alt="Plan de siembra"
        />
      </button>
    </div>
  );
}

export default NavigationPanel;
