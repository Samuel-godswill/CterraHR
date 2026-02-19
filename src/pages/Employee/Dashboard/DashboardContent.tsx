import { ReactNode } from 'react'
import DashboardHeader from './DashboardHeader'
import Filter from './filters/Filter'
import WelcomeCard from './WelcomeCard'
import StatsGrid from './stats/StatsGrid'
import RecentActivity from './activity/RecentActivity'
import './dashboard.css'

const DashboardContent = () => {
  const stats = [
    {
      title: "Hours This Week",
      value: 32.5,
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"/></svg>,
      description: "40 hours target"
    },
    {
      title: "Leave Balance",
      value: 12,
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"/></svg>,
      description: "Days remaining"
    },
    {
      title: "Pending Requests",
      value: 2,
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"/></svg>,
      description: "Awaiting approval"
    },
    {
      title: "Attendance Rate",
      value: "95%",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"/></svg>,
      description: "This month"
    },
    {
      title: "Late Check-ins",
      value: 3,
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"/></svg>,
      description: "This month"
    },
    {
      title: "Overtime Hours",
      value: 5.5,
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM8.5 14V16H11V19H13V16H15.5V14H13V9.5H11.5L8.5 13.5V14ZM10.5 14H11V12.5L10.5 13V14Z"/></svg>,
      description: "This month"
    }
  ]

  return (
    <div className="dashboardPage">
      <DashboardHeader 
        title="Dashboard"
        description="Welcome back! Here's what's happening today."
        action={<Filter />}
      />
      
      <WelcomeCard />
      
      <StatsGrid stats={stats} columns={3} />
      
      <RecentActivity />
    </div>
  )
}

export default DashboardContent