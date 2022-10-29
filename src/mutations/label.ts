import { gql } from "@apollo/client"

const ADD_LABEL = gql`
    mutation AddLabel($name: String!, $position: Int!) {
        addLabel(name: $name, position: $position) {
            id
        }
    }
`
const DELETE_LABEL = gql`
    mutation DeleteLabel($id: String!) {
        deleteLabel(id: $id) {
            id
        }
    }
`
export { ADD_LABEL, DELETE_LABEL }
