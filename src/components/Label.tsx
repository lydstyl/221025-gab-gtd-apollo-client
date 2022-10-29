import { useMutation } from "@apollo/client"
import { DELETE_LABEL } from "../mutations/label"
import { GET_LABELS } from "../queries/label"
import { Label as LabelType } from "../types/label"

function Label({ label }: { label: LabelType }) {
    const { id, name, position, color } = label
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
        <li style={{ borderColor: ` ${color}` }} className={`my-4 border-b-4 `}>
            <span className="mx-4 border-l-6">{name}</span>
            <span className="mx-4">position: {position}</span>
            <span className="mx-4">{color}</span>
            <button
                onClick={handleClick}
                className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 hover:border-blue-700 rounded"
            >
                X
            </button>
        </li>
    )
}
export default Label
