import React, { createContext, useContext, useEffect, useState } from 'react'
import { parseToken } from './auth'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const parsed = parseToken()
    if (parsed) setUser(parsed)
  }, [])

  const login = (token) => {
    
    localStorage.setItem("token", token)
    const parsed = parseToken()
    setUser(parsed) 
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
