import { useMutation } from "@apollo/client"
import { useAtom } from "jotai"
import { DELETE_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"
import { Task as TaskType } from "../types/task"
import { taskDetailIdAtom } from "../store"

function Task({ task }: { task: TaskType }) {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
    const { name } = task
    const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    })
    function handleClick() {
        deleteTask({ variables: { deleteTaskId: task.id } })
    }
    if (loading) return <p>Submitting...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <li className="my-4">
            <span
                className="mx-4 cursor-pointer"
                onClick={() => setTaskDetailId(task.id)}
            >
                {name}
            </span>
            <button
                onClick={handleClick}
                className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
            >
                X
            </button>
        </li>
    )
}

export default Task

import React from "react"
