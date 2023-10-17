import { configureStore } from "@reduxjs/toolkit";
import { advtApi } from '../services/servises';

export const store = configureStore({
  reducer: {
    [advtApi.reducerPath]: advtApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(advtApi.middleware),
});

export default store;
