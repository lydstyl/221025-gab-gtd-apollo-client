import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../hooks/useAuth"
import useLocalAuth from "../hooks/useLocalAuth"

function AuthProvider({ children }: { children: ReactNode }) {
    const storedAuth = useLocalAuth()
    const navigate = useNavigate()

    const signin = () => {
        navigate("/")
    }

    const signout = () => {
        localStorage.clear()

        navigate("/login") // without refresh so better then window.location.href = "/login"
    }

    const value = { storedAuth, signin, signout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
