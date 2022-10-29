import useTasks from "../hooks/useTasks"
import AddTask from "../components/AddTask"
import Task from "../components/Task"

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
                {data.getTasks.map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </ul>
        </>
    )
}

export default TasksPage
