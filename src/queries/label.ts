import { gql } from "@apollo/client"

const GET_LABELS = gql`
    query GetLabels {
        getLabels {
            id
            name
            tasks {
                id
                name
            }
        }
    }
`
export { GET_LABELS }
