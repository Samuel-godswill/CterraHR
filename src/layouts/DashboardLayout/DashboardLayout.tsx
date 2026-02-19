import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import './DashboardLayout.css'

const DashboardLayout = () => {
  return (
    <div className="dashboardLayout">
      <Sidebar />
      <div className="dashboardMain">
        <Navbar />
        <main className="dashboardContent">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout