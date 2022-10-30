import { gql } from "@apollo/client"

const GET_TASKS = gql`
    query GetTasks {
        getTasks {
            id
            name
            link
            fixedDate
            labels {
                id
                name
                position
                color
            }
        }
    }
`
const GET_TASK = gql`
    query GetTask($id: String!) {
        getTask(id: $id) {
            id
            name
            link
            fixedDate
            labels {
                id
                name
                position
                color
            }
        }
    }
`

export { GET_TASKS, GET_TASK }
