import { useRef } from "react"
import { useMutation } from "@apollo/client"
import { ADD_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"

function AddTask() {
    // let input;

    const name = useRef()
    const [addTask, { data, loading, error }] = useMutation(ADD_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    })
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const name = formData.get("name") as string
        addTask({ variables: { name } })
    }
    if (loading) return "Submitting..."
    if (error) return `Submission error! ${error.message}`
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" />
            <button
                ref={name}
                className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                type="submit"
            >
                Add task
            </button>
        </form>
    )
}

export default AddTask
