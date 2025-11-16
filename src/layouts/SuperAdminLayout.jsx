import React from 'react'
import { Outlet } from 'react-router-dom'

const SuperAdminLayout = () => {
  return (
    <div>
      <nav>SuperAdmin Sidebar</nav>
      <main>
        <Outlet />  {/* This renders the child routes */}
      </main>
    </div>
  )
}

export default SuperAdminLayout