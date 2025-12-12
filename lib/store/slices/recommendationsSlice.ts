import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface Recommendation {
  id: string
  title: string
  description: string
  image: string
  type: "movie" | "music"
  rating: number
  year?: number
  artist?: string
}

interface RecommendationsState {
  items: Recommendation[]
  loading: boolean
  error: string | null
}

const initialState: RecommendationsState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchRecommendations = createAsyncThunk("recommendations/fetch", async (type: "movie" | "music") => {
  const response = await fetch(`/api/recommendations?type=${type}`)
  if (!response.ok) throw new Error("Failed to fetch recommendations")
  return response.json()
})

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.recommendations
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch recommendations"
      })
  },
})

export default recommendationsSlice.reducer
