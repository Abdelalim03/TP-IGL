import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import jwtDecode from 'jwt-decode'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAdmin:user?.token && process.env.REACT_APP_ADMINS.includes(jwtDecode(user?.token).sub),
  message: '',
}



// Login user
export const login = createAsyncThunk('auth/login', async (token, thunkAPI) => {
  try {

    return await authService.login(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async (token, thunkAPI) => {
  try {
    return await authService.logout(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.isAdmin = state.user?.token && process.env.REACT_APP_ADMINS.includes(jwtDecode(state.user?.token).sub)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAdmin = false
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer