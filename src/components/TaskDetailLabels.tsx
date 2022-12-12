import { useMutation } from "@apollo/client"
import { useAtom } from "jotai"
import { Label } from "../types/label"
import { REMOVE_ONE_LABEL_FROM_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"
import { taskDetailIdAtom } from "../store"
import Spinner from "./Spinner"

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
    if (loading) return <Spinner />
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <ul className="labels-in-selected-task">
            {labels.map((label: Label) => (
                <li
                    key={label.id}
                    className="my-1 mr-6 inline-block leading-8 text-center w-50"
                >
                    <button
                        data-label-id={label.id}
                        onClick={handleRemoveLabel}
                        className="h-full h-12 mx-2 px-2 border-solid border-2 text-blue-500 border-blue-500 rounded"
                    >
                        X
                    </button>
                    <p
                        style={{ backgroundColor: label.color }}
                        className="h-full inline-block p-2 rounded"
                    >
                        {label.name} pos.[{label.position}]
                    </p>
                </li>
            ))}
        </ul>
    )
}
export default TaskDetailLabels
