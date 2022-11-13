import { useAtom } from "jotai"
import dayjs from "dayjs"
import { Task as TaskType } from "../types/task"
import { taskDetailIdAtom } from "../store"

function Task({ task }: { task: TaskType }) {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
    const { id, name, link, fixedDate, labels } = task

    const liClasses = `${
        taskDetailId === id
            ? "selected-task border-red-500 border-b-8 border-r-8"
            : ""
    } even:bg-stone-100 odd:bg-stone-300 sm:ml-4 cursor-pointer`

    return (
        <li className={liClasses} onClick={() => setTaskDetailId(id)}>
            {fixedDate && (
                <p className="fixed-date inline-block bg-stone-400 px-2">
                    {dayjs(new Date(fixedDate)).format("YYYY-MM-DD")}
                </p>
            )}

            {labels &&
                labels.map(label => (
                    <p
                        key={label.id}
                        style={{ backgroundColor: label.color }}
                        className="label inline-block h-full w-8 text-center"
                    >
                        {label.position}
                    </p>
                ))}
            <p className="name inline-block ml-2">{name}</p>
        </li>
    )
}

export default Task
