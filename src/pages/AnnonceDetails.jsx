import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

function AnnonceDetails() {
  const [isToggle,setIsToggle] = useOutletContext();
  useEffect(() => {
    setIsToggle(false);
  
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default AnnonceDetails