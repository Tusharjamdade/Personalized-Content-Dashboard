import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface NewsArticle {
  id: string
  title: string
  description: string
  url: string
  image: string
  source: string
  publishedAt: string
  category: string
}

interface NewsState {
  articles: NewsArticle[]
  trending: NewsArticle[]
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
}

const initialState: NewsState = {
  articles: [],
  trending: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
}

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ categories, page }: { categories: string[]; page: number }) => {
    const category = categories.join(",") || "technology"
    const response = await fetch(`/api/news?category=${category}&page=${page}`)
    if (!response.ok) throw new Error("Failed to fetch news")
    return response.json()
  },
)

export const fetchTrending = createAsyncThunk("news/fetchTrending", async () => {
  const response = await fetch("/api/news/trending")
  if (!response.ok) throw new Error("Failed to fetch trending news")
  return response.json()
})

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNews: (state) => {
      state.articles = []
      state.page = 1
      state.hasMore = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false
        state.articles =
          action.meta.arg.page === 1 ? action.payload.articles : [...state.articles, ...action.payload.articles]
        state.page = action.meta.arg.page
        state.hasMore = action.payload.hasMore
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch news"
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending = action.payload.articles
      })
  },
})

export const { resetNews } = newsSlice.actions
export default newsSlice.reducer
