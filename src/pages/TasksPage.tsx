import useTasks from "../components/useTasks"

function TasksPage() {
    const { loading, error, data } = useTasks()

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error</p>
    }

    return (
        <ul>
            {data.getTasks.map(task => (
                <li key={task.id}>{JSON.stringify(task)}</li>
            ))}
        </ul>
    )
}

export default TasksPage
