import React from 'react'
import ReactDOM from 'react-dom/client'
// Components
import App from './App.tsx'
// Custom Context
import { SnackbarProvider } from './Context/SnackbarContext.tsx';
// Styles
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
)
