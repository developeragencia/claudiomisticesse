import axios from 'axios'

// Configurar base URL da API
// Em produção, usa o mesmo domínio (mesmo servidor)
// Em desenvolvimento, usa localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '' : 'http://localhost:5000')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

// Helper para URLs de imagens
export const getImageUrl = (path) => {
  if (!path) return '/logo.svg'
  if (path.startsWith('http')) return path
  const baseUrl = import.meta.env.VITE_API_URL || ''
  return `${baseUrl}${path}`
}

