import React,{useContext} from 'react'
import  { Link} from 'react-router-dom'
import { ThemeContext } from '../../context/Theme-context'
import { HomeIcon, MessageIcon, NotificationIcon, SearchIcon } from '../../pages/Home/icons'
import './navicons.css'
export default function Nav_Icons() {
    const {IsLightTheme} = useContext(ThemeContext)
    return (
        <>
            <nav className='nav-icons' style={{backgroundColor:IsLightTheme?'#fff':'#2d2d2d'}}>
                <div>
                    <Link to='/' style={{color:IsLightTheme?'#333':'#fff'}}>
                        {HomeIcon}

                    </Link>
                    
                </div>
                <div>
                    <Link to='/explore' style={{color:IsLightTheme?'#333':'#fff'}}>
                        {SearchIcon}
                    </Link>
                    
                </div>
                <div>
                    <Link to='/notifications'  style={{color:IsLightTheme?'#333':'#fff'}}>
                        {NotificationIcon}

                    </Link>
                    
                </div>
                <div>
                    <Link to='/messages' style={{color:IsLightTheme?'#333':'#fff'}}>
                        {MessageIcon}

                    </Link>
                    
                </div>
            </nav>
            
        </>
    )
}
