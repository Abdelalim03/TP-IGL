import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom"

function Home() {
  const {user} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const [isToggle] = useOutletContext();
  const [mots, setMots] = useState(["mots clés"]);
  const [err, setErr] = useState(false);
  const [annonces,setAnnonces] = useState([]);
  useEffect(() => {

    if (!user){
      navigate('/');
    }
    if (mots.length!==0 && mots[0]!=="mots clés" && annonces.length!==0){
      setErr(false)
      navigate('/annonces',{ state: {fstAnnonces:annonces}});
    }
    
  }, [user,annonces,navigate]);
  

  const handleSubmit = () =>{
    if ((mots.length===1 && mots[0]==="mots clés") ||mots.length===0 ) setErr(1);
  
    else {
      axios.post('http://localhost:5000/search',{
        keywords:mots
      },{
        headers:{
          Authorization: `Bearer ${user.token}`,
        }
      })
      .then(response=>{
        if (response.data.data===0) setErr(2);
        setAnnonces(response.data.data);
      })
      .catch(err=>console.log(err))
      
    }
  }
  return (
    <div className={`flex flex-col items-center justify-around py-20 min-h-[calc(100vh-64px)]  md:min-h-[calc(100vh-80px)] mt-16 md:mt-20 home ${isToggle&&"pt-28"}`}>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl mt-6 text-white font-extrabold drop-shadow-lg">Emménagez en 1, 2, 3 !</h2>
        <p className="text-2xl md:text-3xl mt-6 text-white font-semibold drop-shadow-lg">Tout l'immobilier en Algérie en vente ou location!</p>
      </div>
      <div className="relative w-96 border-2 border-solid border-[#707070] flex justify-center gap-4 h-fit bg-white rounded-[56px]">
  
        <div className="relative grow p-2  flex justify-center items-center">
          <label htmlFor="mots-modal" className="bg-[#E7E6E3] text-left select-none text-[#0C5788] font-semibold text-sm md:text-xl px-3 w-full rounded-[56px] py-2 cursor-text" >
            {mots.map((mot,index)=>{
              if (index<mots.length-1)
               return mot.trim()+", "
              else return mot.trim()
              })}
          </label>
        </div>
        {err===2 && <span className="absolute font-bold text-xl w-full text-center -bottom-16 text-red-600">Il n'existe aucune annonces avec ces mots!</span>}
        {err===1 && <span className="absolute font-bold text-xl w-full text-center  -bottom-16 text-red-600">Vous devez entrez les mots clés des annonces désirés!</span>}
      </div>
      
      <button onClick={handleSubmit} className="act-button px-10 py-4">Rechercher</button>
      <input type="checkbox" id="mots-modal" className="modal-toggle" />
      <label htmlFor="mots-modal" className="modal cursor-pointer">
        <label className="modal-box h-2/5 flex flex-col justify-between items-center relative bg-[#E9E9E9] border-2 border-[#888282] rounded-xl" htmlFor="">
          <textarea name="mots" id="mots"
          onChange={(e)=>{
            if(e.target.value.length)
            if(e.target.value.trim().length ) setMots(e.target.value.split(',').map(mot=>mot.trim()))
            else setMots(["mots clés"])
          } }
              
             className="bg-[#E9E9E9] text-[#7C8287] h-full w-full p-3 resize-none border-none outline-none focus:ring-0 "   placeholder="séparez vots mots clés par virgule ','" ></textarea>
          <div className=" modal-action">
            <label htmlFor="mots-modal" className="btn border-none act-button">Ok</label>
          </div>
        </label>
      </label>
    </div>
  )
}

export default Home