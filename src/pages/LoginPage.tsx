import Login from "../components/Login"
import Button from "../components/Button"
import CreateAccount from "../components/CreateAccount"
import DeleteAccount from "../components/DeleteAccount"
import useHasLoginStored from "../hooks/useHasLoginStored"

const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
}

function LoginPage() {
    const [hasLoginStored, setHasLoginStored] = useHasLoginStored()

    if (hasLoginStored) {
        return (
            <>
                <h2>Disconnect</h2>
                <Button options={{ onClick: handleLogout }}>Logout</Button>

                <DeleteAccount />
            </>
        )
    }

    return (
        <>
            <Login />

            <CreateAccount />
        </>
    )
}

export default LoginPage
