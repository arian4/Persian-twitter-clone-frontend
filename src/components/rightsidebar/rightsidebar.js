import React, { useState,useContext} from 'react'
import './rightsidebar.css'
import { useMediaQuery } from 'react-responsive'
import Hashtags from '../RightSide-content/Hashtags'
import { ThemeContext } from '../../context/Theme-context'
import { Link,useHistory } from 'react-router-dom'
import { HashtagIcon, SettingsIcon } from '../../pages/Home/icons'
import Suggestions from '../RightSide-content/suggestions'


function Rightsidebar() {
    const history = useHistory()
    const[theme_mode,settheme_mode] = useState('dark_mode')
    const isDesktop = useMediaQuery({ minWidth: 769 })
    const isTabletDevice = useMediaQuery({
        query: "(max-device-width: 768px)",
    });
    const {IsLightTheme, dark, light,ToggleTheme} = useContext(ThemeContext)
    const closeMenu = ()=>{
        document.getElementsByClassName('ham-container')[0].style.display = 'none';
        document.getElementById("mySidenav").style.transform = "translateX(0px)";
    }
    const toggleTheme =()=>{
        if(localStorage.getItem('IsLightTheme')==='true'){
            localStorage.setItem('IsLightTheme',false)
        }else{
            localStorage.setItem('IsLightTheme',true)

        }
       
        // localStorage.getItem(IsLightTheme)?localStorage.setItem('IsLightTheme',false):localStorage.setItem('IsLightTheme',false)
        
        const theme = theme_mode==='dark_mode'?'light_mode':'dark_mode'
        
        settheme_mode(theme)
        ToggleTheme()
        // console.log(Theme);

    }
    
    return (
        
        <div className={"rightsidebar"} >
            
            {isTabletDevice && <i className={'material-icons'} style={{color:'grey',float:'left',marginLeft:'10px',cursor:'pointer'}} onClick={closeMenu}>cancel</i>}
            <Link to={'/'}>
                <div className={"rightsidebar-header"}>
                    
                    <img src={"/images/twitter-logo.png"} alt={'logo'} className={"logo"}></img>
                    <h3 style={{"color":"#53c6e6"}}>توییتر فارسی</h3>

                    
                    
                    
                    

                </div>

            </Link>
            {isDesktop && <div className={'settings-container'}>
                
                <div className={IsLightTheme?'settings':'settings-dark'} onClick={e=>history.push('/settings')}>
                    <span className='settings-wrapper' style={{color:IsLightTheme?'#111':dark.color}}>
                        {SettingsIcon}
                        <span style={{color:IsLightTheme?'#111':dark.color}}>تنظیمات</span>

                    </span>
                    

                </div>

                <div className={IsLightTheme?'explore':'explore-dark'} onClick={e=>history.push('/explore')}>
                    <span className='explore-wrapper' style={{color:IsLightTheme?'#111':dark.color}}>
                        {HashtagIcon}
                        <span style={{color:IsLightTheme?'#111':dark.color}}>جستجو</span>

                    </span>
                    
                    

                </div>
                
                

            </div>}
            
            
                

            
            <button className={'toggle-theme'} onClick={toggleTheme}>
                
                <span className={'material-icons'} style={{color:'silver',padding:'4px'}}>{theme_mode}</span>
            </button>
            <h3 className={'h--title'} style={{color:IsLightTheme?light.color:dark.color}}>داغ ترین هشتگ ها</h3>
            <Hashtags theme={{IsLightTheme, dark, light}} />
            <Suggestions />
            
            

            
        </div>
        
    )
}

export default Rightsidebar;
