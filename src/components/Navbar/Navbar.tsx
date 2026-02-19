import './navbar.css'
import { useState } from 'react'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  
  const username = "John Doe"
  const email = "example@cterra.com"
  const firstLetter = username.charAt(0)

  return (
    <nav className='navbar'>
      <div className="navItems">
        <span className="notificationIcon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>          </svg>
          <span className="badge">3</span>
        </span>
        
        <div className="userSection">
          <span className='avatar'>{firstLetter}</span>
          <span className={`dropdownArrow ${showModal ? "active" : ""}`}
          onClick={() => setShowModal(prev => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>
          </span>

          {showModal && (
            <>
              <div className="modalBackdrop" onClick={() => setShowModal(false)} />
              
              <div className="dropdownMenu">
                <div className="dropdownHeader">
                  <span className="dropdownAvatar">{firstLetter}</span>
                  <div className="dropdownUserInfo">
                    <h3 className="dropdownUsername">{username}</h3>
                    <span className="dropdownEmail">{email}</span>
                  </div>
                </div>

                <div className="dropdownDivider" />

                <div className="dropdownItem">
                  <span className="dropdownIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 20H19V22H5V20ZM12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 14.4183 16.4183 18 12 18ZM12 16C15.3137 16 18 13.3137 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16Z"/>
                    </svg>
                  </span>
                  <p>My Profile</p>
                </div>
                
                <div className="dropdownDivider" />

                <div className="dropdownItem danger">
                  <span className="dropdownIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"/>
                    </svg>
                  </span>
                  <p>Logout</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar