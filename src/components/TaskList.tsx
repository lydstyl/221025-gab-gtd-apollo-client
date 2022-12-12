import { useEffect, useState } from "react"
import { Task as TaskType } from "../types/task"
import useTasks from "../hooks/useTasks"
import Task from "../components/Task"
import { byPosition, getMyTasksCustomlySorted } from "../domain"
import Spinner from "./Spinner"

function TaskList() {
    const { loading, error, data } = useTasks()
    const [tasks, setTasks] = useState<TaskType[]>([])

    useEffect(() => {
        if (data?.getTasks) {
            const initialTasks: TaskType[] = [...data.getTasks]

            const sortedTasks: TaskType[] =
                getMyTasksCustomlySorted(initialTasks)

            let sortedTasksWithSortedLabels = [...sortedTasks]
            sortedTasksWithSortedLabels = sortedTasks.map(task => {
                const labels = [...task.labels]
                const sortedLabels = labels.sort(byPosition)
                const newTask = { ...task }
                newTask.labels = sortedLabels

                return newTask
            })

            setTasks(sortedTasksWithSortedLabels)
        }
    }, [data])

    if (loading) return <Spinner />
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <ul className="sm:basis-1/2">
            {tasks.map((task: TaskType) => (
                <Task key={task.id} task={task} />
            ))}
        </ul>
    )
}
export default TaskList
