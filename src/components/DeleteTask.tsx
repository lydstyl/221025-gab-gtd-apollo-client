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
                    // console.log(`gb🚀 ~ deleteTask ~ result`, result)
                    // setTaskDetailId("")
                }
            )
        }
    }
    if (loading) return <p>Submitting...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <div className="bg-stone-400 -mx-4 p-4 rounded">
            <button
                onClick={handleClick}
                className="block m-auto px-4 border-solid border-2 text-red-500 border-red-500 rounded"
            >
                Delete task
            </button>
        </div>
    )
}
export default DeleteTask
