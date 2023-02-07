import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import AnnonceList from '../components/shared/AnnonceList'
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../features/annonces/annonceSlice';
import Spinner from '../components/shared/Spinner';

function Favorites() {
  const [isToggle,setIsToggle] = useOutletContext();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {favourites, isLoading, isError, message} = useSelector((state)=>{
    return state.annonce
  });
  const {user,isAdmin} = useSelector((state)=>{
    return state.auth
  });
  const [annonces, setAnnonces] = useState([])
  const [wait,setWait] = useState(false);
  useEffect(() => {
    setIsToggle(false);
    if (isError) {
      console.log(message)
    }
    if (!user || isAdmin) {
      navigate('/');
    }

    if (!annonces?.length && !wait && !isLoading) dispatch(getFavourites())
    if (!annonces?.length){
       setAnnonces(favourites)
       if (!annonces?.length) setWait(true);
    }
  }, [navigate,favourites])
  if (isLoading && annonces?.length===0) {
    return <Spinner />
  }
  return (
    <div
    className={`flex  items-center justify-start mx-auto container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-60 md:pt-20"}`}>
     {annonces?.length>0 && <AnnonceList  search={false}   annonces={annonces} setAnnonces={setAnnonces}  /> }
    </div>
  )
}

export default Favorites