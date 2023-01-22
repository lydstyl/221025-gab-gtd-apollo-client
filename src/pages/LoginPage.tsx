import { useAtom } from "jotai"

import { isAuthenticatedAtom } from "../store"

import Login from "../components/Login"
import Button from "../components/Button"

const handleLogout = () => {
    localStorage.clear()
}

function LoginPage() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom)

    return (
        <div>
            <Login />
            <Button options={{ onClick: handleLogout }}>Logout</Button>
        </div>
    )
}

export default LoginPage
