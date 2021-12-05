import React,{useEffect,useContext,useState} from 'react'
import  { useHistory} from 'react-router-dom'
import './userprofile.css'
import FollowBtn from '../FollowBtn/FollowBtn'
import { ThemeContext } from '../../context/Theme-context'
import { UserProfileContext } from '../../context/User-profile-context'
import { AuthContext } from '../../context/Auth-context'
import EditProfileModal from './../Modals/EditProfileModal';
export default function User_profile({user_data}) {
    
    const history = useHistory()
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const{Fullname,username,image,header_image,Followers,Followings,objectData,handleUserData,Ispending} = useContext(UserProfileContext)
    
    
    const {id,username:current_user,Ispending:current_user_pending} = useContext(AuthContext)
    
    const [EditProfile, setEditProfile] = useState(false)
    const EditProfileHandler = () => setEditProfile(true)
    
    useEffect(() => {
        
        handleUserData(user_data)
        
    }, [user_data])
    
    const check_followings = ()=>{
        history.push('/'+username+'/followings')

    }
    const check_followers = ()=>{
        history.push('/'+username+'/followers')

    }

    
    
    return (
        
        <>
            <EditProfileModal IsOpen={EditProfile} setIsOpen={setEditProfile} />
            {Ispending && current_user_pending && <div className='loader'></div> }
            {!Ispending && !current_user_pending &&
                    
                    <div className={'profile-container'} style={{color:IsLightTheme?light.color:dark.color}} >
                        <div className={'profile-header-container'}>
                            <div className={'profile-header-image'} style={{backgroundImage:`url(${header_image?header_image:'/images/banner-default.jpg'})`}}>
                                <div className={'profile-h'}>
                                    <img src={image} alt={'prof--image'} className={'prof--image'}></img>
                                    

                                
                                </div>

                            </div>

                        </div>
                        <div style={{display:'flex',justifyContent:'left',marginLeft:'20px',marginTop:'-42px'}}>
                            <FollowBtn data={objectData} current_user_id = {id}  />
                            {
                                user_data === current_user ? <button onClick={EditProfileHandler} className={IsLightTheme?'edit-profile-btn':'edit-profile-btn-dark'}>ویراش حساب کاربری</button> : null

                            }


                        </div>
                    
                    
                        <div style={{marginTop:'2rem'}}>
                            <p className={'prof-fullname'}>{Fullname}</p>
                            <p className={'prof-username'} style={{color:IsLightTheme?'rgb(83, 100, 113)':'#0097a7'}}>@{username}</p>
                            <p className={'bio'}>به صفحه رسمی من در توییتر فارسی خوش آمدید</p>

                        </div>
                        

                        <div className={'user-data'}>
                            <div className={'user-location'}>
                                <span className="material-icons" style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color,fontSize:'20px',marginRight:'5px'}}>location_on</span>
                                <span className={'user-c'} style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color}}>Iran</span>

                            </div>
                            <div className={'user-link'}>
                                <span className="material-icons" style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color,fontSize:'20px',marginRight:'5px'}}>add_link</span>
                                <a className={'user-l'} href={'#'} style={{color:'#0ae',marginRight:'5px'}}>PersianTwitter/{username}</a>

                            </div>
                            <div className={'user-joined'}>
                                <span className="material-icons" style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color,fontSize:'20px',marginRight:'5px'}}>event_note</span>
                                <span className={'user-j'} style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color}}>Joined August 2017</span>

                            </div>
                    

                        </div>
                        <div className={'f-counter'}>
                            
                            <span style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color}} onClick={check_followings}><b>{Followings.length}</b> Followings</span>
                            <span style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color}} onClick={check_followers}><b>{Followers.length}</b> Followers</span>
                        </div>
                    </div>

            }
            
        
            
        
            
            
            
                

        </>
        	
        
    )
}
