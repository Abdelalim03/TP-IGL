import axios from 'axios'

const API_URL = 'http://localhost:5000/'

// delete Annonce
const mesAnnonces = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'getMine',config)
  return response.data.data
}

// delete Annonce
const deleteAnnonce = async (annonceID,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL+'delete', {id:annonceID},config)
  console.log(response.data); 
  return response.data
}

// add Annonce
const addAnnonce = async (annonceData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'new', annonceData,config)

 

  return response.data
}

const getFavourites = async (token)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'getfav',config)
  return response.data.data
}


// add Favourite


const addFavorite = async (annonceId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'setfav', {id:annonceId},config)
  return response.data
}

const deleteFavorite = async (annonceId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'unsetfav', {id:annonceId},config)
 
  return response.data
}


const annonceService = {
  deleteAnnonce,
  addFavorite,
  addAnnonce,
  deleteFavorite,
  getFavourites,
  mesAnnonces
}

export default annonceService