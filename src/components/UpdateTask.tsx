import { OperationVariables, useMutation } from '@apollo/client'
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik'
import { useAtom } from 'jotai'
import dayjs from 'dayjs'
import { useHotkeys } from 'react-hotkeys-hook'
import { Task } from '../types/task'
import { UPDATE_TASK } from '../mutations/task'
import { GET_TASKS } from '../queries/tasks'
import { taskDetailIdAtom } from '../store'
import { getDateForInput } from '../utils'

function getSelectedTaskData() {
  const selectedTask = document.querySelector('.selected-task') as HTMLElement
  const taskId = selectedTask?.dataset.taskId
  const fixedDate = selectedTask?.querySelector('.fixed-date')?.textContent
  const labels = selectedTask?.querySelectorAll('.label')
  const name = selectedTask?.querySelector('.name')?.textContent
  return { selectedTask, taskId, fixedDate, labels, name }
}

function UpdateTask({ task }: { task: Task }) {
  const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
  const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK, {
    // refetchQueries: [{ query: GET_TASKS }]
    update(cache, { data: { updateTask } }) {
      const { getTasks } = cache.readQuery<{ getTasks: Task[] }>({
        query: GET_TASKS
      }) || { getTasks: [] }

      const updatedTask = {
        id: updateTask.id,
        __typename: updateTask.__typename,
        name: updateTask.name,
        link: updateTask.link,
        fixedDate: updateTask.fixedDate,
        labels: updateTask.labels
      }

      const updatedTasks = getTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )

      cache.writeQuery({
        query: GET_TASKS,
        data: { getTasks: updatedTasks }
      })
    }
  })
  useHotkeys('shift+L', () => {
    // console.log("Go to task link.")
    const selectedTaskLink = document.querySelector(
      '.selected-task-link'
    ) as HTMLElement
    selectedTaskLink?.click()
  })
  useHotkeys('shift+C', () => {
    // console.log("Clear date.")
    const button = document.getElementById('delete-task-button')
    const updateTaskId = button?.dataset.taskId
    updateTask({
      variables: { updateTaskId, clearFixedDate: true }
    })
  })
  useHotkeys('shift+Y', () => {
    // console.log("-1 day.")
    const button = document.getElementById('delete-task-button')
    const updateTaskId = button?.dataset.taskId
    const { fixedDate } = getSelectedTaskData()
    updateTask({
      variables: {
        updateTaskId,
        fixedDate: dayjs(fixedDate).subtract(1, 'day').format('YYYY-MM-DD')
      }
    })
  })
  useHotkeys('shift+T', () => {
    // console.log("-1 day.")
    const button = document.getElementById('delete-task-button')
    const updateTaskId = button?.dataset.taskId
    // const { fixedDate } = getSelectedTaskData()
    updateTask({
      variables: {
        updateTaskId,
        fixedDate: dayjs().format('YYYY-MM-DD')
      }
    })
  })
  useHotkeys('shift+U', () => {
    type TaskToUpdate = {
      variables: {
        updateTaskId: string
        fixedDate: string
      }
    }

    const tasksToUpdate: TaskToUpdate[] = []

    const allTasks: NodeListOf<Element> =
      document.querySelectorAll('li[data-task-id]')

    allTasks.forEach((task) => {
      const date = task.querySelector('.fixed-date')?.textContent
      const hasDateOrLabel = task.querySelector('p')

      if (task instanceof HTMLElement) {
        const hasTaskId = task.dataset.taskId
        const isPast =
          dayjs(date) < dayjs() &&
          +dayjs(date).format('DD') < +dayjs().format('DD')

        if (hasTaskId && (!hasDateOrLabel || isPast)) {
          const updateTaskId = task.dataset.taskId || ''
          const taskToUpdate: TaskToUpdate = {
            variables: {
              updateTaskId,
              fixedDate: dayjs().format('YYYY-MM-DD')
            }
          }

          tasksToUpdate.push(taskToUpdate)
        }
      }
    })

    const interval = setInterval(() => {
      const firstElement = tasksToUpdate.shift()
      console.log('Update task with id: ', firstElement?.variables.updateTaskId)
      updateTask(firstElement)

      if (tasksToUpdate.length === 0) {
        clearInterval(interval)
      }
    }, 300)
  })

  useHotkeys('shift+D', () => {
    // console.log("+1 day.")
    const button = document.getElementById('delete-task-button')
    const updateTaskId = button?.dataset.taskId
    const { fixedDate } = getSelectedTaskData()

    updateTask({
      variables: {
        updateTaskId,
        fixedDate: dayjs(fixedDate).add(1, 'day').format('YYYY-MM-DD')
      }
    })
  })
  useHotkeys('shift+W', () => {
    // console.log("+1 week.")
    const button = document.getElementById('delete-task-button')
    const updateTaskId = button?.dataset.taskId
    const { fixedDate } = getSelectedTaskData()

    updateTask({
      variables: {
        updateTaskId,
        fixedDate: dayjs(fixedDate).add(1, 'week').format('YYYY-MM-DD')
      }
    })
  })
  useHotkeys('shift+M', () => {
    // console.log("+1 month.")
    const button = document.getElementById('delete-task-button')
    const updateTaskId = button?.dataset.taskId
    const { fixedDate } = getSelectedTaskData()

    updateTask({
      variables: {
        updateTaskId,
        fixedDate: dayjs(fixedDate).add(1, 'month').format('YYYY-MM-DD')
      }
    })
  })
  useHotkeys('shift+Up', () => {
    // console.log("Up.")
    const { selectedTask } = getSelectedTaskData()
    const taskBefore = selectedTask.previousElementSibling as HTMLElement
    const taskBeforeId = taskBefore.dataset.taskId
    if (taskBeforeId) {
      setTaskDetailId(taskBeforeId)
    }
  })
  useHotkeys('shift+Down', () => {
    // console.log("Down.")
    const { selectedTask } = getSelectedTaskData()
    const taskAfter = selectedTask.nextSibling as HTMLElement
    const taskAfterId = taskAfter.dataset.taskId
    if (taskAfterId) {
      setTaskDetailId(taskAfterId)
    }
  })
  const onSubmit = (
    values: OperationVariables | undefined,
    { setSubmitting }: any
  ) => {
    updateTask({
      variables: { updateTaskId: task.id, ...values }
    })

    setSubmitting(false)
  }
  const clearDate = () => {
    updateTask({
      variables: { updateTaskId: task.id, clearFixedDate: true }
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className='text-red-500'>Error: {error.message}</p>

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: task.name || '',
        link: task.link || '',
        fixedDate: getDateForInput(task.fixedDate) || ''
      }}
      validate={(values) => {
        const errors: { name?: string } = {}
        if (values.name.length < 3) {
          errors.name = 'Length must be gretter then 3.'
        }
        return errors
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='my-8 flex flex-wrap flex-col justify-between'>
          <Field
            className='my-1 px-4 rounded text-lg'
            type='text'
            name='name'
            placeholder='name'
          />
          <ErrorMessage className='text-red-500' name='name' component='div' />

          <Field
            className='my-1 mb-10 px-4 rounded text-blue-500'
            type='url'
            name='link'
            placeholder='link'
          />
          <ErrorMessage className='text-red-500' name='link' component='div' />

          <Field className='my-1 px-4 rounded' type='date' name='fixedDate' />
          <ErrorMessage
            className='text-red-500'
            name='fixedDate'
            component='div'
          />

          <button
            onClick={clearDate}
            className='my-1 mb-10 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded'
            disabled={isSubmitting}
          >
            Clear task date
          </button>
          <button
            className='my-1 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded'
            type='submit'
            disabled={isSubmitting}
          >
            Update task
          </button>
        </Form>
      )}
    </Formik>
  )
}
export default UpdateTask
