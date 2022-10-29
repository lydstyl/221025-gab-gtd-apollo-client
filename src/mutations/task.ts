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
const ADD_ONE_LABEL_TO_TASK = gql`
    mutation AddOneLabelToTask($labelId: String!, $taskId: String!) {
        addOneLabelToTask(labelId: $labelId, taskId: $taskId) {
            id
            name
        }
    }
`
const UPDATE_TASK = gql`
    mutation UpdateTask(
        $updateTaskId: String!
        $name: String
        $link: String
        $fixedDate: String
    ) {
        updateTask(
            name: $name
            link: $link
            fixedDate: $fixedDate
            id: $updateTaskId
        ) {
            id
            user
            name
            link
            fixedDate
        }
    }
`
export { ADD_TASK, DELETE_TASK, ADD_ONE_LABEL_TO_TASK, UPDATE_TASK }
