import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function LoginPage() {
    let navigate = useNavigate()
    let location = useLocation()
    let auth = useAuth()

    let from = location.state?.from?.pathname || "/"

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        let formData = new FormData(event.currentTarget)
        let user = formData.get("email") as string

        auth.signin(user, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true })
        })
    }

    return (
        <div>
            <p>You must log in to view the page at {from}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    E-mail: <input name="email" type="text" />
                </label>{" "}
                <label>
                    Password: <input name="password" type="text" />
                </label>{" "}
                <button
                    type="submit"
                    className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
