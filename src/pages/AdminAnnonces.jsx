import React, { useEffect } from 'react'
import Spinner from '../components/shared/Spinner';
import AnnonceList from '../components/shared/AnnonceList';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function AdminAnnonces() {
    const [isToggle,setIsToggle] = useOutletContext();
    const navigate = useNavigate();
    const {annonces, isLoading, isError, message} = useSelector((state)=>{
      return state.annonce
    });
    const {isAdmin,user} = useSelector((state)=>{
      return state.auth
    });
    useEffect(() => {
      setIsToggle(false);
      if (isError) {
        console.log(message)
      }
      if (!user || !isAdmin) {
        navigate('/');
      }

    }, [navigate])
    if (isLoading) {
      return <Spinner />
    }
    return (
      <div
      className={`flex  items-center justify-start mx-auto container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-60 md:pt-20"}`}>
       {annonces?.length>0 && <AnnonceList isAdmin={true}  annonces={annonces}  /> }
      </div>
    )
}

export default AdminAnnonces