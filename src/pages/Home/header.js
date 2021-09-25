import React,{useContext} from 'react'

import { useMediaQuery } from 'react-responsive'
import Search from '../../components/Search/Search';
import { ThemeContext } from '../../conext/Theme-context';

import './homecss/header.css'
function Header({title,icon}) {
    const {IsLightTheme} = useContext(ThemeContext)
    

    const isTabletDevice = useMediaQuery({
        query: "(max-device-width: 768px)",
    });
    const isSmallDevice = useMediaQuery({
        query: "(max-device-width: 281px)",
    });
    
    
    
    
    
    
    return (
        
        <>
            
            <div className={"main-header"} >
                    
                    
                    
                    <img className={'iconImg'} src={icon}  alt={'icon'} ></img>
                    
                    
                    
                    <h4 className={'header-title'} style={{color:IsLightTheme?'#111':'#adbac7'}}> {title} </h4>
                    {/* <input className={IsLightTheme?'search-box':'search-box-dark'} placeholder={'جستجو کنید ...'}></input> */}
                    <Search />
                    
                    {/* <img src="https://img.icons8.com/windows/32/000000/search--v1.png"/> */}
                    
                    
                    
            </div>
            
            
            
        </>
        
    )
}

export default Header;
