import { useEffect, useState } from "react"
import { Task as TaskType } from "../types/task"
import useTasks from "../hooks/useTasks"
import Task from "../components/Task"
import { byCustom } from "../domain"
import H2 from "./H2"

function TaskList() {
    const { loading, error, data } = useTasks()
    const [tasks, setTasks] = useState<TaskType[]>([])

    useEffect(() => {
        if (data?.getTasks) {
            const initialTasks: TaskType[] = [...data.getTasks]

            const sortedTasks: TaskType[] = initialTasks.sort(byCustom)
            setTasks(sortedTasks)
        }
    }, [data])

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <ul className="basis-1/2">
            <H2>Tasks</H2>
            {tasks.map((task: TaskType) => (
                <Task key={task.id} task={task} />
            ))}
        </ul>
    )
}
export default TaskList
