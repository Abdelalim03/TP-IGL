import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import annonceService from './annonceService'

const initialState = {
  annnonces: null,
  favourites:null,
  myAnnonces:null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const addAnnonce = createAsyncThunk(
  'annonce/addAnnonce',
  async (annonce, thunkAPI) => {
    try {
      return await annonceService.addAnnonce(annonce)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// deleteAnnonce user
export const deleteAnnonce = createAsyncThunk('annonce/deleteAnnonce', async (user, thunkAPI) => {
  try {
    return await annonceService.deleteAnnonce(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const addFavorite = createAsyncThunk('annonce/addFavorite', async (annonceId,thunkAPI) => {
  try {
    return await annonceService.addFavorite(annonceId)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const annonceSlice = createSlice({
  
  name: 'annonce',
  initialState,
  reducers: {
    reset: (state) => {
      state.annnonces=null
      state.favourites=null
      state.myAnnonces=null
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAnnonce.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAnnonce.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.annnonces = action.payload                                                         
      })
      .addCase(addAnnonce.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.annnonces = null
      })
      .addCase(deleteAnnonce.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAnnonce.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(deleteAnnonce.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(deleteAnnonce.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAnnonce.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(deleteAnnonce.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = annonceSlice.actions
export default annonceSlice.reducer