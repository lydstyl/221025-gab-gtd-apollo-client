import { useMutation } from "@apollo/client"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { UPDATE_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"

function UpdateTask({ task }) {
    // const [taskDetailId] = useAtom(taskDetailIdAtom)

    const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    })

    const onSubmit = (values, { setSubmitting }) => {
        console.log(values)

        updateTask({
            variables: { updateTaskId: task.id, ...values },
        })

        setSubmitting(false)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>

    return (
        <Formik
            initialValues={{
                name: task.name || "",
                link: task.link || "",
                fixedDate: task.fixedDate || "",
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
                        className="text-red-500"
                        type="url"
                        name="link"
                        placeholder="link"
                    />
                    <ErrorMessage name="link" component="div" />

                    <Field
                        className="text-red-500"
                        type="date"
                        name="fixedDate"
                    />
                    <ErrorMessage name="fixedDate" component="div" />

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
export default UpdateTask
