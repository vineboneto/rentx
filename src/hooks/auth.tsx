import React, { createContext, useState, useContext, ReactNode } from 'react'
import api from '@/service/api'

type User = {
  id: string
  email: string
  name: string
  driver_license: string
  avatar: string
}

type AuthState = {
  token: string
  user: User
}

type SignCredentials = {
  email: string
  password: string
}

type AuthContextProps = {
  user: User
  signIn: (credentials: SignCredentials) => Promise<void>
}

type Props = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

function AuthProvider({ children }: Props) {
  const [data, setData] = useState<AuthState>({} as AuthState)

  async function signIn({ email, password }: SignCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      })
      const { token, user } = response.data
      setData({ token, user })
      api.defaults.headers['Authorization'] = `Bearer ${token}`
    } catch (err) {}
  }

  return <AuthContext.Provider value={{ user: data.user, signIn }}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
