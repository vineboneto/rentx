import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import api from '@/service/api'
import { database } from '@/databases'
import { User as ModelUser } from '@/databases/model/user'

type User = {
  id: string
  user_id: string
  email: string
  name: string
  driver_license: string
  avatar: string
  token: string
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
  const [data, setData] = useState<User>({} as User)

  async function signIn({ email, password }: SignCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      })
      const { token, user } = response.data

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      await database.write(async () => {
        return await database.get<ModelUser>('users').create((newUser) => {
          newUser.user_id = user.id
          newUser.name = user.name
          newUser.email = user.email
          newUser.driver_license = user.driver_license
          newUser.avatar = user.avatar
          newUser.token = token
        })
      })

      setData({ ...user, token })
    } catch (err: any) {
      console.log(err)
      throw new Error(err)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users')
      const response = await userCollection.query().fetch()
      if (response.length) {
        const userData = response[0]._raw as unknown as User
        api.defaults.headers['Authorization'] = `Bearer ${userData.token}`
        setData(userData)
      }
    }
    loadUserData()
  }, [])

  return <AuthContext.Provider value={{ user: data, signIn }}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
