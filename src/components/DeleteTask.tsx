import { useAtom } from 'jotai'
import { useMutation } from '@apollo/client'
import { useHotkeys } from 'react-hotkeys-hook'
import { DELETE_TASK } from '../mutations/task'
import { GET_TASKS } from '../queries/tasks'
import { taskDetailIdAtom } from '../store'

function DeleteTask() {
  const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
  const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK, {
    // refetchQueries: [{ query: GET_TASKS }]
    update(cache, { data: { deleteTask } }) {
      const queryResult = cache.readQuery<{ getTasks: any[] }>({
        query: GET_TASKS
      })
      const getTasks = queryResult?.getTasks ?? []

      cache.writeQuery({
        query: GET_TASKS,
        data: {
          getTasks: getTasks.filter(
            (task: { id: string }) => task.id !== deleteTask.id
          )
        }
      })
    }
  })
  useHotkeys(
    'shift+R, shift+T+D, shift+T+S',
    () => {
      const button = document.getElementById('delete-task-button')
      const taskId = button?.dataset.taskId
      // if (confirm(`Delete task with id ${button?.dataset.taskId} ?`)) {
      // if (confirm(`Delete task ?`)) {
      //     deleteTask({
      //         variables: { deleteTaskId: taskId },
      //     }).then(result => {
      //         if (taskId) {
      //             selectAfterRemovingTask(taskId)
      //         }
      //     })
      // }
      deleteTask({
        variables: { deleteTaskId: taskId }
      }).then((result) => {
        if (taskId) {
          selectAfterRemovingTask(taskId)
        }
      })
    },
    { enabled: true }
  )
  function selectAfterRemovingTask(removedTaskId: string) {
    const previousTask = document.querySelector(
      `li[data-task-id="${removedTaskId}"]`
    )?.previousElementSibling as HTMLElement
    const privousTaskId = previousTask?.dataset.taskId

    if (privousTaskId) {
      setTaskDetailId(privousTaskId)
    } else {
      const nextTask = document.querySelector(
        `li[data-task-id="${removedTaskId}"]`
      )?.nextElementSibling as HTMLElement
      const nextTaskId = nextTask.dataset.taskId
      if (nextTaskId) {
        setTaskDetailId(nextTaskId)
      } else {
        const addTaskInput = document.getElementById(
          'add-task-name-input'
        ) as HTMLInputElement
        if (addTaskInput) {
          addTaskInput.value = ''
          addTaskInput.focus()
        }
      }
    }
  }
  function handleClick() {
    if (confirm(`Delete task with id ${taskDetailId} ?`)) {
      deleteTask({ variables: { deleteTaskId: taskDetailId } }).then(
        (result) => {
          selectAfterRemovingTask(taskDetailId)
        }
      )
    }
  }
  if (loading) return <p>Submitting...</p>
  if (error) return <p className='text-red-500'>Error: {error.message}</p>
  return (
    <div className='bg-stone-400 -mx-4 p-4 rounded mb-4'>
      <button
        id='delete-task-button'
        data-task-id={taskDetailId}
        onClick={handleClick}
        className='block m-auto px-4 border-solid border-2 text-red-500 border-red-500 rounded'
      >
        Delete task
      </button>
    </div>
  )
}
export default DeleteTask
