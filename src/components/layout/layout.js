import React,{useContext} from 'react'

import Leftsidebar from '../leftsidebar/leftsidebar'
import Rightsidebar from '../rightsidebar/rightsidebar'

import './main.css'

import { useMediaQuery } from 'react-responsive'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'
import H_navbar from '../H_navbar/H_navbar'
import MiniLeftsidebar from '../leftsidebar/MiniLeftsidebar'
import { ThemeContext } from '../../conext/Theme-context'
import AddTweetBtn from '../floating-button/AddTweetBtn'
import Nav_Icons from '../nav-icon/Nav_Icons'


function Layout(props) {
    console.log('Width changed !');
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    // const isMobileDevice = useMediaQuery({
    //     query: "(max-device-width: 480px)",
    // });
    
    
    const isTabletDevice = useMediaQuery({ minWidth: 481, maxWidth: 768 })
    const isDesktop = useMediaQuery({ minWidth: 769 })
    const isMobileDevice  = useMediaQuery({maxWidth: 480})
    return (
        <>
           
        
            
            
            {isMobileDevice && <div className='container' style={{flexDirection:'column',backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}> <H_navbar/> {props.children} <AddTweetBtn /> <Nav_Icons /> <HamburgerMenu/> </div> }
            {isTabletDevice && <div className='container' style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}> <HamburgerMenu/> {props.children}  <MiniLeftsidebar/></div> }
            {isDesktop && <div className='container' style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}><Rightsidebar/> {props.children} <Leftsidebar /></div>}
            
            
            
            
        </>
    )
}

export default Layout;
