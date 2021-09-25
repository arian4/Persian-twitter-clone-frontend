import React,{useState,useEffect,useContext} from 'react'
import { ThemeContext } from '../../context/Theme-context';


import SORT_TYPES from '../../constant/sort_type';
import './tablist.css'



function TabList({setsortType}) {
    const {IsLightTheme} = useContext(ThemeContext)
    const [isActivTab,setisActivTab] = useState(0)
    
    
    useEffect(() => {
        console.log('TabList useEffect ran !');
        
        switch(isActivTab){
            case 0:{
                
                
                setsortType(SORT_TYPES.NEW_TWEETS)
                
                break
            }
            case 1 :{
                
                
                setsortType(SORT_TYPES.HOT_TWEETS)
                
                break
            }
            case 2:{
                
                
                setsortType(SORT_TYPES.RETWEETS)
                
                break
            }
            case 3:{
                
                
                setsortType(SORT_TYPES.IMAGES_MEDIA)
                
                break
            }
        }
        
    }, [isActivTab])
    

    
    const handleActiveTab = (e,index)=>{
        e.preventDefault();
        
        setisActivTab(index)
        

    }
    
    
    return (
        <nav className={'tablist-nav'}>
            <ul className={'tablist'}>
            
                <a style={{color:IsLightTheme?'rgb(83, 100, 113)':'rgb(247, 249, 250)'}} href={'#newtweets'} className={isActivTab===0 ?IsLightTheme?'active-tab':'active-tab-dark':'tablist-item-link'} onClick={e=>handleActiveTab(e,0)}>تازه ترین توییت ها </a>
                <a style={{color:IsLightTheme?'rgb(83, 100, 113)':'rgb(247, 249, 250)'}} href={'#hottweets'} className={isActivTab===1 ?IsLightTheme?'active-tab':'active-tab-dark':'tablist-item-link'} onClick={e=>handleActiveTab(e,1)}>داغ ترین توییت ها</a>
                <a style={{color:IsLightTheme?'rgb(83, 100, 113)':'rgb(247, 249, 250)'}} href={'#retweets'} className={isActivTab===2 ?IsLightTheme?'active-tab':'active-tab-dark':'tablist-item-link'} onClick={e=>handleActiveTab(e,2)}>ری توییت ها</a>
                <a style={{color:IsLightTheme?'rgb(83, 100, 113)':'rgb(247, 249, 250)'}} href={'#images&media'} className={isActivTab===3 ?IsLightTheme?'active-tab':'active-tab-dark':'tablist-item-link'} onClick={e=>handleActiveTab(e,3)}>عکس ها و مدیا</a>
            </ul>
        </nav>
    )
}

export default TabList
