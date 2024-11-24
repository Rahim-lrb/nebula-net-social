import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const query = new QueryClient({
  defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={query}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
