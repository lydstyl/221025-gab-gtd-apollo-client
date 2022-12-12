import { useEffect } from "react"
import { useAtom } from "jotai"
import { useLazyQuery } from "@apollo/client"
import { taskDetailIdAtom } from "../store"
import { GET_TASK } from "../queries/tasks"
import AddLabelToTask from "./AddLabelToTask"
import DeleteTask from "./DeleteTask"
import UpdateTask from "./UpdateTask"
import TaskDetailLabels from "./TaskDetailLabels"
import H2 from "./H2"
import Spinner from "./Spinner"

function TaskDetail() {
    const [taskDetailId] = useAtom(taskDetailIdAtom)

    const [getTask, { loading, error, data }] = useLazyQuery(GET_TASK, {
        variables: { id: taskDetailId },
    })

    useEffect(() => {
        if (taskDetailId) {
            getTask()
        }
    }, [taskDetailId])

    if (loading) return <Spinner />
    if (error) return <p className="text-red-500">Error: {error.message}</p>

    if (!data) return <p>There is no data.</p>
    const { link, labels } = data.getTask

    return (
        <>
            <div className="bg-stone-400 -mx-4 p-4 rounded">
                <H2>Task detail</H2>
                {/* <a
                    className="selected-task-link text-blue-500 block overflow-hidden text-ellipsis whitespace-nowrap"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {link}
                </a> */}
                <UpdateTask task={data.getTask} />
            </div>

            <div className="bg-stone-200 p-4 rounded -mx-4 my-4">
                <H2>Task labels</H2>

                <TaskDetailLabels labels={labels} />
                <AddLabelToTask />
            </div>

            <DeleteTask />
        </>
    )
}
export default TaskDetail
