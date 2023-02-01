import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

function Post() {
  const [isToggle,setIsToggle] = useOutletContext();
  const {user} = useSelector(state=>state.auth);
  const navigate = useNavigate();
  const types = ["Terrain", "Terrain Agricole", "Appartement", "Maison", "Bungalow"];
  const [algeria, setAlgeria] = useState({});
  const handleChange = (e) =>{
    setAnnonce({...annonce,[e.target.name]:{...annonce[e.target.name],value:e.target.value}})
  }
  let intialAnnonce ={
    title:{
      value:"",
      err:null
    },
    description:{
      value:"",
      err:null
    },
    space:{
      value:"",
      err:null
    },
    price:{
      value:"",
      err:null
    },
    type:{
      value:0,
      err:null
    },
    category:{
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
    phone:{
      value:"",
      err:null
    }
  };
  const [files, setFiles] = useState([])
  const [annonce, setAnnonce] = useState(intialAnnonce)
  const uploadMultipleFiles=(e)=> {
      setFiles([...new Set([...files,...e.target.files])]);
  }

  const submitHandle=(e)=> {
      e.preventDefault();
      const formData = new FormData();
      Array.from(files).forEach(item => {
        formData.append('images', item)
      })
      Object.keys(annonce)
      .forEach(key=>{
        formData.append(key,annonce[key].value)
        });

        axios.post('http://localhost:5000/new', formData,{
          headers:{
            Authorization: `Bearer ${user.token}`,
          }
        }).then(result => {
          if (result.status===200){
            setAnnonce(intialAnnonce);
            navigate('')
          }
        }).catch(err => {
          console.log(err)
        })
      
  }
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
  }, []);

  return (
      <form 
      id='annonceForm'
    className={`flex relative flex-col lg:flex-row gap-5 items-center justify-center  md:items-stretch md:justify-between mx-auto container py-14  bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20   md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-60 md:pt-20"}`}>
        <div className="annonce-form flex flex-col gap-8 lg:w-[48%]  justify-start items-center">
        
          <input placeholder="Titre de l'annonce" className='form-input-ann ' onChange={handleChange} type="text" name="title" id="titre" />
          <textarea placeholder="Description de l'annonce" className='form-input-ann h-52' onChange={handleChange} type="text" name="description" id="description" />
          <div className=' flex justify-center gap-3 items-center'>
            <input placeholder="Surface (m²)" className='form-input-ann ' onChange={handleChange} type="text" name="space" id="surface" />
            <input placeholder="prix" className='form-input-ann '  onChange={handleChange} type="text" name="price" id="prix" />
            <select name='type' value={annonce.type.value}  onChange={handleChange} className="simple-select ">
              <option value={0}  >Type de l'annonce</option>
              {types.map(type=>
                <option key={type} value={type} className='cursor-pointer'>{type}</option>
              ) 
              }
            </select>
          </div>
          <div className=' flex justify-center gap-2 items-center'>
            <select name='wilaya' value={annonce.wilaya.value} onChange={handleChange} className="simple-select w-40 lg:w-52">
              <option value={0}  >Wilaya</option>
              {Object.keys(algeria)?.map(wilaya=>
                <option key={wilaya} value={wilaya} className='cursor-pointer'>{wilaya}</option>
              )
                
              }
            </select>
            <select name='commune' value={annonce.commune.value} onChange={handleChange} className="simple-select w-40 lg:w-52">
              <option  value={0}  >Commune</option>
              {algeria && algeria[annonce.wilaya.value]?.map(commune=>
                <option key={commune} value={commune} className='cursor-pointer'>{commune}</option>
              )
                
              }
            </select>
            <input placeholder="categorie" className='form-input-ann w-1/3' onChange={handleChange} type="text" name="category" id="categorie" />
          </div>
          
          <input placeholder="Adresse du bien" className='form-input-ann ' onChange={handleChange} type="text" name="addresse" id="addresse" />
          
        </div>
        <div className='annonce-form mb-9 flex flex-col gap-8 lg:w-[48%]   justify-start items-center'>
        <div className='flex justify-center gap-3 items-center lg:w-[90%]'>
          <input placeholder="Votre adresse" className='form-input-ann w-2/3' onChange={handleChange} type="text" name="myaddresse" id="myaddresse" />
          <input maxLength={10} placeholder="n° Téléphone" className='form-input-ann w-1/3' onChange={handleChange} type="text" name="phone" id="telephone" />
        </div>
        <div className='image-Wrapper flex flex-wrap flex-row justify-center md:justify-start gap-5 max-w-[550px]'>
          {files?.map(item=>{
            return <div className='relative' key={URL.createObjectURL(item)}>
              <img  className='w-40 h-40 rounded-xl' src={item ? URL.createObjectURL(item) : null} alt=".." />
              <AiFillCloseCircle onClick={()=>{
                console.log(item);
                setFiles(files.filter(ur=>ur!==item))
                }}  className="text-red-600 absolute cursor-pointer -right-3 -top-3  w-8 h-8" />
            </div>
          })}
        </div>
        <label htmlFor='importer' type='button' className={`  cursor-pointer px-6 py-3  bg-[#00AFCA]  hover:bg-[#00AFCA80] font-semibold uppercase text-white rounded-[56px]`}>Importer des photos</label>
        <input name='images' id='importer' type="file" accept='image/*' hidden  onChange={uploadMultipleFiles} multiple />
        </div>
        <button type='submit' onClick={submitHandle} className={`absolute bottom-5 w-fit left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto  md:right-5 cursor-pointer px-6 py-3 bg-mainColor font-semibold uppercase text-white rounded-[56px]`}>Publier</button>
    </form>
  )
}

export default Post