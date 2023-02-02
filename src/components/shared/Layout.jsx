import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import { login } from "../../features/auth/authSlice";
import { getAllAnnonces, getFavourites, mesAnnonces } from "../../features/annonces/annonceSlice";
import jwtDecode from "jwt-decode";

function Layout() {
    const {isAdmin,user,isError,isLoading,message} = useSelector((state)=>state.auth);
    const [isToggle, setIsToggle] = useState(false);
    const nav = useNavigate();
    

    // const [isAdmin, setIsAdmin] = useState(user?.token && process.env.REACT_APP_ADMINS.includes(jwtDecode(user?.token).sub))
    const dispatch = useDispatch();
    useEffect(()=>{
      if (isError) {
        console.log(message)
      }
      if(localStorage.getItem('user')==null){
        const query = new URLSearchParams(window.location.search);
        const token=query.get('jwt')

        if(token){
          dispatch(login(token));

          if(isAdmin){
            dispatch(getAllAnnonces())
            
          }else{
            dispatch(getFavourites())
            dispatch(mesAnnonces())
          }
          // while(!user){
          //   console.log("kkk");
          // } ;
          nav('/')
        }
      }else{
        if(isAdmin){
            dispatch(getAllAnnonces())
            
          }else{
            dispatch(getFavourites())
            dispatch(mesAnnonces())
            
          }
      }
    },[dispatch,nav,isAdmin])
  return (
    <>
        {!isLoading &&<>
          <Navbar isToggle={isToggle} isAdmin={isAdmin} user={user} setIsToggle={setIsToggle} button0={ isAdmin?"Toutes Les annonces":user &&"MES FAVORIS"} button1={isAdmin?null :(user ?"MES ANNONCES":"Créer COMPTE")} button2={isAdmin?null :(user ?"PUBLIER ANNONCE":"se connecter")} />
          <Outlet  context={[isToggle,setIsToggle]} />
        </>}
    </>
  )
}

export default Layout