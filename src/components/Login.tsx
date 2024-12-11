import { useRef } from 'react'
import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../queries/login'
import H2 from './H2'
import useAuth from '../hooks/useAuth'

function Login() {
  const { signin } = useAuth()

  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const [getLogin, { loading, error, data }] = useLazyQuery(LOGIN, {
    fetchPolicy: 'network-only' // This ensures the query is always fetched from the network
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    getLogin({
      variables: { email, password },
      onCompleted: (data) => {
        signin(data.login.user)
      }
    })
  }

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    console.log(error)
    return <p>{error.message}</p>
  }
  if (!loading && !error && data?.login) {
    const { user, token } = data.login

    localStorage.setItem('login', JSON.stringify({ user, token }))

    return <p>user and token stored !</p>
  }
  return (
    <>
      <H2>Login</H2>
      <form
        onSubmit={handleSubmit}
        className='p-4 -mx-4 sm:flex justify-center'
      >
        <input
          ref={email}
          className='my-4 px-4 rounded'
          type='text'
          name='email'
          placeholder='email'
        />
        <input
          ref={password}
          className='my-4 sm:ml-4 px-4 rounded'
          type='password'
          name='password'
          placeholder='password'
        />
        <button
          className='my-4 sm:mx-4 px-4 border-solid border-2 text-blue-500 border-blue-500 rounded'
          type='submit'
        >
          Login
        </button>
      </form>
    </>
  )
}

export default Login
