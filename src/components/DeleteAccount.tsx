import { useMutation } from "@apollo/client"
import { DELETE_USER } from "../mutations/user"
import Button from "./Button"
import H2 from "./H2"

function DeleteAccount() {
    const [deleteUser, { loading, error, data }] = useMutation(DELETE_USER)

    const handleDeleteAccount = () => {
        const storedLogin = localStorage.getItem("login")
        if (!storedLogin) {
            alert("Yout have to login first !")
            return
        }

        const email: string = JSON.parse(storedLogin).user
        if (!email) {
            alert("Your login session has no email !")
            return
        }

        deleteUser({
            variables: { email },
            onCompleted: data => {
                localStorage.clear()
                alert(`User ${email} is now deleted !`)
                window.location.href = "/"
            },
        })
    }

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        console.log(error)
        return <p>{error.message}</p>
    }
    return (
        <>
            <H2>Delete account</H2>
            <Button options={{ onClick: handleDeleteAccount }}>
                Delete my account
            </Button>
        </>
    )
}
export default DeleteAccount
