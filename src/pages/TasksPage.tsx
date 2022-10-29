import useTasks from "../hooks/useTasks"
import AddTask from "../components/AddTask"
import Task from "../components/Task"
import { Task as TaskType } from "../types/task"

function TasksPage() {
    const { loading, error, data } = useTasks()

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <>
            <AddTask />
            <ul>
                {data.getTasks.map((task: TaskType) => (
                    <Task key={task.id} task={task} />
                ))}
            </ul>
        </>
    )
}

export default TasksPage
