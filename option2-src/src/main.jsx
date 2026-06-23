import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Widget from './App.jsx'
createRoot(document.getElementById('root')).render(<StrictMode><Widget /></StrictMode>)
