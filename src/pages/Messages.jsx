import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

function Messages() {
  const [isToggle,setIsToggle] = useOutletContext();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {user,isAdmin,Messages,isLoading,isError,message} = useSelector((state)=>{
    return state.auth
  });
  const [usersInfo, setUsersInfo] = useState({})
  useEffect(() => {
    setIsToggle(false);
    if (isError) {
      console.log(message)
    }
    if (!user || isAdmin) {
      navigate('/');
    }
    for (let mes of Messages){
      if (!Object.keys(usersInfo).includes(mes.senderId)) {

      }
    }
  }, [navigate])
  if (isLoading) {
    return <Spinner />
  }
  return (
    
    <>
     <div className='h-[90vh] w-full'>
        <div className='flex font-semibold justify-between items-center px-4 py-2 m-4'>
            <div>    </div>
            <div>FullName</div>
            <div>Date</div>
            <div>Email</div>
            <div>Content</div>
            <div>Confirmed</div>
        </div>
        <hr />
        <div className='overflow-x-hidden overflow-y-scroll max-h-[83vh] h-full'>
            {Messages.map((elem,index) => (
                <div key={elem._id} className="flex justify-between items-center px-4 py-3 m-4 bg-white rounded-2xl">
                    <div className='rounded-full overflow-hidden bg-[#3CB79F] w-10 h-10'>
                        <img src={elem.picture} alt="patient" className='text-green-500' height="100%" layout="responsive" objectFit="contain"/>
                    </div>
                    <div className='text-lg font-semibold flex gap-1'>
                        <p>{elem.firstname + " "}</p>
                        <p>{elem.lastname}</p>
                    </div>
                    <div className='text-lg font-semibold'>
                        <p>{(elem.date)}</p>
                    </div>
                    <div className='text-lg font-semibold'>
                        <p className='flex gap-1 items-center'><MdEmail className='text-gray-400'/>{elem.email}</p>
                        {/* <p className='flex gap-1 items-center'><BsFillTelephoneFill className='text-gray-400'/>{elem.phone}</p> */}
                    </div>
                    <div className='text-lg font-semibold'>
                        <p className='flex gap-1 items-center'>{elem.content}</p>
                    </div>
                </div>
            ))}
            
        </div>

    </div>
    </>
  )
}

export default Messages