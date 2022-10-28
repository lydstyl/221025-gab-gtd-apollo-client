import { useRef } from "react"
import { useLazyQuery } from "@apollo/client"
import { LOGIN } from "../queries/login"

function LoginPage() {
    const email = useRef()
    const password = useRef()
    const [getLogin, { loading, error, data }] = useLazyQuery(LOGIN)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        getLogin({
            variables: { email, password },
        })
    }

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        console.log(error)
        return <p>{error.message}</p>
    }
    if (!loading && !error && data?.login) {
        const { user, token } = data.login

        localStorage.setItem("login", JSON.stringify({ user, token }))
        return <p>user and token stored !</p>
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                ref={email}
                className="px-4"
                type="text"
                name="email"
                placeholder="email"
            />
            <input
                ref={password}
                className="ml-4 px-4"
                type="text"
                name="password"
                placeholder="password"
            />
            <button
                className="mx-4 px-4 border-solid border-2 border-blue-500 rounded"
                type="submit"
            >
                Submit
            </button>
        </form>
    )
}

export default LoginPage
