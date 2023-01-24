import Login from "../components/Login"
import Button from "../components/Button"
import CreateAccount from "../components/CreateAccount"
import DeleteAccount from "../components/DeleteAccount"
import useHasLoginStored from "../hooks/useHasLoginStored"
import H2 from "../components/H2"

const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
}

function LoginPage() {
    const [hasLoginStored, setHasLoginStored] = useHasLoginStored()

    if (hasLoginStored) {
        return (
            <>
                <H2>Disconnect</H2>
                <Button options={{ onClick: handleLogout }}>Logout</Button>

                <div className="border-2 rounded bg-stone-200 -mx-4 p-4 mb-4">
                    <DeleteAccount />
                </div>
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
