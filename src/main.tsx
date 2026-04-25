import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'   // ← dapat may 'styles/' prefix!
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)