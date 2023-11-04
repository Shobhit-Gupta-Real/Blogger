import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './partials/Nav'
function Layout() {
  return (
    <>
        <Nav/>
        <Outlet/>
    </>
  )
}

export default Layout
