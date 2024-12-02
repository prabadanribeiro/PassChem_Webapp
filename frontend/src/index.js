import React from "react"
import { createRoot } from 'react-dom/client'
import App from './App'
import { HelmetProvider } from 'react-helmet-async';

const root = createRoot(document.getElementById('root'))
/* 
The root App component is wrapped in a <HelmetProvider> tag
which is unique to the 'react-helmet-async' library, the successor to
the 'react-helmet' library. This allows page content to be loaded
asynchronously from <Helmet> information, preventing possible
memory leaks.
*/
root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
)
