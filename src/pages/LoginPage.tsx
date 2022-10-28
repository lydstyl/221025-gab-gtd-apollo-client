import { gql, useQuery } from "@apollo/client"

const LOGIN = gql`
    query Login($email: String, $password: String) {
        login(email: $email, password: $password) {
            user
            token
        }
    }
`

function LoginPage() {
    const email = "lydstyl@gmail.com"
    const password = "papass"

    const { loading, error, data } = useQuery(LOGIN, {
        variables: { email, password },
    })

    if (!loading && !error && data) {
        const { user, token } = data.login

        localStorage.setItem("login", JSON.stringify({ user, token }))
    }

    return <div>LoginPage</div>
}

export default LoginPage
