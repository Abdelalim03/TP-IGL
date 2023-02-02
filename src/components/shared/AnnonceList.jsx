import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import leftArrow from '../../assets/arrowcircleleft.svg';
import rightArrow from '../../assets/arrowcircleright.svg';
import heart from '../../assets/heart.svg';
import close from '../../assets/close.svg';
import house from '../../assets/house.svg';
import redHeart from '../../assets/redHeart.svg';
import "swiper/css";
import { Navigation,FreeMode } from "swiper";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteAnnonce, deleteFavorite } from '../../features/annonces/annonceSlice';
import jwtDecode from 'jwt-decode';

function AnnonceList({isAdmin,annonces,setAnnonces,search}) {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth);
    const {favourites} = useSelector((state)=>state.annonce);
    const [message, setMessage] = useState("");

    const handleFav =(id)=>{
      if (favourites?.some(fav=>JSON.stringify(fav)===JSON.stringify(id))){
        dispatch(deleteFavorite(id.id));

        if (!search)
          setAnnonces(annonces?.filter(annonce=>annonce.id!==id.id))
      }else{
        dispatch(addFavorite(id.id))
        if (!search)
        setAnnonces([...annonces,id])
      }
    }
    const handleDelete = (id)=>{
      dispatch(deleteAnnonce(id))
      setAnnonces(annonces.filter(annonce=>annonce.id!==id));
    }
    const sendMessage = async(content,id) =>{
      const res= await axios.post("http://localhost:5000/sendmsg",{
        annonceid:id,
        content:content
      },
      {
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${user.token}`
        }
      });

      if (res.data.ok) setMessage('');
    }
    
   const cards = annonces?.map(annonce=>
        (<div key={annonce.id} className='bg-[#E9E9E9] relative  border-[1px] h-[350px] w-full border-[#888282] rounded-xl flex flex-col md:flex-row shadow-lg  '>
           <div className="w-full relative min-h-fit  md:w-1/3">
             <Swiper className='h-auto md:h-full '  navigation={{
               enabled:true,
               nextEl: ".image-swiper-button-next",
               prevEl: ".image-swiper-button-prev",
               disabledClass: "swiper-button-disabled"
               }}  modules={[Navigation,FreeMode]} freeMode={true}>
                <div className="swiper-button image-swiper-button-prev">
                  <img src={leftArrow} alt="left" />
                </div>
                <div className="swiper-button image-swiper-button-next">
                  <img  src={rightArrow} alt="right" />
                </div>
                
                   { annonce.pics?.map((img,idx)=>
                   
                     {
                     return <SwiperSlide key={img+idx} > 
                         <img className= 'rounded-t-lg md:rounded-t-none md:rounded-l-lg  w-full h-full' src={annonce.userId===-1?''+img:'http://localhost:5000'+img} alt={"image"+idx} />
                     </SwiperSlide>}
                     )}
                  {(!annonce.pics || annonce.pics.length===0) &&
                    <SwiperSlide  >      
                        <img className= 'rounded-t-lg md:rounded-t-none md:rounded-l-lg   h-full' src={require("../../assets/dar.jpeg")} alt={"imagee"} />
                    </SwiperSlide>
                  }
                 
             </Swiper>
             <div className='absolute right-0 top-0 rounded-tr-lg md:rounded-tr-none rounded-bl-3xl z-10 bg-[#00AFCA] px-4 py-2 text-white shadow-lg'>{annonce.price +" DA"}</div>
             {!isAdmin && jwtDecode(user.token).sub!==annonce.userId &&<div onClick={()=>handleFav(annonce)} className='absolute z-10 cursor-pointer flex justify-center items-center bg-[#FFFFFFCC] top-3  left-3  p-2 w-9 h-9 rounded-full'>
                    <img src={favourites?.some(fav=>{return JSON.stringify(fav)===JSON.stringify(annonce)})?redHeart: heart} alt="" />
                </div>}
           </div>
            
            <div className=' relative md:w-2/3 mb-16  leading-loose p-5'>
                 <Link to={'/annonces/'+annonce.id} className='text-mainColor font-bold text-xl cursor-pointer'>{annonce.title}</Link>
                 <p className='text-navbar font-bold text-lg'>{annonce.type}</p>
                 <p className='text-lg font-semibold text-[#514F4D]'>{annonce.category}</p>
                 <p className='text-lg font-semibold text-[#514F4D]'>{annonce.space}</p>
                 <p className='text-lg font-semibold text-[#514F4D]'>{annonce.localisation}</p>
                 <p className='text-lg text-[#807D7C]'>{annonce.description.length<=300?annonce.description:annonce.description.substring(0,300)+"..."}</p>
                 
            </div>
            {!isAdmin && <label  htmlFor={"confirm-modal"+annonce.id} className={` absolute bottom-5 w-fit  left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto  md:right-5 cursor-pointer px-6 py-3 ${jwtDecode(user.token).sub!==annonce.userId?"bg-mainColor":"bg-red-600"} font-semibold uppercase text-white rounded-[56px]`}>{jwtDecode(user.token).sub!==annonce.userId?"Contacter":"Suppprimer"}</label>}
            <input type="checkbox" id={"confirm-modal"+annonce.id} className="modal-toggle" />
            <div  className="modal">
              <label className={`relative  overflow-visible modal-box ${jwtDecode(user.token).sub===annonce.userId ?"h-fit":"h-2/5"}  flex flex-col justify-between items-center  bg-white border-2 border-[#888282] rounded-xl`} htmlFor="">
                {jwtDecode(user.token).sub!==annonce.userId &&
                <>
                  <label onClick={()=>setMessage("")} className='cursor-pointer' htmlFor={"confirm-modal"+annonce.id}><img className='absolute w-8 -right-3.5 -top-3.5'  src={close} alt="fermer" /></label> 
                  <img className='absolute w-20 -top-12 left-1/2 -translate-x-1/2' src={house} alt="fermer" />
                  <p className='text-xl font-bold mt-2 text-[#575656]'>Contacter l'annonceur</p>
                  <textarea value={message} onChange={(e)=>setMessage(e.target.value)} name="title" id="tit"  className="bg-[#E9E9E9] focus:ring-0 focus:border-[#888282] mt-4  text-[#7C8287] h-full w-full p-3 resize-none border-2 border-[#888282] rounded-xl outline-none "   placeholder="Envoyer message d'offre à l'annonceur" ></textarea>
                </>}
                {
                  jwtDecode(user.token).sub===annonce.userId &&
                  <>
                    <h2>Vous etes sur que vous voulez supprimer cette annonce </h2>
                  </>
                }
                <div className=" modal-action">
                  <label onClick={
                    ()=> {
                      jwtDecode(user.token).sub===annonce.userId ? handleDelete(annonce.id):
                   (message.length)&& sendMessage(message,annonce.id);
                    }
                  } htmlFor={"confirm-modal"+annonce.id}  className={`cursor-pointer rounded-[56px] px-6 py-2 text-white font-semibold border-none ${jwtDecode(user.token).sub!==annonce.userId?"bg-mainColor":"bg-red-600"} `}>{jwtDecode(user.token).sub!==annonce.userId?"Envoyer":"Suppprimer"}</label>
                   {jwtDecode(user.token).sub===annonce.userId &&<label htmlFor={"confirm-modal"+annonce.id}  className="cursor-pointer rounded-[56px] px-6 py-2 text-white font-semibold border-none bg-slate-400"> Annuler</label>}
                </div>
              </label>
            </div>
        </div>
        
        )
    )
  return (
    <div className='flex flex-col gap-10 w-[95%] md:w-[75%] lg:w-[65%]  justify-center items-center md:items-start'>
        
        {cards}
        
    </div>
  )
}

export default AnnonceList