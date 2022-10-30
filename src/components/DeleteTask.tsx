import { useAtom } from "jotai"
import { useMutation } from "@apollo/client"
import { DELETE_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"
import { taskDetailIdAtom } from "../store"

function DeleteTask() {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)

    const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    })
    function handleClick() {
        if (confirm(`Delete task with id ${taskDetailId} ?`)) {
            deleteTask({ variables: { deleteTaskId: taskDetailId } }).then(
                result => {
                    console.log(`gb🚀 ~ deleteTask ~ result`, result)
                    // setTaskDetailId("")
                }
            )
        }
    }
    if (loading) return <p>Submitting...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <button
            onClick={handleClick}
            className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
        >
            Delete task
        </button>
    )
}
export default DeleteTask
