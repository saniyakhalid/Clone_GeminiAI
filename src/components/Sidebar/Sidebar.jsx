import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  
  return (
    <div className='sidebar'>
      <div className="top">
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className='menu' 
          src={assets.menu_icon} 
          alt='Menu'
        />
        <div className='new-chat'>
          <img src={assets.plus_icon} alt='New'/>
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className='recent'>
            <p className='recent-title'>Recent</p>
            <div className='recent-entry'>
              <img src={assets.message_icon} alt='Chat'/>
              <p>What is react..</p>
            </div>
          </div>
        )}
      </div>
      <div className='bottom'>
        <div className='bottom-item'>
          <img src={assets.question_icon} alt='Help'/>
          {extended && <p>Help</p>}
        </div>
        <div className='bottom-item'>
          <img src={assets.history_icon} alt='History'/>
          {extended && <p>Activity</p>}
        </div>
        <div className='bottom-item'>
          <img src={assets.setting_icon} alt='Settings'/>
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
