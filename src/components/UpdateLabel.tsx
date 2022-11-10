import { OperationVariables, useMutation } from "@apollo/client"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { UPDATE_LABEL, GET_LABELS } from "../queries/label"
import { Label } from "../types/label"

function UpdateLabel({ label }: { label: Label }) {
    const [updateLabel, { data, loading, error }] = useMutation(UPDATE_LABEL, {
        refetchQueries: [{ query: GET_LABELS }],
    })

    const onSubmit = (
        values: OperationVariables | undefined,
        { setSubmitting }: any
    ) => {
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
                const errors: { name?: string } = {}

                if (values.name.length < 3) {
                    errors.name = "Length must be gretter then 3."
                }
                return errors
            }}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="my-2 sm:flex flex-wrap justify-between">
                    <Field
                        className="w-auto my-4 mx-4 rounded px-4 w-40"
                        type="name"
                        name="name"
                        placeholder="name"
                    />
                    <ErrorMessage
                        className="text-red-500"
                        name="name"
                        component="div"
                    />

                    <Field
                        className="my-4 mx-4 rounded px-4 text-center w-20"
                        type="number"
                        name="position"
                        placeholder="position"
                    />
                    <ErrorMessage
                        className="text-red-500"
                        name="position"
                        component="div"
                    />

                    <Field
                        className="mx-4 sm:h-full h-10"
                        type="color"
                        name="color"
                    />
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
                        Update
                    </button>
                </Form>
            )}
        </Formik>
    )
}
export default UpdateLabel
