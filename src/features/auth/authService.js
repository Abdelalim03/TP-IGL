import axios from 'axios'

const API_URL = '/'

// Login user
const login = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin':'*'
    },
  }

  const response = await axios.get('http://localhost:5000/login', config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}


// Logout user
const logout = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get('http://localhost:5000/logout', config)
  if (response.data.ok)
  localStorage.removeItem('user');
  
}

const authService = {
  logout,
  login
}

export default authService