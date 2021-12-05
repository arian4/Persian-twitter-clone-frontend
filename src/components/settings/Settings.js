import React,{useState,useContext,useReducer} from 'react'
import Header from '../../pages/Home/header'
import ToggleBtn from '../ToggleBtn/ToggleBtn'
import classnames from 'classnames'
import './settings.css'
import { ThemeContext } from '../../context/Theme-context'



export default function Settings() {
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    
    
   

    
    
    
    return (
        <div className='main' id={'main'}>
            
            <Header title={'تنظیمات'} icon={IsLightTheme?'https://img.icons8.com/ios/30/000000/settings.png':'https://img.icons8.com/ios/30/ffffff/settings.png'} />
            
            <div className='settings-wrapper'>
                <div className={classnames('settings-wrapper-div','theme-wrapper')}>
                    <label className='settings-label' style={{color:IsLightTheme?light.color:dark.color}}>  تغییر تم  (تاریک) : </label>
                    <ToggleBtn toggleType={'Theme'} />

                </div>
                
                <br/>
                
                
                
                
                

            </div>
            
                

            
            
            
            
            
            
            
        </div>
    )
}
