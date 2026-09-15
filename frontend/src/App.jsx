import React from 'react'
import router from './app.routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.context.jsx'


function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App