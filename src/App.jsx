import React, { Suspense, useDebugValue } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Routes from './router'

function App() {
  return (
    <Suspense fallback={<div>Lodaing</div>}>
      <Router>{Routes}</Router>
    </Suspense>
  )
}

export default App
