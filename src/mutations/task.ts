import { gql } from "@apollo/client"

const ADD_TASK = gql`
    mutation AddTask($name: String!) {
        addTask(name: $name) {
            id
        }
    }
`

export { ADD_TASK }
