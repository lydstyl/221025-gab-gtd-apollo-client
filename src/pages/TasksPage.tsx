import AddTask from "../components/AddTask"
import TaskDetail from "../components/TaskDetail"
import TaskList from "../components/TaskList"

function TasksPage() {
    return (
        <div className="flex flex-row mt-8 ">
            <TaskList />
            <div className="basis-1/2 bg-stone-100 p-4 rounded">
                <AddTask />

                <TaskDetail />
            </div>
        </div>
    )
}

export default TasksPage
