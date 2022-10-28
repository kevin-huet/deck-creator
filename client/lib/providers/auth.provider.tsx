import {createContext, ReactNode, useEffect, useState} from "react";

const defaultAuthValue = {
    username: undefined,
    isLogged: false,
    roles: []
};


type Props = {
    children: ReactNode
}

export type AuthUser = {
    username?: string
    isLogged?: boolean
    roles?: Array<any>
}

type AuthContext = {
    auth: AuthUser
    setAuth: Function
    login: Function
    register: Function
    logout: Function
    isLogged: Function
}

export const AuthContext = createContext<AuthContext>({
    login: () => {
    },
    logout: () => {
    },
    register: () => {
    },
    isLogged: () => {
    },
    setAuth: () => {
    },
    auth: {
        username: undefined,
        isLogged: false,
        roles: []
    },
});
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: Props) => {
    const [auth, setAuth] = useState<AuthUser>(defaultAuthValue);
    const login = (obj: AuthUser) => {
        setAuth(obj);
    }
    const logout = () => {
        fetch('http://localhost:8000/api/auth/logout', {
            credentials: 'include'
        }).then(res => res.json()).then(r => {
            setAuth(defaultAuthValue);
        });
    }
    const register = () => {

    }
    const isLogged = () => {

    }
    const getUser = () => {
        return fetch('http://localhost:8000/api/auth/user', {
            credentials: 'include'
        });
    }
    useEffect(() => {
            getUser().then(r => {
                if (r.ok) {
                    return r.json()
                }
                throw new Error('Error')
            }).then(data => {
           //     console.log(data);
                setAuth({
                    username: data?.user?.username,
                    isLogged: true,
                })
            }).catch(() => {
                setAuth(defaultAuthValue);
                window.localStorage.removeItem('_data');
            })
    }, []);
//2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false.
//This function will be executed every time component is mounted (every time the user refresh the page);
    return (
        <AuthContext.Provider
            value={{auth, setAuth, login, logout, register, isLogged}}>
            {children}
        </AuthContext.Provider>
    )
}