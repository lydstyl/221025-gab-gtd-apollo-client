import { gql } from "@apollo/client"

const ADD_TASK = gql`
    mutation AddTask($name: String!) {
        addTask(name: $name) {
            id
        }
    }
`
const DELETE_TASK = gql`
    mutation DeleteTask($deleteTaskId: String!) {
        deleteTask(id: $deleteTaskId) {
            id
        }
    }
`

export { ADD_TASK, DELETE_TASK }
