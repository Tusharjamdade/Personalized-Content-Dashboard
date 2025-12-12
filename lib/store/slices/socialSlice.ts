import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface SocialPost {
  id: string
  username: string
  avatar: string
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
  hashtags: string[]
}

interface SocialState {
  posts: SocialPost[]
  loading: boolean
  error: string | null
}

const initialState: SocialState = {
  posts: [],
  loading: false,
  error: null,
}

export const fetchSocialPosts = createAsyncThunk("social/fetchPosts", async (hashtag: string) => {
  const response = await fetch(`/api/social?hashtag=${hashtag}`)
  if (!response.ok) throw new Error("Failed to fetch social posts")
  return response.json()
})

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSocialPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload.posts
      })
      .addCase(fetchSocialPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch social posts"
      })
  },
})

export default socialSlice.reducer
