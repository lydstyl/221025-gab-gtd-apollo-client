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

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>

    if (!data) return <p>There is no data.</p>
    const { link, labels } = data.getTask

    return (
        <>
            <H2>Task detail</H2>
            <a
                className="text-blue-500"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {link}
            </a>
            <UpdateTask task={data.getTask} />
            <TaskDetailLabels labels={labels} />
            <AddLabelToTask />
            <DeleteTask />
        </>
    )
}
export default TaskDetail
