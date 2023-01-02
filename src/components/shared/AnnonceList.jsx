import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import leftArrow from '../../assets/arrowcircleleft.svg';
import rightArrow from '../../assets/arrowcircleright.svg';
import heart from '../../assets/heart.svg';
import close from '../../assets/close.svg';
import house from '../../assets/house.svg';
import redHeart from '../../assets/redHeart.svg';
  // import Swiper and modules styles

  import "swiper/css";
//   import "swiper/css/navigation";
import { Navigation,FreeMode } from "swiper";
import { Link } from 'react-router-dom';
import axios from 'axios';

function AnnonceList({fav,mine,favorites}) {
    const [annonces, setAnnonces] = useState([
        {
            id:1,
            title:"Maison à louer a Oued Smar",
            description:"LA MAISON EST COMPOSEE DE PLUSIEURES PIECES SPACISUESES POUR HABITATION OU USAGE COMMERCIALE (atelier,créche ,bureaux ,boulangerie ,;;;;) avec un espace vert",
            imgs:["../../assets/home_immo.png","../../assets/home_immo.png"],
            type:"maison",
            surface:"120 m2",
            categorie:"echange",
            localisation:"harrach",
            prix:10.7
    
        },
        {
            id:2,
            title:"Piscine à louer a Oued Smar",
            description:"LA MAISON EST COMPOSEE DE PLUSIEURES PIECES SPACISUESES POUR HABITATION OU USAGE COMMERCIALE (atelier,créche ,bureaux ,boulangerie ,;;;;) avec un espace vert",
            imgs:["../../assets/home_immo.png","../../assets/home_immo.png","../../assets/home_immo.png","../../assets/home_immo.png"],
            type:"piscine",
            surface:"120 m2",
            categorie:"vente",
            localisation:"oued smar",
            prix:10.7
    
        },
        {
          id:3,
          title:"Maison à louer a Oued Smar",
          description:"LA MAISON EST COMPOSEE DE PLUSIEURES PIECES SPACISUESES POUR HABITATION OU USAGE COMMERCIALE (atelier,créche ,bureaux ,boulangerie ,;;;;) avec un espace vert",
          imgs:["../../assets/home_immo.png","../../assets/home_immo.png"],
          type:"maison",
          surface:"120 m2",
          categorie:"echange",
          localisation:"harrach",
          prix:10.7
  
      },
      {
          id:4,
          title:"Piscine à louer a Oued Smar",
          description:"LA MAISON EST COMPOSEE DE PLUSIEURES PIECES SPACISUESES POUR HABITATION OU USAGE COMMERCIALE (atelier,créche ,bureaux ,boulangerie ,;;;;) avec un espace vert",
          imgs:["../../assets/home_immo.png","../../assets/home_immo.png","../../assets/home_immo.png","../../assets/home_immo.png"],
          type:"piscine",
          surface:"120 m2",
          categorie:"vente",
          localisation:"oued smar",
          prix:10.7
  
      }
    ]);
    const [favourites, setFavourites] = useState(favorites||[]);
    const [message, setMessage] = useState("");
    const handleFav =(id)=>{
      console.log(favourites);
      if (favourites.includes(id)){
        setFavourites(favourites.filter(item=>item!==id));
      }else{
        setFavourites([...favourites,id])
      }
    }
    const handleDelete = (id)=>{
      setAnnonces(annonces.filter(annonce=>annonce.id!==id));
    }
    const sendMessage = async(content,id) =>{
      const res= await axios.post("http://localhost:5000/sendmsg",{
        annonceid:id,
        content:content
      },
      {
        headers:{
          "Content-Type":"application/json"
        }
      });

      if (res.data.ok) setMessage('');
    }
   const card = annonces.map(annonce=>
        (<div key={annonce.id} className='bg-[#E9E9E9]  border-[1px] w-full border-[#888282] rounded-xl flex flex-col md:flex-row shadow-lg  '>
           <div className="w-full md:w-1/3">
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
                
                
                   { annonce.imgs.map((img,idx)=>
                     <SwiperSlide key={img+idx} >
                          {fav &&<div onClick={()=>handleFav(annonce.id)} className='absolute cursor-pointer flex justify-center items-center bg-[#FFFFFFCC] top-3 left-3 p-2 w-9 h-9 rounded-full'>
                              <img src={favourites.includes(annonce.id)?redHeart: heart} alt="" />
                          </div>}
                          <div className='absolute right-0 rounded-tr-lg md:rounded-tr-none rounded-bl-3xl z-10 bg-[#00AFCA] px-4 py-2 text-white shadow-lg'>{annonce.prix +" DA"}</div>
                          <div className='absolute left-10 top-10 w-10 h-10 p-1 rounded-full flex justify-center items-center'></div>
                         <img className= 'rounded-t-lg md:rounded-t-none md:rounded-l-lg   h-full' src={require("../../assets/home_immo.png")} alt={"image"+idx} />
                     </SwiperSlide>
                     )}
                 
                 
             </Swiper>
           </div>
            
            <div className=' md:w-2/3 leading-loose p-5'>
                 <Link to={'/annonces/'+annonce.id} className='text-mainColor font-bold text-xl cursor-pointer'>{annonce.title}</Link>
                 <p className='text-navbar font-bold text-lg'>{annonce.type}</p>
                 <p className='text-lg text-[#514F4D]'>{annonce.categorie}</p>
                 <p className='text-lg text-[#514F4D]'>{annonce.surface}</p>
                 <p className='text-lg text-[#514F4D]'>{annonce.position}</p>
                 <p className='text-lg text-[#807D7C]'>{annonce.description}</p>
                 {<label  htmlFor={"confirm-modal"+annonce.id} className={`float-right mt-3 cursor-pointer px-6 py-3 ${!mine?"bg-mainColor":"bg-red-600"} font-semibold uppercase text-white rounded-[56px]`}>{!mine?"Contacter":"Suppprimer"}</label>}
            </div>
            <input type="checkbox" id={"confirm-modal"+annonce.id} className="modal-toggle" />
            <div  className="modal">
              <label className={`relative  overflow-visible modal-box ${mine ?"h-fit":"h-2/5"}  flex flex-col justify-between items-center  bg-white border-2 border-[#888282] rounded-xl`} htmlFor="">
                {!mine &&
                <>
                  <label onClick={()=>setMessage("")} className='cursor-pointer' htmlFor={"confirm-modal"+annonce.id}><img className='absolute w-8 -right-3.5 -top-3.5'  src={close} alt="fermer" /></label> 
                  <img className='absolute w-20 -top-12 left-1/2 -translate-x-1/2' src={house} alt="fermer" />
                  <p className='text-xl font-bold mt-2 text-[#575656]'>Contacter l'annonceur</p>
                  <textarea value={message} onChange={(e)=>setMessage(e.target.value)} name="title" id="tit"  className="bg-[#E9E9E9] focus:ring-0 focus:border-[#888282] mt-4  text-[#7C8287] h-full w-full p-3 resize-none border-2 border-[#888282] rounded-xl outline-none "   placeholder="Envoyer message d'offre à l'annonceur" ></textarea>
                </>}
                {
                  mine &&
                  <>
                    <h2>Vous etes sur que vous voulez supprimer cette annonce </h2>
                  </>
                }
                <div className=" modal-action">
                  <label onClick={
                    ()=> {mine ? handleDelete(annonce.id):
                    sendMessage(message,annonce.id);
                    }
                  } htmlFor={"confirm-modal"+annonce.id}  className={`cursor-pointer rounded-[56px] px-6 py-2 text-white font-semibold border-none ${!mine?"bg-mainColor":"bg-red-600"} `}>{!mine?"Envoyer":"Suppprimer"}</label>
                   {mine &&<label htmlFor={"confirm-modal"+annonce.id}  className="cursor-pointer rounded-[56px] px-6 py-2 text-white font-semibold border-none bg-slate-400"> Annuler</label>}
                </div>
              </label>
            </div>
        </div>
        
        )
    )
  return (
    <div className='flex flex-col gap-10 w-[95%] md:w-[75%] lg:w-[65%]  justify-center items-center md:items-start'>
        
        {card}
        
    </div>
  )
}

export default AnnonceList