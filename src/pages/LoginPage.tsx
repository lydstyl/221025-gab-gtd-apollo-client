import { useAtom } from "jotai"

import { isAuthenticatedAtom } from "../store"

import Login from "../components/Login"
import Button from "../components/Button"
import CreateAccount from "../components/CreateAccount"
import DeleteAccount from "../components/DeleteAccount"

const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
}

function LoginPage() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom)

    return (
        <div>
            <Login />

            <h2>Disconnect</h2>
            <Button options={{ onClick: handleLogout }}>Logout</Button>

            <CreateAccount />

            <DeleteAccount />
        </div>
    )
}

export default LoginPage
