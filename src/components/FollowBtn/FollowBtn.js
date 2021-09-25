import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './followbtn.css'
import { ThemeContext } from '../../conext/Theme-context'
import classnames from 'classnames'
import { UserProfileContext } from '../../conext/User-profile-context'

export default function FollowBtn({data}) {
    const {IsLightTheme} = useContext(ThemeContext)
    
    const[checkFollowStatus,setcheckFollowStatus] = useState('Follow')
    const{handleUserData} = useContext(UserProfileContext)
    const[followBtnClass,setfollowBtnClass] = useState(IsLightTheme?'follow-btn':'follow-btn-dark')
    const[showButton,setshowButton] = useState(true)
    
    // console.log(data);
    useEffect(() => {
        
        
        if(data.Followers.includes(parseInt(localStorage.getItem('id')))){
            console.log('includes USER');
            setfollowBtnClass(IsLightTheme?'f-follow-btn':'f-follow-btn-dark')
            setcheckFollowStatus('Following')

    }else{
        console.log('not includes USER ');
        setfollowBtnClass(IsLightTheme?'follow-btn':'follow-btn-dark')
        setcheckFollowStatus('Follow')

    }
    
    // #########################
    if(data.id===parseInt(localStorage.getItem('id'))){
        setshowButton(false)
    }else{
        setshowButton(true)
    }
    // console.log(followBtnClass);
        
    }, [JSON.stringify(data),IsLightTheme])
    const handleFollowBtn  = (e)=>{
        
        axios.post('http://127.0.0.1:8000/twitter/api/users/', {
            'owner_Id': data.id,
            'user_Id'  : parseInt(localStorage.getItem('id')) ,
            
          })
          .then(function (response) {
              console.log(response.data);
              if(e.target.classList.contains(IsLightTheme?'follow-btn':'follow-btn-dark')){
                e.target.classList.remove(IsLightTheme?'follow-btn':'follow-btn-dark')
                e.target.classList.add(IsLightTheme?'f-follow-btn':'f-follow-btn-dark')
                // set_Followers_counter(Followers_counter+1)
                
                setcheckFollowStatus('Following')
            }else{
                e.target.classList.remove(IsLightTheme?'f-follow-btn':'f-follow-btn-dark')
                e.target.classList.add(IsLightTheme?'follow-btn':'follow-btn-dark')
                // set_Followers_counter(Followers_counter-1)
                setcheckFollowStatus('Follow')
    
            }
            
              
            
              
            
          })
          .then(()=>{
              
              handleUserData(data.username)
              
              
              
          })
          .catch(function (error) {
            console.log(error);
            
        });
        
        
        
    }

    
    return (
        <>
            {showButton && <button className={classnames('followBtn-I',followBtnClass)}  onClick={handleFollowBtn}>{checkFollowStatus}</button>}
            
            
        </>
    )
}
