import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import "./index.css"

const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
})

const authLink = setContext((_, { headers }) => {
    const storedLogin = localStorage.getItem("login")

    let token = ""
    if (storedLogin) {
        token = JSON.parse(storedLogin).token
    } else {
        console.log("No token in local storage.")
    }

    return {
        headers: {
            ...headers,
            authorization: token,
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
)
