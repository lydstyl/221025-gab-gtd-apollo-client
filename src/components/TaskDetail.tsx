import { useAtom } from "jotai"
import { taskDetailIdAtom } from "../store"

function TaskDetail() {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)

    return <div>Task Detail id {taskDetailId}</div>
}
export default TaskDetail
