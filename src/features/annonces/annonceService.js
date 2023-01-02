import axios from 'axios'

const API_URL = '/'

// Register user
const deleteAnonce = async (annonceData) => {
  const response = await axios.post(API_URL, annonceData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const addAnnonce = async (userData) => {
  const response = await axios.post(API_URL + 'new', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const addFavorite = async (annonceId) => {
  const response = await axios.post(API_URL + 'setfav', {id:annonceId})
 
  return response.data
}

const deleteFavorite = async (annonceId) => {
  const response = await axios.post(API_URL + 'unsetfav', {id:annonceId})
 
  return response.data
}


const annonceService = {
  deleteAnonce,
  addFavorite,
  addAnnonce,
  deleteFavorite
}

export default annonceService