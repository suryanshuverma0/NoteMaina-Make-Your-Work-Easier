import Nanbar from "../components/Nanbar"
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <div>
      <nav>
         <Nanbar/>
      </nav>
      <main>
         <Outlet />
      </main>
    </div>
  )
}

export default Layout
