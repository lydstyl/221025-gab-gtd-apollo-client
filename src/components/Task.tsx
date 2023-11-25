import { useAtom } from "jotai"
import dayjs from "dayjs"
import { Task as TaskType } from "../types/task"
import { taskDetailIdAtom } from "../store"

function getClassFromDayOfWeek(dayOfWeek: number) {
    const weekEnd = [0, 6]

    if (weekEnd.includes(dayOfWeek)) {
        return "text-stone-600"
    }
    if (dayOfWeek === 3) {
        // wednesday
        return "text-orange-900"
    }
    return ""
}

function Task({ task }: { task: TaskType }) {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
    const { id, name, link, fixedDate, labels } = task
    const liClasses = `${
        taskDetailId === id
            ? "selected-task border-red-500 border-b-8 border-r-8"
            : ""
    } even:bg-stone-100 odd:bg-stone-300 sm:ml-4 cursor-pointer`

    const date = dayjs(new Date(fixedDate)).format("YYYY-MM-DD")
    const dayOfWeek = dayjs(new Date(fixedDate)).day()

    const dateClass = `w-28 text-center fixed-date inline-block ${getClassFromDayOfWeek(
        dayOfWeek
    )} bg-stone-400 px-2`

    return (
        <li
            data-task-id={id}
            className={liClasses}
            onClick={() => setTaskDetailId(id)}
        >
            {fixedDate && <p className={dateClass}>{date}</p>}

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

            {link && (
                <a
                    className="link inline-block h-full w-8 text-center text-blue-500 bg-blue-200"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    L
                </a>
            )}

            <span className="name ml-2">{name}</span>
        </li>
    )
}

export default Task
