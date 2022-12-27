import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Router from './Router'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
   <React.StrictMode>
      <Router />
   </React.StrictMode>,
   document.getElementById('root') as HTMLElement
)

reportWebVitals()
serviceWorkerRegistration.register()
