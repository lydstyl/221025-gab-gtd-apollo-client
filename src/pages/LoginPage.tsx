import { useRef } from "react"
import { useAtom } from "jotai"

import { isAuthenticatedAtom } from "../store"

// import { useNavigate } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { LOGIN } from "../queries/login"

function LoginPage() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom)

    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [getLogin, { loading, error, data }] = useLazyQuery(LOGIN)
    // const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        getLogin({
            variables: { email, password },
        })
        console.log("xxxxxx", error)
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

        // console.log("go to task")

        // navigate("/tasks")
        // document.location.href = "/tasks"
        // console.log("redirect to /tasks with context or jotai ?")

        // setIsAuthenticated(true)

        return <p>user and token stored !</p>
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-stone-200 p-4 -mx-4 sm:flex justify-center"
        >
            <input
                ref={email}
                className="my-4 px-4 rounded"
                type="text"
                name="email"
                placeholder="email"
            />
            <input
                ref={password}
                className="my-4 sm:ml-4 px-4 rounded"
                type="password"
                name="password"
                placeholder="password"
            />
            <button
                className="my-4 sm:mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                type="submit"
            >
                Submit
            </button>
        </form>
    )
}

export default LoginPage
