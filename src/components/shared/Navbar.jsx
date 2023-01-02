import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({button1,button2,button0,isToggle,setIsToggle}) {
  
    
  const Menu = () => {
    setTimeout(() => {
      setIsToggle(!isToggle);
    }, 200);
  };
  return (
    <div className={`flex  gap-10 flex-col`}>
        <div className={`navbar  z-10  `}>
            <div className="text-white font-bold">
                LOGO
            </div>
            <div className="hidden md:flex gap-2 lg:gap-4" >
                {button0 && <Link to={button0==="MES FAVORIS"&&"/favorites"} className="nav-button">{button0}</Link>}
                {button1 && <Link to={button1==="Créer COMPTE"?"/signup":"/myannonces"} className="nav-button">{button1}</Link>}
                {button2 && <Link to={button2==="se connecter"?"/login":"/postAnnonce"} className="nav-button">{button2}</Link>}
            </div>
            <div className="md:hidden" onClick={Menu}>
              {isToggle ? (
                <div className="flex flex-col  cursor-pointer justify-center align-center md:hidden">
                  <div className="w-10 h-1 absolute rounded-full bg-[#FFFFFF] -rotate-45"></div>
                  <div className="w-10 h-1 rounded-full bg-[#FFFFFF] rotate-45"></div>
                </div>
              ) : (
                <div className="flex flex-col gap-[8px] cursor-pointer md:hidden">
                  <div className="navbar-burger"></div>
                  <div className="navbar-burger"></div>
                  <div className="navbar-burger"></div>
                </div>
              )}
            </div>
            
        </div>
        {isToggle &&
            <div className="flex md:hidden absolute top-16 left-1/2 mt-4 w-full -translate-x-1/2 flex-col gap-1  justify-start items-center " >
              {button0 && <Link to={button0==="MES FAVORIS"&&"/favorites"} className="nav-button-mob">{button0}</Link>}
                {button1 && <Link to={button1==="Créer COMPTE"?"/signup":"/myannonces"} className="nav-button-mob">{button1}</Link>}
                {button2 && <Link to={button2==="se connecter"?"/login":"/postAnnonce"} className="nav-button-mob">{button2}</Link>}
            </div>
        
            }
    </div>
  )
}

export default Navbar