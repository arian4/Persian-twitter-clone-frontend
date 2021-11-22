import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './followbtn.css'
import { ThemeContext } from '../../context/Theme-context'
import classnames from 'classnames'
import { UserProfileContext } from '../../context/User-profile-context'
import { AuthContext } from './../../context/Auth-context';


export default function FollowBtn({data,current_user_id,style}) {
    
    
    const {IsLightTheme} = useContext(ThemeContext)
    
    const[checkFollowStatus,setcheckFollowStatus] = useState('Follow')
    const{handleUserData} = useContext(UserProfileContext)
    const {FetchUserData} = useContext(AuthContext)

    const[followBtnClass,setfollowBtnClass] = useState(IsLightTheme?'follow-btn':'follow-btn-dark')
    const[showButton,setshowButton] = useState(true)
    
    
    // console.log(data);
    useEffect(() => {
        
        
        console.log('current_user_id :' , current_user_id)
        if(data.Followers.includes(current_user_id)){
            setfollowBtnClass(IsLightTheme?'f-follow-btn':'f-follow-btn-dark')
            setcheckFollowStatus('Following')

    }else{
        
        
        setfollowBtnClass(IsLightTheme?'follow-btn':'follow-btn-dark')
        setcheckFollowStatus('Follow')

    }
    
    // #########################
    if(data.id === current_user_id){
        setshowButton(false)
    }else{
        setshowButton(true)
    }
    // console.log(followBtnClass);
        
    }, [JSON.stringify(data),IsLightTheme])
    
    const handleFollowBtn  = (e)=>{
        
        axios.post('http://127.0.0.1:8000/twitter/api/users/', {
            'owner_Id': data.id,
            'user_Id'  : current_user_id ,
            
          })
          .then(function (response) {
              console.log(response.data);
              if(e.target.classList.contains(IsLightTheme?'follow-btn':'follow-btn-dark')){
                e.target.classList.remove(IsLightTheme?'follow-btn':'follow-btn-dark')
                e.target.classList.add(IsLightTheme?'f-follow-btn':'f-follow-btn-dark')
                
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
              FetchUserData(localStorage.getItem('access_token'))
              
              
              
          })
          .catch(function (error) {
            console.log(error);
            
        });
        
        
        
    }

    
    return (
        <>
            {showButton && <button style={style} className={classnames('followBtn-I',followBtnClass)}  onClick={handleFollowBtn}>{checkFollowStatus}</button>}
            
            
        </>
    )
}
