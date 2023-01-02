import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import AnnonceList from '../components/shared/AnnonceList'

function Favorites() {
  const [isToggle,setIsToggle] = useOutletContext();
  useEffect(() => {
    setIsToggle(false);
  
  }, [])
  
  return (
    <div
    className={`flex  items-center justify-start mx-auto container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-44 md:pt-20"}`}>
      <AnnonceList fav={true}  /> 
    </div>
  )
}

export default Favorites