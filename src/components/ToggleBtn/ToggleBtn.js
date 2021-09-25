import React,{useRef,useContext} from 'react'
import classnames from 'classnames'
import './toggle.css'
import { ThemeContext } from '../../context/Theme-context'
export default function ToggleBtn({toggleType}) {
    const {ToggleTheme} = useContext(ThemeContext)
    const toggle = useRef()
    
    const ToggleHandler = ()=>{
        
        
        
        if(toggleType==='Theme'){
            if(localStorage.getItem('IsLightTheme')==='true'){
                localStorage.setItem('IsLightTheme',false)
            }else{
                localStorage.setItem('IsLightTheme',true)
    
            }
            ToggleTheme()
            
        }
        
        
    }
    return (
        <>
             <label className="switch">
                <input id={'toggleBtn'} ref={toggle} type="checkbox" checked={localStorage.getItem('IsLightTheme')!=='true'? true: false} />
                <span onClick={ToggleHandler} className={classnames("slider","round")} />
            </label>
        </>
       
    )
}
