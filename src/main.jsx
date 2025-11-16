import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import LecturaProvider from './providers/LecturaProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <LecturaProvider>
        <App />
      </LecturaProvider>
    </PrimeReactProvider>
  </StrictMode>,
)