import { useState, useEffect } from 'react'
import './dashboard.css'
import ClockInModal from './ClockInModal'
import ClockOutModal from './ClockOutModal'

const WelcomeCard = () => {
  // Hardcoded user data for now (will come from auth context later)
  const user = {
    full_name: "John Doe",
    role: "employee"
  }

  const [isClockedIn, setIsClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showClockInModal, setShowClockInModal] = useState(false)
  const [showClockOutModal, setShowClockOutModal] = useState(false)
  const [greeting, setGreeting] = useState("Good Morning")

  // Get greeting based on time of day
  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) return "Good Morning"
      if (hour < 17) return "Good Afternoon"
      return "Good Evening"
    }
    setGreeting(getGreeting())
  }, [])

  // Update elapsed time every second if clocked in
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isClockedIn && clockInTime) {
      interval = setInterval(() => {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - clockInTime.getTime()) / 1000)
        setElapsedTime(elapsed)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isClockedIn, clockInTime])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleClockIn = (employeeID: string, dailyCode: string) => {
    console.log('Clock In:', employeeID, dailyCode)
    // TODO: API call to clock in
    setClockInTime(new Date())
    setIsClockedIn(true)
    setElapsedTime(0)
    setShowClockInModal(false)
  }

  const handleClockOut = () => {
    console.log('Clock Out')
    // TODO: API call to clock out
    setIsClockedIn(false)
    setClockInTime(null)
    setElapsedTime(0)
    setShowClockOutModal(false)
  }

  return (
    <>
      <div className="welcomeCard">
        {/* Background Pattern */}
        <div className="welcomePattern" />
        <div className="welcomeCircle welcomeCircleTop" />
        <div className="welcomeCircle welcomeCircleBottom" />

        <div className="welcomeContent">
          {/* Left - Greeting */}
          <div className="welcomeGreeting">
            <p className="welcomeTime">{greeting}</p>
            <h2 className="welcomeName">{user.full_name}</h2>
            <p className="welcomeSubtitle">
              {user.role === "admin" ? "Manage your organization" : "Ready to start your work day?"}
            </p>
          </div>

          {/* Center - Clock Status (Desktop) */}
          {isClockedIn && clockInTime ? (
            <div className="welcomeStatus welcomeStatusDesktop">
              <div className="welcomeStatusItem">
                <p className="welcomeStatusLabel">Clocked In</p>
                <p className="welcomeStatusTime">
                  {clockInTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              <div className="welcomeDivider" />
              <div className="welcomeStatusItem">
                <p className="welcomeStatusLabel">Elapsed</p>
                <p className="welcomeElapsed">{formatTime(elapsedTime)}</p>
              </div>
            </div>
          ) : (
            <div className="welcomeStatus welcomeStatusDesktop">
              <p className="welcomeStatusLabel">Not Clocked In</p>
              <p className="welcomeElapsed">--</p>
            </div>
          )}

          {/* Right - Clock Button */}
          <div className="welcomeActions">
            {/* Mobile Status */}
            {isClockedIn && clockInTime ? (
              <div className="welcomeStatus welcomeStatusMobile">
                <div className="welcomeStatusItem">
                  <p className="welcomeStatusLabel">Clocked In</p>
                  <p className="welcomeStatusTimeMobile">
                    {clockInTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <div className="welcomeDividerMobile" />
                <div className="welcomeStatusItem">
                  <p className="welcomeStatusLabel">Elapsed</p>
                  <p className="welcomeElapsedMobile">{formatTime(elapsedTime)}</p>
                </div>
              </div>
            ) : (
              <div className="welcomeStatus welcomeStatusMobile">
                <p className="welcomeStatusLabel">Not Clocked In</p>
                <p className="welcomeElapsedMobile">--:--</p>
              </div>
            )}

            {/* Clock Button */}
            {isClockedIn ? (
              <button onClick={() => setShowClockOutModal(true)} className="welcomeBtn">
                <svg className="welcomeBtnIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Clock Out</span>
              </button>
            ) : (
              <button onClick={() => setShowClockInModal(true)} className="welcomeBtn">
                <svg className="welcomeBtnIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Clock In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <ClockInModal
        isOpen={showClockInModal}
        onClose={() => setShowClockInModal(false)}
        onClockIn={handleClockIn}
      />

      <ClockOutModal
        isOpen={showClockOutModal}
        onClose={() => setShowClockOutModal(false)}
        onClockOut={handleClockOut}
        clockInTime={clockInTime}
      />
    </>
  )
}

export default WelcomeCard