import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import AnnonceList from '../components/shared/AnnonceList'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


function PostAnnonce() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const {fstAnnonces} = (state!==null) && state;
  const [annonces, setAnnonces] = useState(fstAnnonces)
  const types = ["Terrain", "Terrain Agricole", "Appartement", "Maison", "Bungalow"];
  const [type, setType] = useState(0);
  const [wilaya, setWilaya] = useState(0);
  const [commune, setCommune] = useState(0);
  const [datedebut, setDatedebut] = useState(Date.now());
  const [dateFin, setDateFin] = useState(Date.now());
  const [algeria, setAlgeria] = useState({});
  const [isToggle,setIsToggle] = useOutletContext();
  const {user} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsToggle(false);
    if (!user) {
      return navigate('/');
    }
    
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
  
  useEffect(() => {
    if (type!=0 ||commune!=0 || wilaya!=0 || dateFin!=0 || datedebut!=0) 
    {

     setAnnonces(fstAnnonces?.filter((annonce,idx)=>{
      
      const dte = new Date(annonce.date).setHours(0,0,0,0);
     return (((annonce.type.toLowerCase()===String(type).toLowerCase())||type==0) &&
     (wilaya==0||((annonce.localisation.toLowerCase().includes(String(wilaya).toLowerCase()) )&& ((annonce.localisation.toLowerCase().includes(String(commune).toLowerCase()))||commune==0))) &&
       ((dateFin==datedebut && dateFin<=Date.now())||((dte<=dateFin ) && (dte>=datedebut )) ) )

    }))
  }
    else {
      setAnnonces(fstAnnonces);
      
    }
    
    
  }, [wilaya,commune,datedebut,dateFin,type])
  

  return (
    <div
    className={`flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-0  justify-around mx-auto container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-60 md:pt-20"}`}>
      <AnnonceList search={true}  annonces={annonces} setAnnonces={setAnnonces} />
      <div className='w-[95%] md:w-[20%] lg:w-[30%]  flex flex-col p-5 justify-between gap-8 items-center  bg-[#E9E9E9] border-[1px] rounded-xl border-[#888282]'>
        <select name='type' value={type} onChange={(e)=>{setType(e.target.value)}} className="filter-select">
          <option value={0}  >Type de l'AI</option>
          {types.map(type=>
            <option key={type} value={type} className='cursor-pointer'>{type}</option>
          ) 
          }
        </select>
        <select name='wilaya' value={wilaya} onChange={(e)=>setWilaya(e.target.value)} className="filter-select">
          <option value={0}  >Wilaya</option>
          {Object.keys(algeria)?.map(wilaya=>
            <option key={wilaya} value={wilaya} className='cursor-pointer'>{wilaya}</option>
          )
            
          }
        </select>
        <select name='commune' value={commune} onChange={(e)=>setCommune(e.target.value)} className="filter-select">
          <option  value={0}  >Commune</option>
          {algeria && algeria[wilaya]?.map(commune=>
            <option key={commune} value={commune} className='cursor-pointer'>{commune}</option>
          )
            
          }
        </select>
        <p className='text-[#105186] text-base md:text-xl ml-2 sm:ml-5 md:ml-9 -mb-6 self-start  font-semibold'>Date de publication </p>
        <div id='annonceDate' className="max-w-xs flex   gap-3 items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
          className='text-[#105186] rounded-lg   placeholder:text-[#105186] bg-white'
            disableFuture
            label="De"
            openTo="year"
            InputProps={{
              disableunderline: "true",
             }}
            views={['year', 'month', 'day']}
            value={datedebut}
            
            onChange={(newValue) => {
              if(newValue>new Date(Date.now()).setHours(0,0,0,0)) setDatedebut(new Date(Date.now()).setHours(0,0,0,0)); 
              if (new Date(newValue).setHours(0,0,0,0)<dateFin)
              setDatedebut(new Date(newValue).setHours(0,0,0,0));
              else setDatedebut(dateFin)
            }}
            renderInput={(params) => <TextField className='myDatePicker ' variant="outlined"  {...params} />}
          />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              className='text-[#105186] rounded-lg   placeholder:text-[#105186] bg-white'
            disableFuture
            label="Jusqu'à"
            openTo="year"
            views={['year', 'month', 'day']}
            value={dateFin}
            onChange={(newValue) => {
              if(newValue>new Date(Date.now()).setHours(0,0,0,0)) setDateFin(new Date(Date.now()).setHours(0,0,0,0)); 
              if (new Date(newValue).setHours(0,0,0,0)>datedebut)
              setDateFin(new Date(newValue).setHours(0,0,0,0));
              else setDateFin(datedebut)
            }}
            renderInput={(params) => <TextField className='text-[#105186]' {...params} />}
          />
        </LocalizationProvider>
        </div>
      </div>
    </div>

  )
}

export default PostAnnonce