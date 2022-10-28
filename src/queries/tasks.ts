import { gql } from "@apollo/client"

const GET_TASKS = gql`
    query GetTasks {
        getTasks {
            id
            name
            labels {
                id
                name
                position
            }
        }
    }
`

export { GET_TASKS }
