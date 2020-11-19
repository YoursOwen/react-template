import React from 'react'
import { renderRoutes } from 'react-router-config'

/**
 * https://stackoverflow.com/questions/47815775/dynamic-imports-for-code-splitting-cause-eslint-parsing-error-import
 */
const { lazy } = React
const Home = lazy(() => import('@src/pages/home'))
const User = lazy(() => import('@src/pages/user'))
const Good = lazy(() => import('@src/pages/good'))

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/good/:id',
    component: Good
  },
  {
    path: '/user',
    component: User,
    exact: true
  }
]

export default renderRoutes(routes)
