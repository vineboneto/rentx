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
  signOut: () => Promise<void>
  updateUser: (user: User) => Promise<void>
  loading: boolean
}

type Props = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

function AuthProvider({ children }: Props) {
  const [data, setData] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)

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

  async function signOut() {
    try {
      await database.write(async () => {
        const userSelected = await database.get<ModelUser>('users').find(data.id)
        if (userSelected) {
          await userSelected.destroyPermanently()
          setData({} as User)
        }
      })
    } catch (err: any) {
      console.log(err)
      throw new Error(err)
    }
  }

  async function updateUser(user: User) {
    try {
      await database.write(async () => {
        const userSelected = await database.get<ModelUser>('users').find(user.id)
        await userSelected.update((userData) => {
          userData.name = user.name
          userData.driver_license = user.driver_license
          userData.avatar = user.avatar
        })
      })
      setData(user)
    } catch (err: any) {
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
        setLoading(false)
      }
    }
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser, loading }}>{children}</AuthContext.Provider>
  )
}

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
