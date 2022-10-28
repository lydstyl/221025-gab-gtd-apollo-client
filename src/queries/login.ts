import { gql } from "@apollo/client"

const LOGIN = gql`
    query Login($email: String, $password: String) {
        login(email: $email, password: $password) {
            user
            token
        }
    }
`

export { LOGIN }
