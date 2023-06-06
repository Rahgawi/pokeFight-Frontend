import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import '@fontsource/luckiest-guy';
import '@fontsource/kanit';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0000',
      dark: '#CC0000',
    },
    secondary: {
      main: '#FFDE00',
      dark: '#B3A125',
      blue: '#3B4CCA',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Kanit', '"Luckiest Guy"'].join(','),
    gameHeader: {
      fontSize: '3rem',
      fontFamily: '"Luckiest Guy"',
    },
    gameStats: {
      fontSize: '1rem',
      fontFamily: 'Kanit',
    },
    gameStatsWhite: {
      fontSize: '1rem',
      fontFamily: 'Kanit',
      color: 'white',
    },
    h1: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          gameHeader: 'h1',
        },
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
