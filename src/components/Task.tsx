import { useAtom } from "jotai"
import dayjs from "dayjs"

import { Task as TaskType } from "../types/task"
import { taskDetailIdAtom } from "../store"

function Task({ task }: { task: TaskType }) {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
    const { id, name, link, fixedDate, labels } = task

    return (
        <li className="my-4 flex h-6">
            {fixedDate && (
                <p>{dayjs(new Date(fixedDate)).format("YYYY-MM-DD")}</p>
            )}

            {labels &&
                labels.map(label => (
                    <p
                        key={label.id}
                        style={{ backgroundColor: label.color }}
                        className="inlinebox h-full w-6 ml-2 text-center"
                    >
                        {label.position}
                    </p>
                ))}
            <span
                className="mx-4 cursor-pointer"
                onClick={() => setTaskDetailId(id)}
            >
                {name}
            </span>
        </li>
    )
}

export default Task
