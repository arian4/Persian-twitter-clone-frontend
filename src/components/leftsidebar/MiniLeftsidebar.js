import React,{useContext} from 'react'
import './leftsidebar_m.css'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from '../../conext/Theme-context'
export default function MiniLeftsidebar() {
    const {IsLightTheme, dark, light,ToggleTheme} = useContext(ThemeContext)
    const history = useHistory()
    const logohandler =()=>{
        history.push('/')
        
    }
    const hamburgerhandler =()=>{
        document.getElementsByClassName('ham-container')[0].style.display = 'block';
        document.getElementById("mySidenav").style.transform = "translateX(0px)";
    }
    
    return (
        <div className={'leftsidebar_M'} style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
            <div className={'ls-container'}>
                <div className='ls-logo'>
                    <img onClick={logohandler} src='/images/twitter-logo.png' alt='logo' width='48px' height='48px'></img>
                </div>
                <div className='ls-hashtag'>
                    <img onClick={hamburgerhandler} src={IsLightTheme?"https://img.icons8.com/ios/30/000000/hashtag.png":'https://img.icons8.com/ios/30/ffffff/hashtag.png'}/>

                </div>
                <div className='ls-settings'>
                    <img src={IsLightTheme?"https://img.icons8.com/ios/30/000000/settings.png":'https://img.icons8.com/ios/30/ffffff/settings.png'}/>

                </div>
                
                
                

            </div>
            
        </div>
    )
}
