import React, { createContext, FunctionComponent, useState, useEffect } from 'react'
import { User } from '../interfaces/User'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApolloClient from 'apollo-client'

const UserContext = createContext<{
    user: User
    token: string
    isAuthenticated: boolean
    loading: boolean
    login(token: string, user: User, checkBox: boolean): Promise<void>
    logout(): Promise<void>
}>({
    user: null,
    token: '',
    isAuthenticated: false,
    loading: false,
    login: async () => null,
    logout: async () => null
})

const UserProvider: FunctionComponent<{
client
}> = ({ client, children }) => {
    const [user, setUser] = useState<User>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const login = async (token: string, user: User, checkBox: boolean): Promise<void> => {
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', JSON.stringify(user))
        await AsyncStorage.setItem('saveUser', checkBox.toString())

        setIsAuthenticated(true)
        setUser(user)
        setToken(token)
        await client.resetStore();
    }

    const logout = async (): Promise<void> => {
        await AsyncStorage.clear()

        setIsAuthenticated(false)
        setUser(null)
        setToken('')
    }

    const checkFromCache = async (): Promise<void> => {
        const saveUser = JSON.parse(await AsyncStorage.getItem('saveUser'))

        if(saveUser){
            const token = await AsyncStorage.getItem('token')
            const user = await AsyncStorage.getItem('user')
            
            if (!!token) {
                setIsAuthenticated(true)
                setToken(token)
                setUser(JSON.parse(user))
            } else {
                setIsAuthenticated(false)
                setUser(null)
                setToken('')
            }
            
        }else {
            setIsAuthenticated(false)
            setUser(null)
            setToken('')
        }
        setLoading(false)
    }

    useEffect(() => {
        checkFromCache()
    }, [])

    return (
        <UserContext.Provider value={{
            user,
            token,
            isAuthenticated,
            login,
            logout,
            loading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserProvider,
    UserContext
}