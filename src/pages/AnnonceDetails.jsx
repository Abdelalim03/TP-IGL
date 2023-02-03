import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
// import aa from '../photos/appelle.png'
// import tt from '../photos/talk.png'
import MapAnnonces from '../components/shared/MapAnnonces'
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

function AnnonceDetails() {
  const [isToggle,setIsToggle] = useOutletContext();
  const {id} = useParams();
  const navigate = useNavigate();
  const {user,isAdmin} = useSelector((state)=>{
    return state.auth
  });
  const [annonce, setAnnonce] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [showedImage, setshowedImage] = useState()
  useEffect(() => {
    setIsToggle(false);
    if (!user || isAdmin){
      navigate('/');
    }
    axios.get('http://localhost:5000/getai/'+id,{
    headers:{
      Authorization: `Bearer ${user.token}`,
    }})
    .then(response=>{
      if(response.status===200)
      setAnnonce(response.data);
      console.log(response);
      setshowedImage(response.data.pics[0])
      setIsLoading(false)
    })
    .catch(err=>console.log(err))
  }, [])
  if (isLoading) return <Spinner />
  return (
    <div className={`flex  items-center justify-start mx-auto container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-60 md:pt-20"}`}>
      <div className="pl-[5%] pr-[5%] pt-[2%] pb-[2%] ">
              
              <div className="font-bold lg:text-[24px] md:text-[21px] sm:text-[19px] text-[16px]">{annonce.type} pour {annonce.category}</div>
              <div className="lg:text-lg md:text-md sm:text-sm text-xs">{annonce.userId===-1?"Utilisateur d'autre site":annonce.userName}</div>


              <div className=" pt-[2%]  w-full flex justify-between ">

                   <div className="w-[45%] flex flex-col justify-center items-center ">
                        <div className='w-[80%]'>
                        <a target="_blank"  rel="noreferrer" href={showedImage} className='w-full '><img src={showedImage} alt='pp' className="w-[100%] " /></a> 
                        </div>
                        <div className='w-[80%] mt-3 flex justify-center'>
                             {
                                  annonce.pics.slice(0,6).map((elem)=>{ 
                                  return (<div className='w-full mr-2 '><img onClick={()=>setshowedImage(elem)} src={elem} alt='pp' className="w-full cursor-pointer mr-2 " /></div> )
                                  })
                             }
                        </div>
                        
                   </div>
                   <div className="w-[45%] ">
                        <div className="flex justify-between items-center   ">
                             <div className="text-[#FF5D02] font-bold w-full lg:text-xl md:text-lg sm:text-md text-xs">{annonce.price} DA</div>
                             <div className="w-full   "><Link to="/sendMsg" className="text-white lg:text-xl md:text-lg sm:text-md text-xs bg-mainColor hover:bg-orange-500   rounded-full pt-[5%] pb-[5%] pl-[10%] pr-[10%]">Buy this appartment</Link></div>
                        </div>
                        <div className="mt-[5%] lg:text-sm md:text-xs sm:text-[12px] text-[10px] ">About this property</div>
                        <div className=" flex justify-between pl-[5%] pr-[5%] pt-[2%] pb-[2%] mt-[5%]  text-black w-full">
                             <div className='flex flex-col justify-center items-center'>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs">Area</div>
                                  <div className=" lg:text-xl md:text-lg sm:text-md text-xs font-bold">{annonce.space} m²</div>
                             </div>
                             <div className='flex flex-col justify-center items-center'>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs">Dimensions</div>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs font-bold">100x110 m</div>
                             </div>
                             
                             <div className='flex flex-col justify-center items-center'>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs">Rooms</div>
                                  <div className="lg:text-xl md:text-lg sm:text-md text-xs font-bold">{Math.floor(Math.random() * (9 - 3 + 1) ) + 3}</div>
                             </div>
                        </div>
                        <div className=" mt-[5%] lg:text-xl md:text-lg sm:text-md text-xs">Description</div>
                        <div className="mt-[5%] lg:text-xl md:text-lg sm:text-md text-xs">{annonce.description}</div>
                        <div className="mt-[5%] lg:text-xl md:text-lg sm:text-md text-xs">Location</div>
                        <div className="mt-[3%] lg:text-xl md:text-lg sm:text-md text-xs">{annonce.localisation} </div>
                        <div className="w-full flex mt-[5%] justify-around mx-auto">
                             <a  href="#my-modal-2" className="w-full ml-[5%] "><button className="flex  md:px-6 px-3  items-center rounded-full md:p-3 p-2  hover:bg-black hover:bg-opacity-75 bg-black  " >
                                  {/* <div className="flex"><img src={aa} alt='aa'/></div> */}
                                  <div className="w-full pl-[2%] text-white lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">Call owner</div>
                                  </button></a>
                             <div className="w-[50%]  "><Link to='/sendMsg' className=" flex items-center  md:p-3 p-2  rounded-full border-2 border-black hover:bg-black hover:bg-opacity-10">
                                  {/* <div><img src={tt} alt='tt'/></div> */}
                                  <div className=" w-full pl-[2%] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">Message owner</div>
                                  </Link></div>
                        </div>
                   </div>
              </div>
              <MapAnnonces announces={annonce}/>
          </div>
    </div>
  )
}

export default AnnonceDetails