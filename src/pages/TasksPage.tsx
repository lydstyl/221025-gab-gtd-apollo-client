import AddTask from "../components/AddTask"
import H2 from "../components/H2"
import TaskDetail from "../components/TaskDetail"
import TaskList from "../components/TaskList"

function TasksPage() {
    return (
        <>
            <H2>Tasks</H2>
            <div className="flex flex-row mt-8 ">
                <TaskList />
                <div className="basis-1/2 bg-stone-100 p-4 rounded">
                    <AddTask />

                    <TaskDetail />
                </div>
            </div>
        </>
    )
}

export default TasksPage
