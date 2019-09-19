import axios from 'axios'

const BASE_URL = 'http://localhost:3000' // process.env.API

export const API_FE = axios.create({
  baseURL: BASE_URL
})
