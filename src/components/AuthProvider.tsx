import { ReactNode } from "react"
import { AuthContext } from "../hooks/useAuth"
import useLocalAuth from "../hooks/useLocalAuth"

function AuthProvider({ children }: { children: ReactNode }) {
    const storedAuth = useLocalAuth()

    let signin = () => {}

    let signout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    let value = { storedAuth, signin, signout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
