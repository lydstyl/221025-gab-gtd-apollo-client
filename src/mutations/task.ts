import { gql } from '@apollo/client'

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
const REMOVE_ONE_LABEL_FROM_TASK = gql`
  mutation RemoveOneLabelFromTask($labelId: String!, $taskId: String!) {
    removeOneLabelFromTask(labelId: $labelId, taskId: $taskId) {
      id
    }
  }
`
const UPDATE_TASK = gql`
  mutation UpdateTask(
    $updateTaskId: String!
    $name: String
    $link: String
    $fixedDate: Date
    $clearFixedDate: Boolean
  ) {
    updateTask(
      id: $updateTaskId
      name: $name
      link: $link
      fixedDate: $fixedDate
      clearFixedDate: $clearFixedDate
    ) {
      id
      user
      name
      link
      fixedDate
    }
  }
`
// const UPDATE_TASKS = gql`
//   mutation UpdateTasks(input: EnableEntitiesInput!) {
//     addTask(name: $name) {
//       id
//     }
//   }

//   mutation UpdateTasks($name: String!) {
//     addTask(name: $name) {
//       id
//     }
//   }

//   type EnableEntitiesInput {
//     entityIds: [ID!]!
//     parentId: ID!
// }
// `

export {
  ADD_TASK,
  DELETE_TASK,
  ADD_ONE_LABEL_TO_TASK,
  UPDATE_TASK,
  REMOVE_ONE_LABEL_FROM_TASK
}
