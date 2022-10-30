import { useMutation } from "@apollo/client"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { UPDATE_LABEL, GET_LABELS } from "../queries/label"
import { GET_TASKS } from "../queries/tasks"
import { Label } from "../types/label"

function UpdateLabel({ label }: { label: Label }) {
    const [updateLabel, { data, loading, error }] = useMutation(UPDATE_LABEL, {
        refetchQueries: [{ query: GET_LABELS }],
    })

    const onSubmit = (values, { setSubmitting }) => {
        console.log(values)
        // {name: 'label1dddd', position: 6, color: '#263a59'}
        updateLabel({
            variables: { updateLabelId: label.id, ...values },
        })

        setSubmitting(false)
    }
    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>

    return (
        <Formik
            initialValues={{
                name: label.name || "",
                position: label.position || "0",
                color: label.color,
            }}
            validate={values => {
                const errors = {}
                if (values.name.length < 3) {
                    errors.name = "Length must be gretter then 3."
                }
                return errors
            }}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="my-8 flex flex-wrap justify-between">
                    <Field type="name" name="name" placeholder="name" />
                    <ErrorMessage
                        className="text-red-500"
                        name="name"
                        component="div"
                    />

                    <Field
                        type="number"
                        name="position"
                        placeholder="position"
                    />
                    <ErrorMessage
                        className="text-red-500"
                        name="position"
                        component="div"
                    />

                    <Field type="color" name="color" />
                    <ErrorMessage
                        className="text-red-500"
                        name="color"
                        component="div"
                    />

                    <button
                        className="mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}
export default UpdateLabel
