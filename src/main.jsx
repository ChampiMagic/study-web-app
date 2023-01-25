// React imports
import React from 'react'
import ReactDOM from 'react-dom/client'

// Redux imports
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './redux/store.js'

// Global ccomponent import
import App from './App'

// React-router import
import { BrowserRouter } from 'react-router-dom'

//  Others
import axios from 'axios'

const persistor = persistStore(store)

axios.defaults.baseURL = import.meta.env.VITE_DEV_API_URL || 'http://localhost:3000/api'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
