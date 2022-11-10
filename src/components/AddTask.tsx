import { useAtom } from "jotai"
import { useMutation } from "@apollo/client"
import { taskDetailIdAtom } from "../store"
import { ADD_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"
import H2 from "./H2"

function AddTask() {
    const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)

    let input: HTMLInputElement | null
    const [addTask, { data, loading, error }] = useMutation(ADD_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    })
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const res = await addTask({ variables: { name: input?.value } })
        setTaskDetailId(res.data.addTask.id)
        if (input) {
            input.value = ""
        }
    }
    if (loading) return <p>Submitting...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
        <form onSubmit={handleSubmit}>
            <H2>Add a new task</H2>
            <div className="sm:flex sm:flew-row">
                <input
                    ref={node => {
                        input = node
                    }}
                    className="rounded px-4 w-full"
                    type="text"
                    name="name"
                    placeholder="name"
                    required
                />
                <button
                    className="sm:basis-1/4 my-4 mr-0 sm:ml-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                    type="submit"
                >
                    Add task
                </button>
            </div>
        </form>
    )
}

export default AddTask
