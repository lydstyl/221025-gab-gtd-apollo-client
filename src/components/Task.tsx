import { useAtom } from "jotai"
import { Task as TaskType } from "../types/task"
import { taskDetailIdAtom } from "../store"

function Task({ task }: { task: TaskType }) {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
    const { name } = task
    return (
        <li className="my-4 flex h-6">
            {task.labels &&
                task.labels.map(label => (
                    <p
                        style={{ backgroundColor: label.color }}
                        className="inlinebox h-full w-4"
                    ></p>
                ))}
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
