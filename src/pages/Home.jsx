import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

function Home() {
  const {user} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/login');
    
    
  }, [user])
  
  const [title, setTitle] = useState("Titre de l'annonce");
  const [description, setDescription] = useState("Description de l'annonce");
  const [mots, setMots] = useState(["mots clés"]);
  const [err, setErr] = useState(false);
  const handleSubmit = () =>{
    if(title==="Titre de l'annonce" ||description==="Description de l'annonce"|| (mots.length===1 && mots[0]==="mots clés") ) setErr(true); 
  }
  return (
    <div className="flex flex-col items-center justify-around py-20 min-h-[calc(100vh-80px)] mt-16 md:mt-20 home">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl mt-6 text-white font-extrabold drop-shadow-lg">Emménagez en 1, 2, 3 !</h2>
        <p className="text-2xl md:text-3xl mt-6 text-white font-semibold drop-shadow-lg">Tout l'immobilier en Algérie en vente ou location!</p>
      </div>
      <div className="relative w-[90%] md:w-[70%] border-2 border-solid border-[#707070] flex justify-center gap-4 h-fit bg-white rounded-[56px]">
        <div className="relative border-r-2 cursor-text grow p-2 flex justify-center items-center border-[#707070]">
          <div className="absolute left-1/2 -top-12 -translate-x-1/2 text-center  bg-mainColor text-white font-bold w-12 h-12 select-none rounded-full flex justify-center items-center cursor-default"><p>1</p></div>
          <label htmlFor="titre-modal" className="bg-[#E7E6E3] text-left select-none text-[#0C5788] font-semibold text-sm md:text-xl px-3 w-full rounded-[56px] py-2" >{title.trim()}</label>
        </div>
        <div className=" relative cursor-text flex justify-center items-center grow py-2 ">
          <div className="absolute  text-center  -top-12  left-1/2 -translate-x-1/2 bg-mainColor text-white font-bold w-12 h-12 select-none rounded-full flex justify-center items-center cursor-default"><p>2</p></div>
          <label htmlFor="desc-modal" className="bg-[#E7E6E3] text-left select-none text-[#0C5788] font-semibold text-sm md:text-xl px-3 w-full rounded-[56px] py-2" >
            {description.trim()}
            </label>
        </div>
        <div className="relative grow p-2 cursor-text flex justify-center border-l-2 border-[#707070] items-center">
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 text-center bg-mainColor text-white font-bold w-12 h-12 select-none rounded-full flex justify-center items-center cursor-default"><p>3</p></div>
          <label htmlFor="mots-modal" className="bg-[#E7E6E3] text-left select-none text-[#0C5788] font-semibold text-sm md:text-xl px-3 w-full rounded-[56px] py-2" >
            {mots.map((mot,index)=>{
              if (index<mots.length-1)
               return mot.trim()+", "
              else return mot.trim()
              })}
          </label>
        </div>
        {err && <span className="absolute font-bold text-xl  -bottom-12 text-red-600">Svp entrez toutes vos informations!</span>}
      </div>
      
      <button onClick={handleSubmit} className="act-button px-10 py-4">Rechercher</button>
      <input type="checkbox" id="titre-modal" className="modal-toggle" />
      <label htmlFor="titre-modal" className="modal cursor-pointer">
        <label className="modal-box h-2/5 flex flex-col justify-between items-center relative bg-[#E9E9E9] border-2 border-[#888282] rounded-xl" htmlFor="">
          <textarea name="title" id="tit"  onChange={(e)=>{
            if(e.target.value.length ){
              if(e.target.value.trim().length ) setTitle(e.target.value.trim())
          }
            else setTitle("Titre de l'annonce")
          }} className="bg-[#E9E9E9] text-[#7C8287] h-full w-full p-3 resize-none border-none outline-none "   placeholder="Titre de l'annonce" ></textarea>
          <div className=" modal-action">
            <label htmlFor="titre-modal"  className="btn border-none act-button">Ok</label>
          </div>
        </label>
      </label>
      <input type="checkbox" id="desc-modal" className="modal-toggle" />
      <label htmlFor="desc-modal" className="modal cursor-pointer">
        <label className="modal-box h-2/5 flex flex-col justify-between items-center relative bg-[#E9E9E9] border-2 border-[#888282] rounded-xl" htmlFor="">
          <textarea name="description" id="desc"  onChange={(e)=>{
            if(e.target.value.length)
            if(e.target.value.trim().length ) setDescription(e.target.value.trim())
            else setDescription("Description de l'annonce")
          }
            } className="bg-[#E9E9E9] text-[#7C8287] h-full w-full p-3 resize-none border-none outline-none "   placeholder="Description de l'annonce" ></textarea>
          <div className=" modal-action">
            <label htmlFor="desc-modal"  className="btn border-none act-button">Ok</label>
          </div>
        </label>
      </label>
      <input type="checkbox" id="mots-modal" className="modal-toggle" />
      <label htmlFor="mots-modal" className="modal cursor-pointer">
        <label className="modal-box h-2/5 flex flex-col justify-between items-center relative bg-[#E9E9E9] border-2 border-[#888282] rounded-xl" htmlFor="">
          <textarea name="mots" id="mots"
          onChange={(e)=>{
            if(e.target.value.length)
            if(e.target.value.trim().length ) setMots(e.target.value.split(',').map(mot=>mot.trim()))
            else setMots(["mots clés"])
          } }
              
             className="bg-[#E9E9E9] text-[#7C8287] h-full w-full p-3 resize-none border-none outline-none "   placeholder="séparez vots mots clés par virgule ','" ></textarea>
          <div className=" modal-action">
            <label htmlFor="mots-modal" className="btn border-none act-button">Ok</label>
          </div>
        </label>
      </label>
    </div>
  )
}

export default Home