import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate();
  const handleClick = () =>{
    localStorage.setItem("user",JSON.stringify("Abdelalim"));
    navigate("/");
  }
  return (
    <div className='flex justify-center mt-16 md:mt-20 items-center h-[calc(100vh-80px)]'>
        <div className='flex flex-col shadow-xl rounded-3xl h-2/5 w-2/5'>
            <div className='bg-[#104A7A] text-center px-5 md:px-10 pt-2 text-white h-1/5 rounded-t-3xl text-xl md:text-2xl lg:text-3xl font-semibold'>Créer un compte</div>
            <div className='text-[#7A7474] h-4/5 flex flex-col justify-center mb-5 gap-6 items-center'>
                <p className='font-semibold w-[80%] text-sm md:text-base text-center'>Créer un compte avec votre compte <span className='underline'>Google</span> </p>
                <button onClick={handleClick} className='flex justify-center border-2 hover:border-black transition-all delay-100 duration-200 rounded-xl px-4 py-3 items-center gap-2'>
                    <img className='inline-block ' src={require("../assets/google.png")} alt="google" /> <span  className='font-bold'>Google</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Signup