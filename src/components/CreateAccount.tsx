import { useRef } from "react"

import { useMutation } from "@apollo/client"
import { ADD_USER } from "../mutations/user"
import H2 from "./H2"

function CreateAccount() {
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [addUser, { loading, error, data }] = useMutation(ADD_USER)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        addUser({
            variables: { email, password },
        })
        alert(`Account created ! You can now login with account ${email}.`)
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
        <>
            <H2>Create account</H2>
            <form
                onSubmit={handleSubmit}
                className="bg-stone-200 border-2 rounded mb-4 p-4 -mx-4 sm:flex justify-center"
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
                    Create account
                </button>
            </form>
        </>
    )
}
export default CreateAccount
