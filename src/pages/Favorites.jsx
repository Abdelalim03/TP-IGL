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
  const {user} = useSelector((state)=>{
    return state.auth
  });
  const [annonces, setAnnonces] = useState([])
  useEffect(() => {
    setIsToggle(false);
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/');
    }
    if (!annonces.length)setAnnonces(favourites)
  }, [navigate])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div
    className={`flex  items-center justify-start mx-auto container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-60 md:pt-20"}`}>
     {annonces?.length>0 && <AnnonceList fav={true}   annonces={annonces} setAnnonces={setAnnonces}  /> }
    </div>
  )
}

export default Favorites