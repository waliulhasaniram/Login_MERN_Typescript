import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contextAPI/Store.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient()}>
  <AuthProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthProvider>
  </QueryClientProvider>
)
