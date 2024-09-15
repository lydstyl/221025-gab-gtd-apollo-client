import { useAtom } from 'jotai'
import { useMutation } from '@apollo/client'
import { useHotkeys } from 'react-hotkeys-hook'
import { taskDetailIdAtom } from '../store'
import { ADD_TASK } from '../mutations/task'
import { GET_TASKS } from '../queries/tasks'
import H2 from './H2'

function AddTask() {
  const [taskDetailId, setTaskDetailId] = useAtom(taskDetailIdAtom)
  let taskNameInput: HTMLInputElement | null
  useHotkeys('shift+N, shift+T+A', () => {
    document.getElementById('add-task-name-input')?.focus()
  })

  const [addTask, { data, loading, error }] = useMutation(ADD_TASK, {
    // refetchQueries: [{ query: GET_TASKS }] // replace with update
    update(cache, { data: { addTask } }) {
      const { getTasks } = cache.readQuery({ query: GET_TASKS })

      const newTask = {
        id: addTask.id,
        __typename: addTask.__typename,
        name: '___tache ajoutée en cache ?!',
        link: null,
        fixedDate: null,
        labels: []
      }
      cache.writeQuery({
        query: GET_TASKS,
        // data: { getTasks: [data.addTask, ...getTasks] }
        data: { getTasks: [newTask, ...getTasks] }
      })
    }
  })
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const res = await addTask({ variables: { name: taskNameInput?.value } })
    setTaskDetailId(res.data.addTask.id)
    if (taskNameInput) {
      taskNameInput.value = ''
    }
  }
  if (loading) return <p>Submitting...</p>
  if (error) return <p className='text-red-500'>Error: {error.message}</p>
  return (
    <form
      onSubmit={handleSubmit}
      className='border-2 rounded bg-stone-200 -mx-4 p-4 mb-4'
    >
      <H2>Add a new task</H2>
      <div className='sm:flex sm:flew-row'>
        <input
          ref={(node) => (taskNameInput = node)}
          className='rounded px-4 w-full'
          type='text'
          name='name'
          id='add-task-name-input'
          placeholder='name'
          required
          autoFocus
        />
        <button
          className='sm:basis-1/4 my-4 mr-0 sm:ml-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded'
          type='submit'
        >
          Add task
        </button>
      </div>
    </form>
  )
}

export default AddTask
