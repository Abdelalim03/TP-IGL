import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import aa from '../assets/appelle.png'
import tt from '../assets/talk.png'
import close from '../assets/close.svg';
import house from '../assets/house.svg';
import MapAnnonces from '../components/shared/MapAnnonces'
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { deleteAnnonce } from '../features/annonces/annonceSlice';

function AnnonceDetails() {
  const [isToggle,setIsToggle] = useOutletContext();
  const {id} = useParams();
  const navigate = useNavigate();
  const {user,isAdmin} = useSelector((state)=>{
    return state.auth
  });
  const dispatch = useDispatch();
  const [annonce, setAnnonce] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [showedImage, setshowedImage] = useState(require("../assets/dar.jpeg"))
  const [message, setMessage] = useState("");


  const handleDelete = (id)=>{
     dispatch(deleteAnnonce(id))
     setTimeout(()=>navigate('/myannonces'),1000)
     
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
  useEffect(() => {
    setIsToggle(false);
    if (!user){
      navigate('/');
    }
    axios.get('http://localhost:5000/getai/'+id,{
    headers:{
      Authorization: `Bearer ${user.token}`,
    }})
    .then(response=>{
      if(response.status===200){
      setAnnonce(response.data);}
      if(response.data.pics.length) setshowedImage(response.data.pics[0])
      setIsLoading(false)
    })
    .catch(err=>console.log(err))
  }, [user])
  if (isLoading) return <Spinner />
  return (
    <div className={`flex  items-center flex-col mx-auto container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-60 md:pt-20"}`}>
      <div className="pl-[5%] pr-[5%] pt-[2%] pb-[2%] ">
              
              <div className="font-bold lg:text-[24px] underline ml-14 md:text-[21px] sm:text-[19px] text-[16px]">{annonce.type} pour {annonce.category}</div>
              <div className=" pt-[2%]  w-full flex flex-col items-center lg:items-start lg:flex-row gap-7 justify-between ">

                   <div className="w-full lg:w-[45%] flex flex-col justify-center items-center ">
                        <div className='w-[80%]'>
                        <a target="_blank"  rel="noreferrer" href={showedImage} className='w-full '><img src={!annonce.pics.length ||annonce.pics[0]===""?require("../assets/dar.jpeg"): (annonce.userId===-1?showedImage:'http://localhost:5000'+showedImage)} alt='pp' className="w-[100%] max-h-[600px] h-full " /></a> 
                        </div>
                        {(annonce.pics.length &&annonce.pics[0]!=="") &&<div className='w-[80%] mt-3 flex justify-center'>
                             {
                                  annonce.pics.slice(0,6).map((elem)=>{ 
                                  return (<div className=' mr-2 '><img onClick={()=>setshowedImage(elem)} src={annonce.userId===-1?elem:'http://localhost:5000'+elem} alt='pp' className="w-20 h-20 cursor-pointer mr-2 " /></div> )
                                  })
                             }
                        </div>}
                        
                   </div>
                   <div className="w-full lg:w-[45%] bg-[#E9E9E9]   border-[1px] rounded-xl p-8 border-[#888282] ">
                   <div className="flex justify-between items-center   ">
                             <div className="text-mainColor font-bold  lg:text-xl md:text-lg sm:text-md text-xs">{annonce.userId===-1?"Utilisateur d'un autre site":annonce.info.name}</div>
                             
                             <div className='text-[#514F4D] lg:text-xl md:text-lg sm:text-md text-xs' >{annonce.date.slice(0,17)}</div>
                        </div>
                        <div className="flex justify-between mt-6 items-center   ">
                             <div className="text-navbar font-bold  lg:text-xl md:text-lg sm:text-md text-xs">{annonce.price} DA</div>
                             
                             {!isAdmin && <label htmlFor={"confirm-modal"+annonce.id}
                             className={`text-white font-semibold w-fit flex justify-center items-center h-10 text-center cursor-pointer lg:text-xl md:text-lg sm:text-md text-xs ${jwtDecode(user.token).sub!==annonce.userId?"bg-mainColor":"bg-red-600"}  rounded-full py-4 md:py-6 px-6 md:px-8`}>
                              {jwtDecode(user.token).sub!==annonce.userId?"Envoyer un message":"Suppprimer mon annonce"}</label>}
                        </div>
                        <div className=" flex justify-between pl-[5%] pr-[5%] pt-[2%] pb-[2%] mt-[5%]  text-black w-full">
                             <div className='flex flex-col justify-center items-center'>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs">Surface</div>
                                  <div className=" lg:text-xl md:text-lg sm:text-md text-xs font-bold">{annonce.space} m²</div>
                             </div>
                             <div className='flex flex-col justify-center items-center'>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs">Dimensions</div>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs font-bold">100x110 m</div>
                             </div>
                             
                             <div className='flex flex-col justify-center items-center'>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs">Chambres</div>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs font-bold">{(annonce.id%2)?4:5}</div>
                             </div>
                        </div>
                        <div className=" mt-[5%] font-bold lg:text-xl md:text-lg sm:text-md text-xs">Description</div>
                        <div className="mt-[5%] text-[#514F4D] break-all lg:text-xl md:text-lg sm:text-md text-xs">{annonce.description}</div>
                        <div className="mt-[5%] font-bold lg:text-xl md:text-lg sm:text-md text-xs">Localisation</div>
                        <div className="mt-[3%] text-[#514F4D] lg:text-xl md:text-lg sm:text-md text-xs">{annonce.localisation} </div>
                        <div className="w-full flex mt-[5%] justify-between mx-auto">
                            <button className="flex  md:px-6 px-3 mr-4  items-center rounded-full md:p-3 p-2  hover:bg-black hover:bg-opacity-75 bg-black  " >
                                  <div className="hidden lg:flex"><img src={aa} alt='aa'/></div>
                                  <div className="w-full pl-[2%] text-white lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">{annonce.phone?annonce.phone:"Anonyme"}</div>
                                  </button>
                             <div className="flex-1  ">
                              <div className=" flex items-center ml-4  md:p-3 p-2  rounded-full border-2 border-black hover:bg-black hover:bg-opacity-10">
                                  <div className="hidden lg:flex"><img src={tt} alt='tt'/></div>
                                  <a href={annonce.email&&'mailto:'+annonce.email} className=" w-full pl-[2%] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px] break-all">{annonce.email?annonce.email:"Anonyme"}</a>
                                  </div>
                                </div>
                        </div>
                   </div>
              </div>
              <MapAnnonces long={annonce.long} lat={annonce.lat} />
          </div>
          <input type="checkbox" id={"confirm-modal"+annonce.id} className="modal-toggle" />
            <div  className="modal">
              <label className={`relative  overflow-visible modal-box ${jwtDecode(user.token).sub===annonce.userId ?"h-fit":"h-2/5"}  flex flex-col justify-between items-center  bg-white border-2 border-[#888282] rounded-xl`} htmlFor="">
                {jwtDecode(user.token).sub!==annonce.userId &&
                <>
                  <label onClick={()=>setMessage("")} className='cursor-pointer' htmlFor={"confirm-modal"+annonce.id}><img className='absolute w-8 -right-3.5 -top-3.5'  src={close} alt="fermer" /></label> 
                  <img className='absolute w-20 -top-12 left-1/2 -translate-x-1/2' src={house} alt="fermer" />
                  <p className='text-xl font-bold mt-2 text-[#575656]'>Contacter l'annonceur</p>
                  <textarea value={message} maxLength={40} onChange={(e)=>setMessage(e.target.value)} name="title" id="tit"  className="bg-[#E9E9E9] focus:ring-0 focus:border-[#888282] mt-4  text-[#7C8287] h-full w-full p-3 resize-none border-2 border-[#888282] rounded-xl outline-none "   placeholder="Envoyer message d'offre à l'annonceur" ></textarea>
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
}

export default AnnonceDetails