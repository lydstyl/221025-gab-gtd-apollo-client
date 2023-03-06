import { StoredAuth } from "../types"

function useLocalAuth() {
    const storedLogin = localStorage.getItem("login")
    const storedAuth: StoredAuth = { user: "", token: "" }
    if (storedLogin) {
        const parsed: StoredAuth = JSON.parse(storedLogin)
        storedAuth.user = parsed.user
        storedAuth.token = parsed.token
    }

    return storedAuth
}

export default useLocalAuth
