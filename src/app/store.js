import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import annonceReducer from '../features/annonces/annonceSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    annonce:annonceReducer
  },
});
