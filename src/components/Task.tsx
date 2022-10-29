import { useAtom } from "jotai"
import { Task as TaskType } from "../types/task"
import { taskDetailIdAtom } from "../store"

function Task({ task }: { task: TaskType }) {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
    const { name } = task
    return (
        <li className="my-4">
            <span
                className="mx-4 cursor-pointer"
                onClick={() => setTaskDetailId(task.id)}
            >
                {name}
            </span>
        </li>
    )
}

export default Task
