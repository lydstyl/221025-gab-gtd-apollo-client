import Login from '../components/Login'
import Button from '../components/Button'
import CreateAccount from '../components/CreateAccount'
import DeleteAccount from '../components/DeleteAccount'
import useHasLoginStored from '../hooks/useHasLoginStored'
import H2 from '../components/H2'
import useAuth from '../hooks/useAuth'
import useLocalAuth from '../hooks/useLocalAuth'
import { useQuery } from '@apollo/client'
import { GET_TASKS } from '../queries/tasks'

function LoginPage() {
  const { user, token } = useLocalAuth()
  const { data, client } = useQuery(GET_TASKS)

  const { signout } = useAuth()
  const [hasLoginStored, setHasLoginStored] = useHasLoginStored()

  const logOut = async () => {
    signout()
    client.resetStore() // resetting the cache --> @apollo_client.js?v=25652079:311 Uncaught (in promise) ApolloError: Something went wrong. Unauthorised !
  }

  if (token) {
    return (
      <>
        <H2>Disconnect</H2>
        <Button options={{ onClick: signout }}>Logout</Button>
        {/* <Button options={{ onClick: logOut }}>Logout</Button> */}

        <div className='border-2 rounded bg-stone-200 -mx-4 p-4 mb-4'>
          <DeleteAccount />
        </div>
      </>
    )
  }

  return (
    <>
      <Login />

      <CreateAccount />
    </>
  )
}

export default LoginPage
