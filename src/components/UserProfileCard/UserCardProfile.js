import React,{useContext} from 'react'
import  {Link, useHistory} from 'react-router-dom'
import './card.css'
import { AuthContext } from './../../context/Auth-context';
import { useTweetState } from '../../context/TweetContext';
import { ThemeContext } from '../../context/Theme-context';


export default function UserProfileCard() {
    const {Fullname,username,image,Followers,Followings,Ispending,LogOutUser} = useContext(AuthContext)
    const {Reset,IsLightTheme,light,dark} = useContext(ThemeContext)
    const {tweets} = useTweetState()
    const history = useHistory()

    const getUserTweetsLenght = (tweetArr,username) =>{
        let user_tweets = tweetArr.filter((t)=> t.sender.username == username)
        return user_tweets.length
    }
    const LogOut = () =>{
        LogOutUser()
        Reset()
        // localStorage.clear()
        
        
        console.log('You Logged out !');
        history.push('/login')

    }
    return (
        <>
            {Ispending && <div className='loader'></div>}
            {!Ispending && 
                
                <div class="user-profile-card" style={{backgroundColor:IsLightTheme?light.backgroundColor:'#555'}}>
                    
                    
                    <div className={'header-banner'}>
                        
                        <img src='/images/twitter-banner.jpg' alt='banner' className='banner'/>
                    </div>
                    <div class="user-bio">
                        {/* <div className='image-wrapper'>
                            <i class="material-icons">power_settings_new</i>
                            <img src={image} class="card-image" />
                            

                        </div> */}
                        <i onClick={LogOut} class="material-icons">logout</i>
                        <Link to={`/username/${username}`}>
                            <img src={image} class="card-image" />
                            
                        </Link>
                        
                        <p style={{color:IsLightTheme?light.color:dark.color}}>{Fullname}</p>
                        <p style={{color:IsLightTheme?light.color:dark.color}}>@{username}</p>
                        <p style={{color:IsLightTheme?light.color:dark.color}}>
                            <span className="material-icons" style={{fontSize:'18px'}}>location_on</span>
                            Tehran , Iran
                        </p>
        
                    </div>
                    <div class="profile-data">
                        
                        <span onClick={()=>history.push(`/username/${username}`)}>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>توییت</p>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>{getUserTweetsLenght(tweets,username)}</p>
                        </span>
                        
                        <span onClick={()=>history.push(`/${username}/followers`)}>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>دنبال کننده ها</p>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>{Followers.length}</p>
                        </span>
                        <span onClick={()=>history.push(`/${username}/followings`)}>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>دنبال شونده ها </p>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>{Followings.length}</p>
                        </span>
                    </div>
                </div>
            }
            
        </>
        
        
    )
}
