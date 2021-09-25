import React,{useContext} from 'react'
import { ThemeContext } from '../../context/Theme-context'
import '../../pages/Home/home.css'
import Rightsidebar from '../rightsidebar/rightsidebar'
import './HamburgerMenu.css'
export default function HamburgerMenu() {
    const {IsLightTheme,dark} = useContext(ThemeContext)
    return (
        <div className={'ham-container'}>
            <div id={"mySidenav"} className={"sidenav"} style={{backgroundColor:IsLightTheme?'#fff':dark.backgroundColor}}>
            
                <Rightsidebar/>

            
            
            
            
            </div>

        </div>
        
    )
}
