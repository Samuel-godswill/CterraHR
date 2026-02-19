import { ReactNode } from 'react'
import './dashboard.css'

interface DashboardHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

const DashboardHeader = ({ title, description, action }: DashboardHeaderProps) => {
  return (
    <div className="dashboardHeader">
      <div className="headerText">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="headerAction">{action}</div>}
    </div>
  )
}

export default DashboardHeader