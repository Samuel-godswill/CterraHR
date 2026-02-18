import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import img from '../../../assets/img/image (2).png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Remember me:', rememberMe)
    
    // TODO: After backend integration, replace this with actual login API call
    // For now, redirect to employee dashboard on submit
    navigate('/employee/dashboard')
  }

  return (
    <div className='container'>
      <div className="loginForm">
        <div className="loginLogo">
            <p>Cterra</p>
        </div>
        <section className='loginHeader'>
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </section>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="email">Email Address</label>
            <div className="inputWrapper">
              <span className="inputIcon left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.24283 6.85435L11.4895 1.3086C11.8062 1.11865 12.2019 1.11872 12.5185 1.30878L21.7573 6.85433C21.9079 6.9447 22 7.10743 22 7.28303V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.28315C2 7.10748 2.09218 6.94471 2.24283 6.85435ZM4 8.13261V19H20V8.13214L12.0037 3.33237L4 8.13261ZM12.0597 13.6983L17.3556 9.23532L18.6444 10.7647L12.074 16.3017L5.36401 10.7717L6.63599 9.2283L12.0597 13.6983Z" fill="rgb(156, 163, 175)" stroke-width="1px" fill-opacity="1" stroke-opacity="1"/></svg>
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

          <section>
            <label htmlFor="password">Password</label>
            <div className="inputWrapper">
              <span className="inputIcon left">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z" fill="rgb(156, 163, 175)" stroke-width="1px" fill-opacity="1" stroke-opacity="1"/></svg>
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className="iconBoth"
                required
              />
              <span
                className="inputIcon right"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </span>
            </div>
          </section>

          <section className='rememberRow'>
            <div>
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className='forgot-password'>
              <span>Forgot password?</span>
            </Link>
          </section>

          <button type="submit">Sign In</button>
        </form>
        <span className='loginSpan'>© 2026 Cterra HR System. All rights reserved.</span>
      </div>

      <div className="loginInfo">
        <span className='loginInfoImg'>
          <img src={img} alt="" />
        </span>
        <h2>Cterra HR System</h2>
        <p>Streamline your work activities and manage your time efficiently. Track your hours, request leaves, and stay organized with our comprehensive HR management platform.</p>
      </div>
    </div>
  )
}

export default Login