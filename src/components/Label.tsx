import { useMutation } from "@apollo/client"
import { DELETE_LABEL } from "../mutations/label"
import { GET_LABELS } from "../queries/label"
import { Label as LabelType } from "../types/label"
import UpdateLabel from "./UpdateLabel"

function Label({ label }: { label: LabelType }) {
    const { id } = label
    const [deleteTask, { data, loading, error }] = useMutation(DELETE_LABEL, {
        variables: { id },
        refetchQueries: [{ query: GET_LABELS }],
    })
    function handleClick() {
        deleteTask({ variables: { id } })
    }
    if (loading) return <p>Submitting...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>

    return (
        <li className={`my-4 flex justify-evenly`}>
            <UpdateLabel label={label} />
            <button
                onClick={handleClick}
                className="my-2 py-2 px-2 border-solid border-2 text-blue-500 border-blue-500 hover:border-blue-700 rounded"
            >
                X
            </button>
        </li>
    )
}
export default Label
