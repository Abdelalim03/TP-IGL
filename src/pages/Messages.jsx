import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { messages } from '../features/annonces/annonceSlice';
import Spinner from '../components/shared/Spinner';

function Messages() {
  const [isToggle,setIsToggle] = useOutletContext();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {Messages,isLoading,isError,message} = useSelector((state)=>{
    return state.annonce
  });
  const {user,isAdmin} = useSelector((state)=>{
    return state.auth
  });
  const [Message,setMessage] =  useState([])
  useEffect(() => {
    setIsToggle(false);
    if (isError) {
      console.log(message)
    }
    if (!user || isAdmin) {
      navigate('/');
    }
    if (!Message?.length) dispatch(messages());
    if (!Message?.length)  setMessage(Messages)
    
    
  }, [navigate,isLoading])
  if (isLoading ) {
    return <Spinner />
  }
  return (
    
    <div className={`flex  items-start justify-start mx-auto w-full container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-60 md:pt-20"}`}>
      {Message?.length && <div className='w-full' >
        <div className='flex font-semibold w-full  justify-start gap-44 items-center px-4 py-2 m-4'>
            
            <div>Nom d'Utilisateur</div>
            <div>Date</div>
            <div>Email</div>
            <div className='ml-7' >Annonce</div>
            <div >Message</div>
            
        </div>
        
        <div className='  h-full'>
            {Message.map((elem,index) => (
                <>
                  <hr />
                  <div key={elem.id} className="flex justify-start   w-full items-center gap-28 px-4 py-2 m-4 bg-white rounded-2xl">
                      {/* <div className='rounded-full  w-12 h-12'>
                          <img src={elem.info.picture} alt="user" className='rounded-full'  height="100%" layout="responsive" />
                      </div> */}
                      <div className='text-lg font-semibold flex gap-1'>
                          <p>{elem.info.name}</p>
                      </div>
                      <div className='text-lg '>
                          <p>{ new Date(elem.date).getDate()+'/'+(new Date(elem.date).getMonth()+1)+'/'+new Date(elem.date).getFullYear()}</p>
                      </div>
                      <div className='text-lg '>
                          <p className='flex gap-1 items-center'><MdEmail className='text-gray-400'/>{elem.info.email}</p>
                      </div>
                      <div className='text-lg text-mainColor font-semibold select-none cursor-pointer '>
                          <Link to={'annonces/'+elem.annonceid} className='flex gap-1 items-center'>Annnonce {/*elem.title.slice(0,20)*/ elem.annonceid}</Link>
                      </div>
                      <div className='ml-7 text-lg '>
                          <pre className='flex gap-1 items-center'>{elem.content}</pre>
                      </div>
                      
                  </div>
                  
                </>
            ))}
            
        </div>
    </div>}
    </div>

     
  )
}

export default Messages