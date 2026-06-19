import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Log } from './utils/logger';
import Home from './pages/Home';
import Products from './pages/Products';
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function RouteLogger() {
  const location = useLocation();
  useEffect(() => {
    Log('page', 'info', 'Router', `Navigated to ${location.pathname}`);
  }, [location]);
  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <RouteLogger />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
