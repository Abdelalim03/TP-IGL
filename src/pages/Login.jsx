import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [isAdmin, setIsAdmin] = useState(false);
    const {user} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    useEffect(() => {
      if (user) navigate('/');
    
      
    }, [])
    
  return (
    <div className='flex justify-center mt-16 md:mt-20 flex-col gap-10 items-center h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]'>
    <div className='flex flex-col shadow-xl rounded-3xl h-2/5 w-3/5 md:w-2/5'>
        <div className='bg-mainColor text-center px-5 md:px-10 pt-4 text-white h-1/4 rounded-t-3xl text-xl md:text-2xl lg:text-3xl font-semibold'>Se connecter</div>
        <div className='relative text-[#7A7474] h-3/4 flex flex-col justify-start md:justify-center mb-5 gap-5 items-center'>
            <p className='font-semibold w-[80%] text-sm mt-5 md:mt-0 md:text-base text-center'>Connectez-vous avec votre compte <span className='underline'>Google</span> </p>
            <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}  className='flex justify-center border-2 max-w-sm hover:border-black transition-all delay-100 duration-200 rounded-xl px-4 py-3 items-center gap-2'>
                <img className='inline-block ' src={require("../assets/google.png")} alt="google" /> <span className='font-bold'>Google</span>
            </a>
            <p className='absolute bottom-0 font-semibold w-[80%] text-sm md:text-base text-center'>Vous-êtes un <span onClick={()=>setIsAdmin(!isAdmin)} className='underline cursor-pointer'>{!isAdmin ? "administrateur" :"utilisateur"}</span> ?</p>
        </div>
    </div>
    {!isAdmin &&
      <div className='flex flex-col justify-center text-center items-center gap-5'>
        <p className='text-[#105186] font-semibold text-xl md:text-3xl'>Créez un compte utilisateur</p>
        <Link to="/signup" className='act-button px-5 py-3 w-fit'>Créer</Link>
      </div>}
</div>
  )
}

export default Login