import { Task as TaskType } from "../types/task"
import useTasks from "../hooks/useTasks"
import AddTask from "../components/AddTask"
import Task from "../components/Task"
import TaskDetail from "../components/TaskDetail"

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
            <div className="flex flex-row mt-8">
                <ul className="basis-1/3">
                    <h2 className="text-xl mb-4">Tasks</h2>
                    {data.getTasks.map((task: TaskType) => (
                        <Task key={task.id} task={task} />
                    ))}
                </ul>
                <div className="basis-2/3">
                    <h2 className="text-xl mb-4">Task detail</h2>
                    <TaskDetail />
                </div>
            </div>
        </>
    )
}

export default TasksPage
