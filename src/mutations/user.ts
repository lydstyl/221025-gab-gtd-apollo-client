import { gql } from "@apollo/client"

const ADD_USER = gql`
    mutation AddUser($email: String, $password: String) {
        addUser(email: $email, password: $password) {
            email
            encryptedPassword
        }
    }
`
const DELETE_USER = gql`
    mutation DeleteUser($email: String) {
        deleteUser(email: $email) {
            email
        }
    }
`

export { ADD_USER, DELETE_USER }
