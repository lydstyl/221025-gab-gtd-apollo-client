import { createContext, useContext } from "react"

interface AuthContextType {
    user: any
    signin: (user: string, callback: VoidFunction) => void
    signout: (callback: VoidFunction) => void
}

let AuthContext = createContext<AuthContextType>(null!)

function useAuth() {
    return useContext(AuthContext)
}

export default useAuth
export { AuthContext }
