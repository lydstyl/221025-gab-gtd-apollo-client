import { useMutation } from "@apollo/client"
import { useAtom } from "jotai"
import { Label } from "../types/label"
import { REMOVE_ONE_LABEL_FROM_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"
import { taskDetailIdAtom } from "../store"

function TaskDetailLabels({ labels }: { labels: Label[] }) {
    const [taskDetailId] = useAtom(taskDetailIdAtom)

    const [removeLabel, { loading, error }] = useMutation(
        REMOVE_ONE_LABEL_FROM_TASK,
        {
            refetchQueries: [{ query: GET_TASKS }],
        }
    )
    const handleRemoveLabel = (event: React.SyntheticEvent<EventTarget>) => {
        if (!(event.target instanceof HTMLButtonElement)) {
            return
        }
        removeLabel({
            variables: {
                labelId: event.target.dataset.labelId,
                taskId: taskDetailId,
            },
        })
    }
    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <div className="labels">
            <ul className="flex flex-row">
                {labels.map((label: Label) => (
                    <li key={label.id} className="mr-4 px-2 py-1">
                        <span style={{ backgroundColor: label.color }}>
                            {label.name} pos.[{label.position}]
                        </span>
                        <button
                            data-label-id={label.id}
                            onClick={handleRemoveLabel}
                            className="mx-2 px-2 border-solid border-2 text-blue-500 border-blue-500 rounded"
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TaskDetailLabels
