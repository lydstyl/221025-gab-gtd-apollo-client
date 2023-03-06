import useAuth from "../hooks/useAuth"

function AuthStatus() {
    let auth = useAuth()

    if (!auth.storedAuth.user) {
        return <p>You are not logged in.</p>
    }

    return (
        <p>
            Welcome {auth.storedAuth.user}!{" "}
            <button
                onClick={() => {
                    auth.signout()
                }}
            >
                Sign out
            </button>
        </p>
    )
}

export default AuthStatus
