import React,{useContext,useEffect,useRef,useState} from 'react'
// import Search from '../../components/Search/Search';
import { ThemeContext } from '../../context/Theme-context';

import './homecss/header.css'
function Header({title,icon,userImage}) {
    const {IsLightTheme,dark} = useContext(ThemeContext)
    
    const header = useRef()
    const [scrollTop, setScrollTop] = useState(0);
    // const [Scrolling, setScrolling] = useState(false)
    const hamburgerhandler =()=>{
        document.getElementsByClassName('ham-container')[0].style.transform ="translateX(0px)";
        // document.getElementById("mySidenav").style.transform = "translateX(0px)";
    }

    useEffect(() => {
        
        
        let main = document.getElementById('main');
        
        if (scrollTop > header.current.offsetHeight){
            // console.log('Yes')
            header.current.classList.add('sticky')
            // console.log('main.offsetWidth:',main.offsetWidth)
            // header.current.setAttribute('style',`width: ${main.offsetWidth}px`) 
            header.current.style.width = `${main.offsetWidth}px`
            
        }
        else{
            // console.log('No')
            header.current.classList.remove('sticky')

        }
        
        const onScroll = e => {
            setScrollTop(main.scrollTop);
            
        };
        main.addEventListener("scroll", onScroll);
        
        
        return () => window.removeEventListener("scroll", onScroll);
       

        
        
    }, [scrollTop])
    

    
    
    
    
    
    
    
    
    return (
        
        <>
            
            <div className={"main-header"} id={"main-header"} ref={header} style={{backgroundColor:IsLightTheme?'#fff':dark.backgroundColor}} >
                    
                    
                    <div className={'header-container'}>
                        {/* <div onClick={hamburgerhandler} className={'iconImg'} style={{backgroundImage:`url(${icon})`}}></div> */}
                        {userImage ? <img onClick={hamburgerhandler} className='userImage' src={userImage} alt='userImage'/> : <span style={{color:IsLightTheme?'#333':dark.color}} className={'iconImg'}>{icon}</span>}
                        
                        <h4 className={'header-title'} style={{color:IsLightTheme?'#111':'#adbac7'}}> {title} </h4>
                    
                        
                    </div>
                    
                    
                    
                    
                    
                    
            </div>
            
            
            
        </>
        
    )
}

export default Header;
