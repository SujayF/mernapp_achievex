import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import goalReducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    goals : goalReducer
  },
  devTools: false //disabling redux dev tools
});
