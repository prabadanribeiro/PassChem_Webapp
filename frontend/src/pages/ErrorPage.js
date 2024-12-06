import React from "react"
import { Helmet } from "react-helmet-async"
import { useRouteError } from "react-router-dom"

export default function ErroPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <div>
            <Helmet>
                <title>Error: something went wrong</title>
            </Helmet>
            <h2>Oops!</h2>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

