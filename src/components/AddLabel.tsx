import { useMutation } from "@apollo/client"
import { GET_LABELS } from "../queries/label"
import { ADD_LABEL } from "../mutations/label"
import H2 from "./H2"

function AddLabel() {
    let nameInput: HTMLInputElement | null,
        positionInput: HTMLInputElement | null,
        colorInput: HTMLInputElement | null
    const [addLabel, { data, loading, error }] = useMutation(ADD_LABEL, {
        refetchQueries: [{ query: GET_LABELS }],
    })
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        addLabel({
            variables: {
                name: nameInput?.value,
                position: parseInt(positionInput?.value || "1", 10),
                color: colorInput?.value || "stone-500",
            },
        })
        if (nameInput) {
            nameInput.value = "" // TODO is this needed ?
        }
    }
    if (loading) return <p>Submitting...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>

    return (
        <div className="bg-stone-200 -mx-4 p-6">
            <H2 classes="mt-0 mb-4 text-xl text-stone-500">Add a new label</H2>
            <form
                onSubmit={handleSubmit}
                className="sm:flex flex-wrap justify-evenly"
            >
                <input
                    className="my-4 rounded px-4"
                    ref={node => {
                        nameInput = node
                    }}
                    type="text"
                    placeholder="name"
                    required
                />
                <input
                    className="my-4 rounded px-4"
                    ref={node => {
                        positionInput = node
                    }}
                    type="number"
                    placeholder="position"
                />
                <input
                    className="my-4 rounded px-4"
                    ref={node => {
                        colorInput = node
                    }}
                    type="text"
                    placeholder="color ex.: #c7247b"
                />
                <button
                    className="my-4 sm:mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                    type="submit"
                >
                    Add label
                </button>
            </form>
        </div>
    )
}

export default AddLabel
