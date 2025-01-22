import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/routes.jsx'
import { ThemeProvider } from '@material-tailwind/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
