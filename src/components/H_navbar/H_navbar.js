import React,{useContext} from 'react'
import { Link , useLocation } from 'react-router-dom'
import { ThemeContext } from '../../conext/Theme-context'
import Dropdown from '../dropdownMenu/Dropdown'
import useFetch from '../useFetch/useFetch'
import './H_navbar.css'
export default function H_navbar() {
    const location = useLocation();
    // console.log(location.pathname);
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const hamburgerMenu = () =>{
        
        document.getElementsByClassName('ham-container')[0].style.display = 'block';
        document.getElementById("mySidenav").style.transform = "translateX(0px)";
    }

    const {data:users , error } = useFetch('http://127.0.0.1:8000/twitter/api/best-twitters/')

    
    return (
        <>
        {error && <div>{error}</div>}
        <div className='h-header' style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
            
            <img src="/images/twitter-logo.png" className={'h-logo'}></img>
            <img src={IsLightTheme?'/images/menu.png':'/images/menu-w.png'} className={'hamburger'} onClick={hamburgerMenu}></img>
            <div style={{display:'flex',marginRight:'auto',alignItems:'center'}}>
                <p style={{marginLeft:'0.75rem',fontSize:'13px',color:'grey'}}>{localStorage.getItem('username')}@</p>
                <Dropdown />
                

            </div>
            
            
            
            
        </div>
        {location.pathname === '/' &&
            <>
                <h5 style={{textAlign:'right',padding:'7px',backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor,color:IsLightTheme?light.color:dark.color}}>بهترین خبرنگاران</h5>
                <nav className="h-navbar" style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
                    {
                        users.map(tweeters=>{
                            return(
                                <Link to={'/username/'+tweeters.username} style={{color:'#111'}}>
                                    <div className="h-user-prof">
                                        <img className="h-avatar" src={tweeters.image}></img>
                                        <p id="h-username" style={{color:IsLightTheme?light.color:dark.color}}>{tweeters.username}</p>
                                    </div>
            
                                </Link>
                                
            
                            )
                        })
                    }
                
        
                
        
                </nav>
            </>
        }
        
            
        </>
    )
}
