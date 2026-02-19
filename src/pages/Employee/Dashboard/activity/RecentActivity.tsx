import { useState, useEffect } from 'react'
import './activity.css'

interface Activity {
  id: string
  module: string
  action: string
  details: string
  status?: 'pending' | 'approved' | 'rejected' | 'success' | 'failed'
  timestamp: string
}

const RecentActivity = () => {
  const [timeKey, setTimeKey] = useState(0)

  // Hardcoded data for now (will come from API later)
  const activities: Activity[] = [
    {
      id: '1',
      module: 'timesheet',
      action: 'clock_in',
      details: 'Clocked in at 9:00 AM',
      status: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      id: '2',
      module: 'leave',
      action: 'leave_request',
      details: 'Annual leave request for Dec 25-27',
      status: 'pending',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
      id: '3',
      module: 'timesheet',
      action: 'clock_out',
      details: 'Clocked out at 5:00 PM',
      status: 'success',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      id: '4',
      module: 'profile',
      action: 'profile_update',
      details: 'Updated contact information',
      status: 'success',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    },
    {
      id: '5',
      module: 'leave',
      action: 'leave_approved',
      details: 'Sick leave request approved',
      status: 'approved',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
      id: '6',
      module: 'timesheet',
      action: 'time_edit',
      details: 'Edited timesheet for Nov 15',
      status: 'pending',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    }
  ]

  // Update time display every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeKey(prev => prev + 1)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: string): string => {
    try {
      const date = new Date(timestamp)
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
      
      if (diffInSeconds < 60) return "Just now"
      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} min${minutes !== 1 ? "s" : ""} ago`
      }
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`
      }
      if (diffInSeconds < 172800) return "Yesterday"
      if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400)
        return `${days} day${days !== 1 ? "s" : ""} ago`
      }
      
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    } catch {
      return timestamp
    }
  }

  const getActivityIcon = (module: string, action: string) => {
    if (module === "timesheet" || action.includes("clock")) {
      return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    } else if (module === "leave" || action.includes("leave")) {
      return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    } else if (module === "profile" || action.includes("profile")) {
      return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
    return (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }

  return (
    <div className="activityCard">
      {/* Header */}
      <div className="activityHeader">
        <h2>Recent Activity</h2>
        <a href="/employee/audit" className="activityViewAll">
          View All
        </a>
      </div>

      {/* Desktop Table */}
      <div className="activityTableWrapper">
        <table className="activityTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Activity</th>
              <th>Description</th>
              <th>Status</th>
              <th className="textRight">Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity.id}>
                <td>
                  <span className="activityIndex">{index + 1}</span>
                </td>
                <td>
                  <div className="activityName">
                    <div className="activityIcon">
                      {getActivityIcon(activity.module, activity.action)}
                    </div>
                    <span>{activity.action.replace(/_/g, " ")}</span>
                  </div>
                </td>
                <td>
                  <span className="activityDetails">{activity.details}</span>
                </td>
                <td>
                  {activity.status ? (
                    <span className={`activityStatus ${activity.status}`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  ) : (
                    <span className="activityNoStatus">—</span>
                  )}
                </td>
                <td className="textRight">
                  <span className="activityTime" key={`${activity.id}-${timeKey}`}>
                    {formatTime(activity.timestamp)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="activityMobile">
        {activities.map((activity) => (
          <div key={activity.id} className="activityMobileCard">
            <div className="activityMobileHeader">
              <div className="activityMobileName">
                <div className="activityIcon">
                  {getActivityIcon(activity.module, activity.action)}
                </div>
                <div>
                  <h3>{activity.action.replace(/_/g, " ")}</h3>
                  <p>{activity.details}</p>
                </div>
              </div>
            </div>
            <div className="activityMobileFooter">
              {activity.status ? (
                <span className={`activityStatus ${activity.status}`}>
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </span>
              ) : (
                <span className="activityNoStatus">—</span>
              )}
              <span className="activityTime" key={`${activity.id}-mobile-${timeKey}`}>
                {formatTime(activity.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity