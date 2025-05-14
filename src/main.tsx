
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Suspense } from 'react'

// Add a loading fallback for the whole app to ensure 3D assets load properly
createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background">Loading KiddieTrade...</div>}>
    <App />
  </Suspense>
);
