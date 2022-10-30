import { useEffect } from "react"
import { useAtom } from "jotai"
import { useLazyQuery } from "@apollo/client"
import dayjs from "dayjs"

import { taskDetailIdAtom } from "../store"
import { GET_TASK } from "../queries/tasks"
import AddLabelToTask from "./AddLabelToTask"
import DeleteTask from "./DeleteTask"
import UpdateTask from "./UpdateTask"

function TaskDetail() {
    const [taskDetailId] = useAtom(taskDetailIdAtom)

    const [getTask, { loading, error, data }] = useLazyQuery(GET_TASK, {
        variables: { id: taskDetailId },
    })

    useEffect(() => {
        if (taskDetailId) {
            getTask()
        }
    }, [taskDetailId])

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>

    if (!data) return <p>There is no data.</p>
    const { id, name, link, fixedDate, labels } = data.getTask

    return (
        <div className="basis-2/3">
            <h2 className="text-xl mb-4">Task detail : {name}</h2>
            <p>{id}</p>
            <div>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                </a>
            </div>

            <div className="labels">
                <ul className="flex flex-row">
                    {labels.map(label => (
                        <li
                            key={label.id}
                            style={{ backgroundColor: label.color }}
                            className="mr-4 px-2 py-1"
                        >
                            <span>
                                {label.name} pos.[{label.position}]
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                fixedDate : {dayjs(new Date(fixedDate)).format("YYYY-MM-DD")}
            </div>

            <UpdateTask task={data.getTask} />

            <div>
                <AddLabelToTask />
            </div>
            <div>
                <DeleteTask />
            </div>
        </div>
    )
}
export default TaskDetail
