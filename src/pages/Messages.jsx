import { Spinner } from 'flowbite-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Messages() {
  const [isToggle,setIsToggle] = useOutletContext();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {user,isAdmin,Messages,isLoading,isError,message} = useSelector((state)=>{
    return state.auth
  });
  useEffect(() => {
    setIsToggle(false);
    if (isError) {
      console.log(message)
    }
    if (!user || isAdmin) {
      navigate('/');
    }
  }, [navigate])
  if (isLoading) {
    return <Spinner />
  }
  return (
    
    <div className='pt-20'>
        Mes messages
        {Messages?.map(message=>console.log(message))}
    </div>
  )
}

export default Messages