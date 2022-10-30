import { SetStateAction, useEffect, useState } from "react"
import { useAtom } from "jotai"
import { useMutation, useQuery } from "@apollo/client"
import { GET_LABELS } from "../queries/label"
import { Label as LabelType } from "../types/label"
import { taskDetailIdAtom } from "../store"
import { GET_TASKS } from "../queries/tasks"
import { ADD_ONE_LABEL_TO_TASK } from "../mutations/task"

function AddLabelToTask() {
    const [taskDetailId] = useAtom(taskDetailIdAtom)
    const [labelId, setLabelId] = useState<string | null>(null)
    const { loading, error, data } = useQuery(GET_LABELS)

    const [addOneLabelToTask, mutationTuple] = useMutation(
        ADD_ONE_LABEL_TO_TASK,
        {
            refetchQueries: [{ query: GET_TASKS }],
        }
    )
    useEffect(() => {
        if (data?.getLabels[0]?.id) {
            setLabelId(data.getLabels[0].id)
        }
    }, [data])

    function handleChange(event: {
        target: { value: SetStateAction<string | null> }
    }) {
        setLabelId(event.target.value)
    }
    function handleClick() {
        addOneLabelToTask({ variables: { labelId, taskId: taskDetailId } })
    }
    if (loading || mutationTuple.loading) return <p>Loading...</p>
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
                {data.getLabels.map((label: LabelType) => (
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
