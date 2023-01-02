import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import AnnonceList from '../components/shared/AnnonceList'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';


function PostAnnonce() {
  
  const types = ["Terrain", "Terrain Agricole", "Appartement", "Maison", "Bungalow"];
  const [type, setType] = useState(0);
  const [wilaya, setWilaya] = useState(0);
  const [commune, setCommune] = useState(0);
  const [datedebut, setDatedebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [wilayas, setWilayas] = useState(["Setif","Jijel"]);
  const [communes, setCommunes] = useState(["Bougaa","Ain Roua"]);
    const [isToggle,setIsToggle] = useOutletContext();


  return (
    <div
    className={`flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-0  justify-around mx-auto container py-20 bg-white min-h-[calc(100vh-64px)] mt-16 md:mt-20  md:min-h-[calc(100vh-80px)] ${isToggle&&"pt-44 md:pt-20"}`}>
      <AnnonceList fav={true}  />
      <div className='w-[95%] md:w-[20%] lg:w-[30%]  flex flex-col p-5 justify-between gap-8 items-center  bg-[#E9E9E9] border-[1px] rounded-xl border-[#888282]'>
        <select name='type' value={type} onChange={(e)=>setType(e.target.value)} className="filter-select">
          <option value={0}  >Type de l'AI</option>
          {types.map(type=>
            <option key={type} value={type} className='cursor-pointer'>{type}</option>
          )
            
          }
        </select>
        <select name='wilaya' value={wilaya} onChange={(e)=>setWilaya(e.target.value)} className="filter-select">
          <option value={0}  >Wilaya</option>
          {wilayas.map(wilaya=>
            <option key={wilaya} value={wilaya} className='cursor-pointer'>{wilaya}</option>
          )
            
          }
        </select>
        <select name='wilaya' value={commune} onChange={(e)=>setCommune(e.target.value)} className="filter-select">
          <option  value={0}  >Commune</option>
          {communes.map(commune=>
            <option key={commune} value={commune} className='cursor-pointer'>{commune}</option>
          )
            
          }
        </select>
        <p className='text-[#105186] text-base md:text-xl ml-2 sm:ml-5 md:ml-9 -mb-6 self-start  font-semibold'>Date de publication {dateFin} </p>
        <div id='annonceDate'    className="max-w-xs flex items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            label="De"
            openTo="year"
            views={['year', 'month', 'day']}
            value={datedebut}
            onChange={(newValue) => {
              setDatedebut(newValue);
            }}
            renderInput={(params) => <TextField className='text-[#105186]' {...params} />}
          />
              
              <DatePicker
              
            disableFuture
            label="Jusqu'à"
            openTo="year"
            views={['year', 'month', 'day']}
            value={dateFin}
            onChange={(newValue) => {
              setDateFin(newValue);
            }}
            renderInput={(params) => <TextField className='text-[#105186]' {...params} />}
          />
        </LocalizationProvider>
        </div>
      </div>
    </div>
  //   <LocalizationProvider
  //   dateAdapter={AdapterDayjs}
  //   localeText={{ start: 'Check-in', end: 'Check-out' }}
  // >
  //   <DateRangePicker
  //     value={date}
  //     onChange={(newValue) => {
  //       setDate(newValue);
  //     }}
  //     renderInput={(startProps, endProps) => (
  //       <>
  //         <TextField  {...startProps} />
  //         <TextField {...endProps} />
  //       </>
  //     )}
  //   />
  // </LocalizationProvider>
  )
}

export default PostAnnonce