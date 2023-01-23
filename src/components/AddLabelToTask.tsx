import { SetStateAction, useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useHotkeys } from "react-hotkeys-hook"
import { GET_LABELS } from "../queries/label"
import { Label as LabelType } from "../types/label"
import { GET_TASKS } from "../queries/tasks"
import { ADD_ONE_LABEL_TO_TASK } from "../mutations/task"
import { byPosition } from "../domain"
import Spinner from "./Spinner"
import useSortedLabel from "../hooks/useSortedLabel"

function AddLabelToTask() {
    const [labelId, setLabelId] = useState<string | null>(null)
    const { loading, error, data } = useQuery(GET_LABELS)
    const [taskDetailId, sortedLabels, setSortedLabels] = useSortedLabel(
        setLabelId,
        data
    )
    const [addOneLabelToTask, mutationTuple] = useMutation(
        ADD_ONE_LABEL_TO_TASK,
        {
            refetchQueries: [{ query: GET_TASKS }],
        }
    )

    useEffect(() => {
        if (!data?.getLabels.length) {
            setSortedLabels([])
            return
        }

        if (data?.getLabels) {
            let labels = [...data.getLabels]

            labels = labels.sort(byPosition)

            setLabelId(labels[0].id)
            setSortedLabels(labels)
        }
    }, [data])

    for (let labelPosition = 1; labelPosition <= 9; labelPosition++) {
        useHotkeys(`shift+${labelPosition}`, () => {
            function labelIsInTask(labelIdToCheck: string) {
                const labelIdsInSelectedTask: string[] = []
                const deleteLabelButtons = document.querySelectorAll(
                    ".labels-in-selected-task li [data-label-id]"
                ) as NodeListOf<HTMLButtonElement>
                deleteLabelButtons.forEach(deleteLabelButton => {
                    const deleteButton = deleteLabelButton as HTMLButtonElement
                    const labelId = deleteButton.dataset.labelId as string
                    labelIdsInSelectedTask.push(labelId)
                })
                return labelIdsInSelectedTask.includes(labelIdToCheck)
            }
            const option = document.querySelector(
                `option:nth-child(${labelPosition})`
            ) as HTMLOptionElement
            const labelId = option.value

            const deleteButton = document.getElementById(
                "delete-task-button"
            ) as HTMLButtonElement
            const taskId = deleteButton.dataset.taskId
            if (labelIsInTask(labelId)) {
                const buttonToDeleteLabel = document.querySelector(
                    `[data-label-id="${labelId}"]`
                ) as HTMLButtonElement
                buttonToDeleteLabel.click()
            } else {
                addOneLabelToTask({ variables: { labelId, taskId } })
            }
        })
    }
    function handleChange(event: {
        target: { value: SetStateAction<string | null> }
    }) {
        setLabelId(event.target.value)
    }
    function handleClick() {
        addOneLabelToTask({ variables: { labelId, taskId: taskDetailId } })
    }
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
                {sortedLabels.map((label: LabelType) => (
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
