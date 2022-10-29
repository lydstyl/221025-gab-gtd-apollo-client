import { useEffect } from "react"
import { useAtom } from "jotai"
import { useLazyQuery } from "@apollo/client"
import { taskDetailIdAtom } from "../store"
import { GET_TASK } from "../queries/tasks"
import AddLabelToTask from "./AddLabelToTask"

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
    const { name } = data.getTask
    return (
        <>
            <h2 className="text-xl mb-4">Task detail : {name}</h2>

            <AddLabelToTask />

            <pre>{JSON.stringify(data.getTask, null, 4)}</pre>
        </>
    )
}
export default TaskDetail
