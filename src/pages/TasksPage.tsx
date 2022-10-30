import AddTask from "../components/AddTask"
import TaskDetail from "../components/TaskDetail"
import TaskList from "../components/TaskList"

function TasksPage() {
    return (
        <>
            <AddTask />

            <div className="flex flex-row mt-8">
                <TaskList />

                <TaskDetail />
            </div>
        </>
    )
}

export default TasksPage
