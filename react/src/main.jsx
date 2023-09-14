import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import RouteApp from './router'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <RouteApp/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
