import { SetStateAction, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_LABELS } from "../queries/label"
import { Label } from "../types/label"
import Spinner from "./Spinner"
import useSortedLabel from "../hooks/useSortedLabel"
import useAllHotKeys from "../hooks/useAllHotKeys"
import useAddOneLabelToTask from "../hooks/useAddOneLabelToTask"

function AddLabelToTask() {
    const [labelId, setLabelId] = useState<string | null>(null)
    const [addOneLabelToTask, mutationTuple] = useAddOneLabelToTask()
    const { loading, error, data } = useQuery(GET_LABELS)
    const [taskDetailId, sortedLabels, setSortedLabels] = useSortedLabel(
        setLabelId,
        data
    )
    function handleChange(event: {
        target: { value: SetStateAction<string | null> }
    }) {
        setLabelId(event.target.value)
    }
    function handleClick() {
        addOneLabelToTask({ variables: { labelId, taskId: taskDetailId } })
    }

    useAllHotKeys(addOneLabelToTask)
    if (loading || mutationTuple.loading) return <Spinner />
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    if (mutationTuple.error)
        return (
            <p className="text-red-500">Error: {mutationTuple.error.message}</p>
        )
    if (!data) return <p>No data !</p>
    return (
        <>
            <select
                onChange={handleChange}
                className="my-8 bg-stone-300 px-2 py-1 rounded"
            >
                {sortedLabels.map((label: Label) => (
                    <option key={label.id} value={label.id}>
                        {label.name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleClick}
                className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
            >
                Add label
            </button>
        </>
    )
}
export default AddLabelToTask
