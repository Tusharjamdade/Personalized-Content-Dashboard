import { configureStore } from "@reduxjs/toolkit"
import newsReducer from "./slices/newsSlice"
import recommendationsReducer from "./slices/recommendationsSlice"
import socialReducer from "./slices/socialSlice"
import preferencesReducer from "./slices/preferencesSlice"
import favoritesReducer from "./slices/favoritesSlice"

export const store = configureStore({
  reducer: {
    news: newsReducer,
    recommendations: recommendationsReducer,
    social: socialReducer,
    preferences: preferencesReducer,
    favorites: favoritesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
