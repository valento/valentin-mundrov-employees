import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import './App.css'
import App from './App'

const Root = (
//  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
//  </Provider>
)

ReactDOM.render( Root, document.getElementById('root') )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
