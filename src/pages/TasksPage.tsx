import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import AddTask from "../components/AddTask"
import H2 from "../components/H2"
import TaskDetail from "../components/TaskDetail"
import TaskList from "../components/TaskList"

function TasksPage() {
    const [hidden, setHidden] = useState(false)

    useHotkeys("shift+H", () => {
        const wrapper = document.querySelector(
            ".tasks-mutations-wrapper"
        ) as HTMLDivElement
        const mutations = document.querySelector(
            ".tasks-mutations"
        ) as HTMLDivElement

        function isHidden() {
            return mutations.style.display === "none"
        }

        mutations.style.display =
            mutations.style.display === "none" ? "block" : "none"
        wrapper.style.display = isHidden() ? "block" : "flex"
    })

    return (
        <>
            <H2>Tasks</H2>

            <div className="tasks-mutations-wrapper sm:flex sm:flex-row mt-8 ">
                {!hidden && (
                    <div className="tasks-mutations basis-1/2 px-4 rounded">
                        <AddTask />

                        <TaskDetail />
                    </div>
                )}

                <TaskList />
            </div>
        </>
    )
}

export default TasksPage
