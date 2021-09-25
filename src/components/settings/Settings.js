import React,{useState,useContext} from 'react'
import Header from '../../pages/Home/header'
import ToggleBtn from '../ToggleBtn/ToggleBtn'
import classnames from 'classnames'
import './settings.css'
import Input from '../Input/Input'
import VALIDATIONS from '../../constant/validation_types'
import { ThemeContext } from '../../conext/Theme-context'
export default function Settings() {
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    
    return (
        <div className='main'>
            <Header title={'تنظیمات'} icon={IsLightTheme?'https://img.icons8.com/ios/30/000000/settings.png':'https://img.icons8.com/ios/30/ffffff/settings.png'} />
            
            <div className='settings-wrapper'>
                <div className={classnames('settings-wrapper-div','theme-wrapper')}>
                    <label className='settings-label' style={{color:IsLightTheme?light.color:dark.color}}>  تغییر تم  (تاریک) : </label>
                    <ToggleBtn toggleType={'Theme'} />

                </div>

                {/* <div className={classnames('settings-wrapper-div','private-account-wrapper')}>
                    <label className='settings-label' style={{color:IsLightTheme?light.color:dark.color}}>حساب خصوصی</label>
                    <ToggleBtn />

                </div> */}

                <div className={classnames('settings-wrapper-div',IsLightTheme?"twitter-data":'twitter-data-dark')}>
                    <label className='settings-label' style={{color:IsLightTheme?light.color:dark.color}}>اطلاعات شما در توییتر فارسی</label>
                    <i className='material-icons' style={{color:IsLightTheme?'#222':'#fff',fontSize:'20px'}}>keyboard_arrow_down</i>
                    
                </div>
                
                <div className={'settings-wrapper-div'}>
                    <Input  label={'نام و نام خانوادگی'} validations={[VALIDATIONS.REQUIRED]} />
                    

                </div>

                <div className={'settings-wrapper-div'}>
                    <Input  label={'نام کاربری'} validations={[VALIDATIONS.REQUIRED,VALIDATIONS.LENGTH]} />
                    

                </div>
                
                
                
                

            </div>
            
            
        </div>
    )
}
