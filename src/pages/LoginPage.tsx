import { useAtom } from "jotai"

import { isAuthenticatedAtom } from "../store"

import Login from "../components/Login"
import Button from "../components/Button"
import CreateAccount from "../components/CreateAccount"

const handleLogout = () => {
    localStorage.clear()
}

function LoginPage() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom)

    return (
        <div>
            <Login />

            <h2>Disconnect</h2>
            <Button options={{ onClick: handleLogout }}>Logout</Button>

            <CreateAccount />

            <h2>Delete account</h2>
            <p>todo</p>
        </div>
    )
}

export default LoginPage
