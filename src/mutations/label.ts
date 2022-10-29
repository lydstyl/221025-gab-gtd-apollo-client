import { gql } from "@apollo/client"

const ADD_LABEL = gql`
    mutation AddLabel($name: String!, $position: Int!) {
        addLabel(name: $name, position: $position) {
            id
        }
    }
`
export { ADD_LABEL }
