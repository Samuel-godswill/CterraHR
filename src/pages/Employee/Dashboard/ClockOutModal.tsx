import { useState, useEffect } from 'react'
import './dashboard.css'

interface ClockOutModalProps {
  isOpen: boolean
  onClose: () => void
  onClockOut: () => void
  clockInTime: Date | null
}

const ClockOutModal = ({ isOpen, onClose, onClockOut, clockInTime }: ClockOutModalProps) => {
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(true)
  const [showSummary, setShowSummary] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setClockOutTime(new Date())
      setShowConfirmation(true)
      setShowSummary(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleConfirm = async () => {
    setIsLoading(true)
    
    try {
      await onClockOut()
      setIsLoading(false)
      setShowConfirmation(false)
      setShowSummary(true)
      
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const calculateTotalHours = () => {
    if (!clockInTime || !clockOutTime) return "0:00"
    const diff = clockOutTime.getTime() - clockInTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}:${minutes.toString().padStart(2, "0")}`
  }

  return (
    <div className="modalOverlay">
      <div className="modalBackdrop" onClick={onClose} />
      
      <div className="modal">
        {showConfirmation ? (
          <>
            <div className="modalHeader">
              <h2>Clock Out</h2>
              <button onClick={onClose} className="modalClose">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="modalBody">
              <div className="confirmationContent">
                <div className="confirmationIcon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3>Are you sure you want to clock out?</h3>
                <p>This will end your current work session</p>
              </div>

              {clockInTime && (
                <div className="timeInfo">
                  <div className="timeRow">
                    <span>Clock In Time:</span>
                    <span className="timeValue">
                      {clockInTime.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                  {clockOutTime && (
                    <div className="timeRow">
                      <span>Clock Out Time:</span>
                      <span className="timeValue">
                        {clockOutTime.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="modalFooter">
                <button
                  type="button"
                  onClick={onClose}
                  className="btnSecondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="btnPrimary"
                >
                  {isLoading ? (
                    <>
                      <svg className="spinner" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Clocking Out...
                    </>
                  ) : (
                    <>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Yes, Clock Out
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="modalBody">
            <div className="modalSuccess">
              <div className="successIcon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="successTitle">Successfully Clocked Out!</p>
            </div>

            {clockInTime && clockOutTime && (
              <div className="timeSummary">
                <div className="timeRow">
                  <span>Clock In Time:</span>
                  <span className="timeValue">
                    {clockInTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className="timeRow">
                  <span>Clock Out Time:</span>
                  <span className="timeValue">
                    {clockOutTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className="timeRow totalRow">
                  <span>Total Hours:</span>
                  <span className="totalValue">{calculateTotalHours()} hours</span>
                </div>
              </div>
            )}

            <p className="summaryNote">Your session has been recorded successfully</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClockOutModal