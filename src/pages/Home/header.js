import React,{useContext,useEffect,useRef,useState} from 'react'
// import Search from '../../components/Search/Search';
import { ThemeContext } from '../../context/Theme-context';

import './homecss/header.css'
function Header({title,icon}) {
    const {IsLightTheme,dark} = useContext(ThemeContext)
    
    const header = useRef()
    const [scrollTop, setScrollTop] = useState(0);
    // const [Scrolling, setScrolling] = useState(false)
    

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
                        <div className={'iconImg'} style={{backgroundImage:`url(${icon})`}}></div>
                        {/* <img className={'iconImg'} src={icon}  alt={'icon'} ></img> */}
                        <h4 className={'header-title'} style={{color:IsLightTheme?'#111':'#adbac7'}}> {title} </h4>
                    
                        {/* <Search /> */}

                    </div>
                    
                    
                    
                    
                    
                    
            </div>
            
            
            
        </>
        
    )
}

export default Header;
