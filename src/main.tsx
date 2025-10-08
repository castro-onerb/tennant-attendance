import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalModalProvider } from './components/Modal/provider/modal-provider';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalModalProvider>
        <App />
      </GlobalModalProvider>
    </BrowserRouter>
  </StrictMode>,
);
