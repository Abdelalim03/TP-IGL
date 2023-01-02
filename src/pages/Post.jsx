import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

function Post() {
  const [isToggle,setIsToggle] = useOutletContext();
  useEffect(() => {
    setIsToggle(false);
  
  }, [])
  return (
    <div className='h-screen  '>Post</div>
  )
}

export default Post