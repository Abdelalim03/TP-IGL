import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import { login } from "../../features/auth/authSlice";
import { getFavourites, mesAnnonces } from "../../features/annonces/annonceSlice";

function Layout() {
    const {user,isError,isLoading,message} = useSelector((state)=>state.auth);
    const [isToggle, setIsToggle] = useState(false);
    const nav = useNavigate();

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
          dispatch(getFavourites())
          dispatch(mesAnnonces())
          nav('/')
        }
      }else{
        dispatch(getFavourites())
        dispatch(mesAnnonces())
      }
    },[dispatch,nav])
  return (
    <>
        {!isLoading &&<>
          <Navbar isToggle={isToggle} user={user} setIsToggle={setIsToggle} button0={user &&"MES FAVORIS"} button1={user ?"MES ANNONCES":"Créer COMPTE"} button2={user ?"PUBLIER ANNONCE":"se connecter"} />
          <Outlet  context={[isToggle,setIsToggle,user]} />
        </>}
    </>
  )
}

export default Layout