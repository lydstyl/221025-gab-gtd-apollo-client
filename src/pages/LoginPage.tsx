import { useAtom } from "jotai"

import { useEffect } from "react"
import { hasLoginInLocalStorage } from "../store"
import Login from "../components/Login"
import Button from "../components/Button"
import CreateAccount from "../components/CreateAccount"
import DeleteAccount from "../components/DeleteAccount"

const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
}

function LoginPage() {
    const [hasLoginStored, setHasLoginStored] = useAtom(hasLoginInLocalStorage)

    useEffect(() => {
        if (localStorage.getItem("login")) {
            setHasLoginStored(true)
        }
    }, [])

    return (
        <div>
            {!hasLoginStored && <Login />}

            {hasLoginStored && (
                <>
                    <h2>Disconnect</h2>
                    <Button options={{ onClick: handleLogout }}>Logout</Button>
                </>
            )}

            {!hasLoginStored && <CreateAccount />}

            {hasLoginStored && <DeleteAccount />}
        </div>
    )
}

export default LoginPage
