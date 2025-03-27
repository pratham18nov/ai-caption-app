import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { applyTheme } from './theme.js'
import UserProvider from './context/UserContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'

applyTheme()

createRoot(document.getElementById('root')).render(
  //uncomment StrictMode in production
  <Provider store={store}>
    <UserProvider>
      <StrictMode> 
        <App />
      </StrictMode>
    </UserProvider>
  </Provider>
  
)


