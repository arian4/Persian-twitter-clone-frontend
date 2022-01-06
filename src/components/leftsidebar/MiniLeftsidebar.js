import React,{useContext} from 'react'
import './leftsidebar_m.css'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from '../../context/Theme-context'
import { HashtagIcon, NotificationIcon, MessageIcon, BookmarkIcon, TagIcon, LogOutIcon, SettingsIcon } from './../../pages/Home/icons';
import { AuthContext } from './../../context/Auth-context';
export default function MiniLeftsidebar() {
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const history = useHistory()
    const {username} = useContext(AuthContext)
    const hamburgerhandler =()=>{
        document.getElementsByClassName('ham-container')[0].style.transform ="translateX(0px)";
        // document.getElementById("mySidenav").style.transform = "translateX(0px)";
    }
    return (
        <div className={'leftsidebar_M'} style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
            
        <ul className={'ls-container'}>
            <li>
                <span onClick={()=>history.push('/')}>
                    <img src={'/images/twitter-logo.png'} width={35} height={35} />
                </span>
                
            </li>
            <li>
                <span onClick={()=>history.push('/explore')}>{HashtagIcon}</span>
                
            </li>
            <li>
                <span>{NotificationIcon}</span>
                
            </li>
            <li>
                <span>{MessageIcon}</span>
                
            </li>
            <li>
                <span>{BookmarkIcon}</span>
                
            </li>
            <li>
                <span onClick={()=>history.push(`/username/${username}`)}>{TagIcon}</span>
                
            </li>
            <li>
                <span onClick={()=>history.push(`/settings`)}>{SettingsIcon}</span>
                
            </li>
            <li>
                <span>{LogOutIcon}</span>
                
            </li>
        </ul>
                
                
                
                

            
            
        </div>
    )
}
