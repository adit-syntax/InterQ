import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

const Navbar = () => {
    const navigate = useNavigate()
    const { user, handleLogout } = useAuth()

    const onLogout = async () => {
        await handleLogout()
        navigate('/landing')
    }

    return (
        <nav className='app-top-nav'>
            <div className='nav-brand' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img src='/logo.png' alt='InterQ Logo' className='app-logo' />
                <span className='app-brand-name'>Inter<span className='highlight'>Q</span></span>
            </div>

            <div className='nav-user-area'>
                {user && (
                    <div className='user-badge'>
                        <span className='user-avatar'>{user.username?.[0]?.toUpperCase() || 'U'}</span>
                        <span className='user-name'>{user.username}</span>
                    </div>
                )}
                <button className='logout-btn' onClick={onLogout} title='Sign out of your account'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    <span>Sign Out</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
