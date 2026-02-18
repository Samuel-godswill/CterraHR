import { useState, useRef, useEffect, FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './verifycode.css'
import img from '../../../assets/img/image (2).png'

const VerifyCode = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(true)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  
  const email = location.state?.email || "user@example.com"

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData?.getData("text/plain").trim() || ""
      if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
        const digits = pastedData.split("")
        setOtp(digits)
        inputRefs.current[5]?.focus()
      }
    }

    document.addEventListener("paste", handlePaste)
    return () => document.removeEventListener("paste", handlePaste)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const otpString = otp.join("")
    
    if (otpString.length === 6) {
      setIsLoading(true)
      console.log('OTP:', otpString)
      
      // TODO: After backend integration, verify OTP API call
      // For now, redirect to reset password page
      setTimeout(() => {
        navigate('/reset-password', { state: { email } })
      }, 1000)
    }
  }

  const handleResend = () => {
    console.log('Resending code...')
    setError("")
    setOtp(Array(6).fill(""))
    setShowToast(true)
    inputRefs.current[0]?.focus()
    
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
    
    // TODO: Call resend API
  }

  return (
    <div className='verifyContainer'>
      {showToast && (
        <div className="toast">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"/>
          </svg>
          <p>Verification code sent to your email</p>
        </div>
      )}

      <div className="verifyForm">
        <div className="verifyLogo">
          <p>Cterra</p>
        </div>

        <section className='verifyHeader'>
          <h2>Verify Your Email</h2>
        </section>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="verifyError">
              {error}
            </div>
          )}

          <section>
            <section className='verifyPara'>
              <p className="verifyEmail">Verification code sent to</p>
              <p className="verifyEmailAddress">{email}</p>
            </section>
            <label>Enter verification code</label>
            <div className="otpInputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otpInput"
                  disabled={isLoading}
                />
              ))}
            </div>
            <p className="resendText">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="resendBtn"
              >
                Resend
              </button>
            </p>
          </section>

          <button 
            type="submit" 
            disabled={isLoading || otp.join("").length !== 6}
            className="verifyBtn"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>

          <Link to="/login" className='verifyLink'>
            <span className='verifyArrow'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.0003 13.0001L22.0004 11.0002L5.82845 11.0002L9.77817 7.05044L8.36396 5.63623L2 12.0002L8.36396 18.3642L9.77817 16.9499L5.8284 13.0002L22.0003 13.0001Z"/>
              </svg>
            </span>
            <span className='verifyBack'>Back to login</span>
          </Link>
        </form>

        <span className='verifySpan'>© 2026 Cterra HR System. All rights reserved.</span>
      </div>

      <div className="verifyInfo">
        <span className='verifyInfoImg'>
          <img src={img} alt="" />
        </span>
        <h2>Cterra HR System</h2>
        <p>Streamline your work activities and manage your time efficiently. Track your hours, request leaves, and stay organized with our comprehensive HR management platform.</p>
      </div>
    </div>
  )
}

export default VerifyCode