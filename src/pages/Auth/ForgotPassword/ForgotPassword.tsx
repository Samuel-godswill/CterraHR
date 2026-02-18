import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './forgotpassword.css'
import img from '../../../assets/img/image (2).png'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email:', email)
    
    // TODO: After backend integration, send verification code API call
    // For now, redirect to verify code page
    navigate('/verify-code', { state: { email } })
  }

  return (
    <div className='forgotContainer'>
      <div className="forgotForm">
        <div className="forgotLogo">
          <p>Cterra</p>
        </div>
        <section className='forgotHeader'>
          <h2>Forgot Password?</h2>
          <p>Enter your email address and we'll send you a verification code</p>
        </section>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="email">Email Address</label>
            <div className="inputWrapper">
              <span className="inputIcon left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.24283 6.85435L11.4895 1.3086C11.8062 1.11865 12.2019 1.11872 12.5185 1.30878L21.7573 6.85433C21.9079 6.9447 22 7.10743 22 7.28303V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.28315C2 7.10748 2.09218 6.94471 2.24283 6.85435ZM4 8.13261V19H20V8.13214L12.0037 3.33237L4 8.13261ZM12.0597 13.6983L17.3556 9.23532L18.6444 10.7647L12.074 16.3017L5.36401 10.7717L6.63599 9.2283L12.0597 13.6983Z" fill="rgb(156, 163, 175)" strokeWidth="1px" fillOpacity="1" strokeOpacity="1"/>
                </svg>
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@example.com'
                className="iconLeft"
                required
              />
            </div>
          </section>

          <section className='forgotNote'>
            <p>We'll send you a verification code to reset your password.</p>             
          </section>

          <button type="submit">Send Verification Code</button>

          <Link to="/login" className='forgotLink'>
            <span className='forgotArrow'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.0003 13.0001L22.0004 11.0002L5.82845 11.0002L9.77817 7.05044L8.36396 5.63623L2 12.0002L8.36396 18.3642L9.77817 16.9499L5.8284 13.0002L22.0003 13.0001Z"/>
              </svg>
            </span>
            <span className='forgotBack'>Back to login</span>
          </Link>
        </form>
        
        <span className='forgotSpan'>© 2026 Cterra HR System. All rights reserved.</span>
      </div>

      <div className="forgotInfo">
        <span className='forgotInfoImg'>
          <img src={img} alt="" />
        </span>
        <h2>Cterra HR System</h2>
        <p>Streamline your work activities and manage your time efficiently. Track your hours, request leaves, and stay organized with our comprehensive HR management platform.</p>
      </div>
    </div>
  )
}

export default ForgotPassword