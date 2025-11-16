


import React from 'react'
import router from "./routes/index.jsx";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
