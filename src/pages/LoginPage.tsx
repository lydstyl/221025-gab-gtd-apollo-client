import { gql, useQuery } from "@apollo/client"

const GET_LOCATIONS = gql`
    query GetLocations {
        locations {
            id
            name
            description
            photo
        }
    }
`

const LOGIN = gql`
    query Login($email: String, $password: String) {
        login(email: $email, password: $password) {
            user
            token
        }
    }
`

function LoginPage() {
    // const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    //     variables: { breed },
    //   });
    const email = "lydstyl@gmail.com"
    const password = "papass"
    const { loading, error, data } = useQuery(LOGIN, {
        variables: { email, password },
    })

    if (!loading && !error && data) {
        console.log(
            `gb🚀 ~ LoginPage ~ data`,
            data.login.user,
            data.login.token
        )

        const { user, token } = data.login

        localStorage.setItem("login", JSON.stringify({ user, token }))
    }

    return <div>LoginPage</div>
}

export default LoginPage
