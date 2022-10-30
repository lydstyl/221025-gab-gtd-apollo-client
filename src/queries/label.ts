import { gql } from "@apollo/client"

// enum Label {
//     collect

//     quick

//     important
//     urgent // fixedDate

//     outside
//     phone

//     recursive
//     support

//     business
//     real estate
//     health
//     social
// }

// importance: Int

const GET_LABELS = gql`
    query GetLabels {
        getLabels {
            id
            name
            position
            color
            tasks {
                id
                name
            }
        }
    }
`
const UPDATE_LABEL = gql`
    mutation UpdateLabel(
        $updateLabelId: String!
        $name: String
        $position: Int
        $color: String
    ) {
        updateLabel(
            id: $updateLabelId
            name: $name
            position: $position
            color: $color
        ) {
            id
        }
    }
`
export { GET_LABELS, UPDATE_LABEL }
