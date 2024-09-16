import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'

import './index.css'

const httpLink = createHttpLink({
  // uri: process.env.REACT_APP_API_URI,
  // uri: "https://my-custom-gtd.onrender.com/",

  // uri: 'http://localhost:4000/',
  uri: 'https://two21016-gab-gtd-apollo-server.onrender.com/'
  // uri: "https://lazy-pink-leopard-tux.cyclic.app/",
})

const authLink = setContext((_, { headers }) => {
  const storedLogin = localStorage.getItem('login')

  let token = ''
  if (storedLogin) {
    token = JSON.parse(storedLogin).token
  } else {
    console.log('Sending request without any token in local storage.')
  }

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const cache = new InMemoryCache()
// await before instantiating ApolloClient, else queries might run before the cache is persisted
await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache

  // cache: new InMemoryCache()
  // defaultOptions: {
  //   watchQuery: {
  //     nextFetchPolicy: 'cache-only'
  //   }
  // }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)
