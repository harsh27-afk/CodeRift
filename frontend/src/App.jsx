import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context'

const App = () => {
  return (
    // wrapping AppRoutes in UserProvider helps to provide the state variables in user context  to all the components inside AppRoutes
    <UserProvider>
      <AppRoutes/>
    </UserProvider>
      
    
  )
}

export default App