import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Post() {
  const [isToggle,setIsToggle] = useOutletContext();
  const {user} = useSelector(state=>state.auth);
  const navigate = useNavigate();
  const types = ["Terrain", "Terrain Agricole", "Appartement", "Maison", "Bungalow"];
  const [algeria, setAlgeria] = useState({});
  const handleChange = (e) =>{
    setAnnonce({...annonce,[e.target.name]:{...annonce[e.target.name],value:e.target.value}})
    console.log(annonce);
  }
  const [annonce, setAnnonce] = useState({
    titre:{
      value:"",
      err:null
    },
    description:{
      value:"",
      err:null
    },
    surface:{
      value:"",
      err:null
    },
    prix:{
      value:"",
      err:null
    },
    type:{
      value:0,
      err:null
    },
    categorie:{
      value:"",
      err:null
    },
    addresse:{
      value:"",
      err:null
    },
    wilaya:{
      value:"",
      err:null
    },
    commune:{
      value:"",
      err:null
    },
    myaddresse:{
      value:"",
      err:null
    },
    telephone:{
      value:"",
      err:null
    },

  })
  useEffect(() => {
    setIsToggle(false);
    if (!user) navigate('/')
    if (user){
      axios.get('http://localhost:5000/wilaya',{
      headers:{
        Authorization: `Bearer ${user.token}`,
      }
    })
    .then(response=>{
      setAlgeria(response.data);
    })
    .catch(err=>console.log(err))}
  }, [])
  return (
      <div
    className={`flex relative flex-col md:flex-row gap-5  items-stretch justify-between mx-auto container py-14  bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20   md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-44 md:pt-20"}`}>
        <div className="annonce-form flex flex-col gap-8 w-[48%]  justify-start items-center">
        
          <input placeholder="Titre de l'annonce" className='form-input-ann ' type="text" name="titre" id="titre" />
          <textarea placeholder="Description de l'annonce" className='form-input-ann h-52' type="text" name="description" id="description" />
          <div className=' flex justify-center gap-3 items-center'>
            <input placeholder="Surface (m²)" className='form-input-ann ' type="text" name="surface" id="surface" />
            <input placeholder="prix" className='form-input-ann ' type="text" name="prix" id="prix" />
            <select name='type' value={annonce.type.value}  onChange={handleChange} className="simple-select">
              <option value={0}  >Type de l'annonce</option>
              {types.map(type=>
                <option key={type} value={type} className='cursor-pointer'>{type}</option>
              ) 
              }
            </select>
          </div>
          <div className=' flex justify-center gap-2 items-center'>
            <select name='wilaya' value={annonce.wilaya.value} onChange={handleChange} className="simple-select ">
              <option value={0}  >Wilaya</option>
              {Object.keys(algeria)?.map(wilaya=>
                <option key={wilaya} value={wilaya} className='cursor-pointer'>{wilaya}</option>
              )
                
              }
            </select>
            <select name='commune' value={annonce.commune.value} onChange={handleChange} className="simple-select">
              <option  value={0}  >Commune</option>
              {algeria && algeria[annonce.wilaya.value]?.map(commune=>
                <option key={commune} value={commune} className='cursor-pointer'>{commune}</option>
              )
                
              }
            </select>
            <input placeholder="categorie" className='form-input-ann w-1/3' type="text" name="categorie" id="categorie" />
          </div>
          
          <input placeholder="Adresse du bien" className='form-input-ann ' type="text" name="addresse" id="addresse" />
          
        </div>
        <div className='annonce-form flex flex-col gap-8 w-[48%]   justify-start items-center'>
        <div className='flex justify-center gap-3 items-center w-[90%]'>
          <input placeholder="Votre adresse" className='form-input-ann w-2/3' type="text" name="myaddresse" id="myaddresse" />
          <input placeholder="n° Téléphone" className='form-input-ann w-1/3' type="text" name="telephone" id="telephone" />
        </div>
        <button type='button' className={`  cursor-pointer px-6 py-3  bg-[#00AFCA] hover:bg-[#00AFCA80] font-semibold uppercase text-white rounded-[56px]`}>Importer des photos</button>
        </div>
        <button type='button' className={`absolute bottom-5 w-fit left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto  md:right-5 cursor-pointer px-6 py-3 bg-mainColor font-semibold uppercase text-white rounded-[56px]`}>Publier</button>
    </div>
  )
}

export default Post