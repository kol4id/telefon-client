import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

import './index.css'
import AppRoutes from './AppRoutes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store = {store}>
      <AppRoutes/>
    </Provider>
  </React.StrictMode>,
)
