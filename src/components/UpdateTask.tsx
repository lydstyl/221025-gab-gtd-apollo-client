import { useMutation } from "@apollo/client"
import { Formik, Form, Field, ErrorMessage } from "formik"
import dayjs from "dayjs"
import { UPDATE_TASK } from "../mutations/task"
import { GET_TASKS } from "../queries/tasks"

function UpdateTask({ task }) {
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
                fixedDate: dayjs(new Date(task.fixedDate)).format("YYYY-MM-DD"),
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

                    <Field type="url" name="link" placeholder="link" />
                    <ErrorMessage
                        className="text-red-500"
                        name="link"
                        component="div"
                    />

                    <Field type="date" name="fixedDate" />
                    <ErrorMessage
                        className="text-red-500"
                        name="fixedDate"
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
export default UpdateTask
