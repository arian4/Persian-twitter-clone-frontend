import React,{useContext,useState} from 'react'
import  {Link, useHistory} from 'react-router-dom'
import './card.css'
import { AuthContext } from './../../context/Auth-context';
import { ThemeContext } from '../../context/Theme-context';
import { NewtweetIcon } from '../../pages/Home/icons';
import TweetModal from '../Modals/TweetModal';


export default function UserProfileCard() {
    const {Fullname,username,image,header_image,numTweets,Followers,Followings,Ispending,LogOutUser} = useContext(AuthContext)
    const {Reset,IsLightTheme,light,dark} = useContext(ThemeContext)
    const history = useHistory()
    const [IsOpen, setIsOpen] = useState(false)
    // const [headerImage, setheaderImage] = useState('/images/banner-default.jpg')
    
    const getHeaderImage = () =>{
        if(!header_image)return '/images/banner-default.jpg'
        return header_image
    }
    
    const getUserFollowersLenght = (FollowersList) =>{
        
        return FollowersList.length
    }
    const getUserFollowingsLenght = (FollowingsList) =>{
        
        return FollowingsList.length
    }
    const LogOut = () =>{
        LogOutUser()
        Reset()
        // localStorage.clear()
        
        
        console.log('You Logged out !');
        history.push('/login')

    }
    const NewTweetHandler = () =>{
        setIsOpen(true)

    }
    return (
        <>
            <TweetModal IsOpen={IsOpen} setIsOpen={setIsOpen} />
            
            {Ispending && <div className='loader'></div>}
            {!Ispending && 
                
                <div class="user-profile-card" style={{backgroundColor:IsLightTheme?light.backgroundColor:'#555'}}>
                    
                    
                    <div className={'header-banner'}>
                        
                        <img src={getHeaderImage()} alt='banner' className='banner'/>
                        
                        
                    </div>
                    <div class="user-bio">
                        
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
                            <p style={{color:IsLightTheme?light.color:dark.color}}>{numTweets}</p>
                        </span>
                        
                        <span onClick={()=>history.push(`/${username}/followers`)}>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>دنبال کننده ها</p>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>{getUserFollowersLenght(Followers)}</p>
                        </span>
                        <span onClick={()=>history.push(`/${username}/followings`)}>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>دنبال شونده ها </p>
                            <p style={{color:IsLightTheme?light.color:dark.color}}>{getUserFollowingsLenght(Followings)}</p>
                        </span>
                    </div>
                    <div className={IsLightTheme?'card-newTweet-btn':'card-newTweet-btn-dark'} onClick={NewTweetHandler}>
                            {NewtweetIcon}
                            <span>ایجاد توییت جدید</span>
                            
                            
                    </div>
                    
                </div>
            }
            
        </>
        
        
    )
}
