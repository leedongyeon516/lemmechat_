import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: `https://lemmechat.onrender.com`
})

const baseApiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({})
})

export default baseApiSlice
