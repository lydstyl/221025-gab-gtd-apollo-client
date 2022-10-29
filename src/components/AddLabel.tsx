import { useMutation } from "@apollo/client"
import { ADD_LABEL } from "../mutations/label"
import { GET_LABELS } from "../queries/label"

function AddLabel() {
    let nameInput: HTMLInputElement | null,
        positionInput: HTMLInputElement | null
    const [addLabel, { data, loading, error }] = useMutation(ADD_LABEL, {
        refetchQueries: [{ query: GET_LABELS }],
    })
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        addLabel({
            variables: {
                name: nameInput?.value,
                position: parseInt(positionInput?.value || "1", 10),
            },
        })
        if (nameInput) {
            nameInput.value = ""
        }
    }
    if (loading) return <p>Submitting...</p>
    if (error)
        return (
            <p className="text-red-500">Submission error ! {error.message}</p>
        )

    return (
        <form onSubmit={handleSubmit}>
            <input
                ref={node => {
                    nameInput = node
                }}
                type="text"
                name="name"
                placeholder="name"
            />
            <input
                ref={node => {
                    positionInput = node
                }}
                type="text"
                name="name"
                placeholder="position"
            />
            <button
                className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                type="submit"
            >
                Add label
            </button>
        </form>
    )
}

export default AddLabel
