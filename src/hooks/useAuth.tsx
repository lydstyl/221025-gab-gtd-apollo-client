import { createContext, useContext } from "react"
import { AuthContextType } from "../types"

let AuthContext = createContext<AuthContextType>(null!)

function useAuth() {
    return useContext(AuthContext)
}

export default useAuth
export { AuthContext }
