import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import PortfolioV2 from './pages/PortfolioV2.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/2" element={<PortfolioV2 />} />
    </Routes>
  </BrowserRouter>
);
