import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { scrapAnnonces } from '../features/annonces/annonceSlice';
import AnnonceList from '../components/shared/AnnonceList';
import Spinner from '../components/shared/Spinner';

function Admin() {
  const [isToggle,setIsToggle] = useOutletContext();
  const {myAnnonces, isLoading, isError, message} = useSelector((state)=>{
    return state.annonce
  });
  const {isAdmin,user} = useSelector((state)=>{
    return state.auth
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e)=>{
    dispatch(scrapAnnonces());
  }
  useEffect(() => {
    setIsToggle(false);
      if (isError) {
        console.log(message)
      }
      if (!user || !isAdmin) {
        navigate('/');
      }
  }, [navigate,myAnnonces])
  
  return (
    <div  className={`flex flex-col items-center justify-start py-20 min-h-[calc(100vh-64px)]  md:min-h-[calc(100vh-80px)] mt-16 md:mt-20 ${isToggle&&"pt-44"}`}>
      <button disabled={myAnnonces? myAnnonces?.length:false} onClick={handleClick}
       className={`${(myAnnonces && myAnnonces?.length)?"bg-mainColor":"hover:bg-[#127281] bg-[#00AFCA]"}  text-white font-bold text-xl text-center w-96 rounded-2xl max-w-sm px-8 mb-20 py-6`}>{myAnnonces?.length?"Opération Réussi":"Récupérer les annonces des autres sites"}</button>
        {(isLoading) && <Spinner />} 
    
        {myAnnonces?.length>0 && <AnnonceList isAdmin={true}  annonces={myAnnonces}  /> }
        
    </div>
  )
}

export default Admin