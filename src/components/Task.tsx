import { useAtom } from "jotai"
import dayjs from "dayjs"

import { Task as TaskType } from "../types/task"
import { taskDetailIdAtom } from "../store"

function Task({ task }: { task: TaskType }) {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
    const { id, name, link, fixedDate, labels } = task

    return (
        <li
            className="my-1 border bg-stone-100 ml-4 cursor-pointer"
            onClick={() => setTaskDetailId(id)}
        >
            {fixedDate && (
                <p className="inline-block bg-stone-300 px-2">
                    {dayjs(new Date(fixedDate)).format("YYYY-MM-DD")}
                </p>
            )}

            {labels &&
                labels.map(label => (
                    <p
                        key={label.id}
                        style={{ backgroundColor: label.color }}
                        className="inline-block h-full w-8 px2 ml-0 text-center"
                    >
                        {label.position}
                    </p>
                ))}
            <p className="inline-block ml-2">{name}</p>
        </li>
    )
}

export default Task
