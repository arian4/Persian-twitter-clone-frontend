import React,{useContext,useRef} from 'react'
import { ThemeContext } from '../../context/Theme-context'
import '../../pages/Home/home.css'
import './HamburgerMenu.css'
import { CloseIcon, TagIcon, SearchIcon, SettingsIcon, LogOutIcon, NotificationIcon, EditUserProfileIcon, BookmarkIcon } from './../../pages/Home/icons';
import { AuthContext } from './../../context/Auth-context';
export default function HamburgerMenu() {
    const {IsLightTheme,dark} = useContext(ThemeContext)
    const ham_ref = useRef()
    
    const closeBtn = () => ham_ref.current.style.transform ="translateX(300px)";

   const {Fullname,username,image,Followers,Followings} = useContext(AuthContext) 
    return (
       
       <div className="ham-container" ref={ham_ref}>
           <div className='ham-header'>
               <h4>اطلاعات حساب کاربری</h4>
               <span onClick={closeBtn}>{CloseIcon}</span>
           </div>
           <div className='ham-user-data'>
               <img src={image} alt='user-img' />
               <h4>{Fullname}</h4>
               <p>@{username}</p>
               <div className={'ham-follow-data'}>
                   <p><span>{Followers.length}</span>دنبال کننده ها</p>
                   <p><span>{Followings.length}</span>دنبال شونده ها</p>
               </div>

           </div>
            <ul className="toggle-menu">
                
                
                <li className="menu-item"><a href="#" className="menu-item-link"> {TagIcon}حساب کاربری</a></li>
                <li className="menu-item"><a href="#" className="menu-item-link">{NotificationIcon}اطلاعیه ها</a></li>
                <li className="menu-item"><a href="#" className="menu-item-link"> {EditUserProfileIcon}ویرایش حساب کاربری</a></li>
                <li className="menu-item"><a href="#" className="menu-item-link"> {BookmarkIcon}نشانک ها</a></li>
                <li className="menu-item"><a href="#" className="menu-item-link"> {SearchIcon}جستجو</a></li>
                <li className="menu-item"><a href="#" className="menu-item-link">{SettingsIcon}تنظیمات</a></li>
                <li className="menu-item"><a href="#" className="menu-item-link">{LogOutIcon}خروج</a></li>
            </ul>
        </div>
        
    )
}
