import { useState } from "react";
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Layout() {
    const {user} = useSelector((state)=>state.auth);
    const [isToggle, setIsToggle] = useState(false);
  return (
    <>
        <Navbar isToggle={isToggle} setIsToggle={setIsToggle} button0={user &&"MES FAVORIS"} button1={user ?"MES ANNONCES":"Créer COMPTE"} button2={user ?"PUBLIER ANNONCE":"se connecter"} />
        <Outlet  context={[isToggle,setIsToggle,user]} />
    </>
  )
}

export default Layout