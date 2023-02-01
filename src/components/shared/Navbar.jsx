import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from 'react-icons/bi';
import {  FiMail } from 'react-icons/fi';
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";


function Navbar({user,button1,button2,button0,isToggle,setIsToggle}) {
  const router = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Menu = () => {
    setTimeout(() => {
      setIsToggle(!isToggle);
    }, 200);
  };
  const handleOut = () =>{
    setSelected(0);
    dispatch(logout(user.token));
    navigate('/');
  }
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    if (router.pathname === "/favorites" ) {
      setSelected(1);
    } else if (router.pathname==="/myannonces" || (!user && router.pathname==="/signup")){
      setSelected(2);
    } else if (router.pathname==="/postAnnonce" || (!user && router.pathname==="/")){
      setSelected(3);
    }
  }, [router.pathname,user])
  
  return (
    <div className={`flex  gap-10 flex-col`}>
        <div className={`navbar  z-20  `}>
          
            <div  className="flex items-center  gap-5">
                    {!user&& <Link to={'/'} className="text-white select-none cursor-pointer font-bold">
                        LOGO
                    </Link>}
                    
                    {user && <Link onClick={()=>setSelected(0)} to={'/'} className=" flex items-center gap-2">
                      <img className="w-10 h-10 rounded-full" src={user.picture} referrerPolicy="no-referrer" alt="photodeprofil" />
                      <span className="text-lg text-white font-bold">{user.name}</span>
                    </Link>}
            </div>

            <div className="hidden md:flex gap-2 lg:gap-4" >
                {button0 && <Link onClick={()=>setSelected(1)} to={button0==="MES FAVORIS"&&"/favorites"} className={`nav-button ${selected===1?"bg-mainColor text-white":"bg-white text-mainColor"}`} >{button0}</Link>}
                {button1 && <Link onClick={()=>setSelected(2)} to={button1==="Créer COMPTE"?"/signup":"/myannonces"} className={`nav-button ${selected===2?"bg-mainColor text-white":"bg-white text-mainColor"}`}>{button1}</Link>}
                {button2 && <Link onClick={()=>setSelected(3)} to={button2==="se connecter"?"/":"/postAnnonce"} className={`nav-button ${selected===3?"bg-mainColor text-white":"bg-white text-mainColor"}`}>{button2}</Link>}
                  {user && <div className="flex items-center justify-end gap-5">
                    
                    <Link onClick={()=>setSelected(0)} to={'/messages'}>
                      <FiMail className="text-white  w-8 h-8" />
                    </Link>
                    <div className="cursor-pointer" onClick={handleOut} >
                      <BiLogOut className="text-white rotate-180 w-8 h-8"/>
                    </div>
                  </div>}
            </div>

            <div className="md:hidden" >
            {/* {user && <div className="flex items-center justify-end gap-5 mr-5">
                    <span className="text-lg text-white font-bold">{user.name}</span>
                    <img className="w-10 h-10 rounded-full" src={user.picture} alt="photodeprofil" />
                    <div className="cursor-pointer" onClick={handleOut}  >
                      <BiLogOut className="text-white rotate-180 w-8 h-8"/>
                    </div>
                  </div>} */}
              {isToggle ? (
                <div onClick={Menu} className="flex flex-col  cursor-pointer justify-center align-center md:hidden">
                  <div className="w-10 h-1 absolute rounded-full bg-[#FFFFFF] -rotate-45"></div>
                  <div className="w-10 h-1 rounded-full bg-[#FFFFFF] rotate-45"></div>
                </div>
              ) : (
                <div onClick={Menu} className="flex flex-col gap-[8px] cursor-pointer md:hidden">
                  <div className="navbar-burger"></div>
                  <div className="navbar-burger"></div>
                  <div className="navbar-burger"></div>
                </div>
              )}
            </div>
            
        </div>
        {isToggle &&
            <div className="flex md:hidden z-10 absolute top-16 left-1/2 mt-2 w-full -translate-x-1/2 flex-col gap-1  justify-start items-center " >
              {button0 && <Link onClick={()=>setSelected(1)} to={button0==="MES FAVORIS"&&"/favorites"} className="nav-button-mob">{button0}</Link>}
                {button1 && <Link onClick={()=>setSelected(2)} to={button1==="Créer COMPTE"?"/signup":"/myannonces"} className="nav-button-mob">{button1}</Link>}
                {button2 && <Link onClick={()=>setSelected(3)} to={button2==="se connecter"?"/login":"/postAnnonce"} className="nav-button-mob">{button2}</Link>}
                {user && < >
                    
                    <Link className="nav-button-mob"  to={'/messages'}>
                      Mes Messages
                    </Link>
                    <div className="cursor-pointer nav-button-mob hover:text-red-600" onClick={handleOut} >
                      Se déconnecter
                    </div>
                  </>}
            </div>
        
            }
    </div>
  )
}

export default Navbar