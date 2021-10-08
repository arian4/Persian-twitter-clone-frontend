import React,{useContext,useEffect} from 'react'

import Leftsidebar from '../leftsidebar/leftsidebar'
import Rightsidebar from '../rightsidebar/rightsidebar'

import './main.css'

import { useMediaQuery } from 'react-responsive'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'
import H_navbar from '../H_navbar/H_navbar'
import MiniLeftsidebar from '../leftsidebar/MiniLeftsidebar'
import { ThemeContext } from '../../context/Theme-context'
import AddTweetBtn from '../floating-button/AddTweetBtn'
import Nav_Icons from '../nav-icon/Nav_Icons'
import { AuthContext } from './../../context/Auth-context';


function Layout(props) {
    
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    
    const token  = localStorage.getItem('access_token')
    // console.log(token);
    
    const {FetchUserData} = useContext(AuthContext)

    useEffect(() => {
        FetchUserData(token)
        
    }, [])
    
    
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
