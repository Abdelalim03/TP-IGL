import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import annonceService from './annonceService'

const initialState = {
  annonces: [],
  favourites:[],
  myAnnonces:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getAllAnnonces = createAsyncThunk('annonce/getAllAnnonces', async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await annonceService.getAllAnnonces(token)
  } catch (error) {
    const message =
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const scrapAnnonces = createAsyncThunk('annonce/scrapAnnonces', async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await annonceService.scrapAnnonces(token)
  } catch (error) {
    const message =
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const mesAnnonces = createAsyncThunk(
  'annonce/mesAnnonces',
  async (_,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await annonceService.mesAnnonces(token);
    } catch (error) {
      const message =
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// add Annonce
export const addAnnonce = createAsyncThunk(
  'annonce/addAnnonce',
  async (annonce, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await annonceService.addAnnonce(annonce,token)
    } catch (error) {
      const message =
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// deleteAnnonce user
export const deleteAnnonce = createAsyncThunk('annonce/deleteAnnonce', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await annonceService.deleteAnnonce(id,token)
  } catch (error) {
    const message =
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  } 
})
export const getFavourites = createAsyncThunk('annonce/getFavorites', async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await annonceService.getFavourites(token)
  } catch (error) {
    const message =
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const addFavorite = createAsyncThunk('annonce/addFavorite', async (annonceId,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await annonceService.addFavorite(annonceId, token)
  } catch (error) {
    const message =
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const deleteFavorite = createAsyncThunk('annonce/deleteFavorite', async (annonceId,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await annonceService.deleteFavorite(annonceId, token)
  } catch (error) {
    const message =
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
      state.favourites=[]
      state.myAnnonces=[]
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(mesAnnonces.pending, (state) => {
      state.isLoading = true
    })
    .addCase(mesAnnonces.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.myAnnonces = action.payload
    })
    .addCase(mesAnnonces.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.myAnnonces = null
    })
      .addCase(addAnnonce.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAnnonce.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        
        state.myAnnonces = [...state.myAnnonces,action.payload]                                                         
      })
      .addCase(addAnnonce.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.myAnnonces = null
      })
      .addCase(deleteAnnonce.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAnnonce.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myAnnonces = state.myAnnonces.filter(ann=>ann.id!==action.payload.id)
      })
      .addCase(deleteAnnonce.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFavourites.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favourites = action.payload
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addFavorite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favourites = [...state.favourites,action.payload.fav]
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favourites = state.favourites.filter(favourite=>favourite.id!==action.payload.id)
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getAllAnnonces.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllAnnonces.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.annonces = action.payload
      })
      .addCase(getAllAnnonces.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(scrapAnnonces.pending, (state) => {
        state.isLoading = true
      })
      .addCase(scrapAnnonces.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myAnnonces = action.payload
      })
      .addCase(scrapAnnonces.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      
  },
})

export const { reset } = annonceSlice.actions
export default annonceSlice.reducer