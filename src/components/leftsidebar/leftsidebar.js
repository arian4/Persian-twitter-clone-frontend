import React,{useState,useContext,useEffect} from 'react'
import './leftsidebar.css'
import useFetch from '../useFetch/useFetch';
// import Dropdown from '../dropdownMenu/Dropdown';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme-context';
import { AuthContext } from '../../context/Auth-context';
import UserProfileCard from '../UserProfileCard/UserCardProfile';



function Leftsidebar() {
    
    const {Fullname,username,image,Ispending} = useContext(AuthContext)
    const [CurPage, setCurPage] = useState(5)
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const [Notifications, setNotifications] = useState([])
    const [showCounter, setshowCounter] = useState(false)
    const getNotifications = () =>{
        axios.get(`http://127.0.0.1:8000/twitter/api/notifications/${username}`)
        .then(function (response) {
            // handle success
            
            setNotifications(response.data)
            console.log('notifications updated ...');
            console.log(response.data);
            
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        
        
    }
    
    
    const {data:users , ispending , error } = useFetch('http://127.0.0.1:8000/twitter/api/best-twitters/')
    

    
    const showNotif = () =>{
        
        
        let notif= document.getElementsByClassName('notif--part')[0];
        notif.classList.toggle('show');
        
        if (notif.classList.contains('show')){
            getNotifications()
            
            setshowCounter(true)
        }else{
            setshowCounter(false)
        }
        
        
        
    }
    const showMore = () =>{
        setCurPage(prevState => prevState + 3)
    }
    

    
    
    
    
    
   
    return (
        
        
        <div className={'leftsidebar'}>
            
            {error && <div>{error}</div>}
            <div className={"leftsidebar-header"}>
                <UserProfileCard />
            </div>
            {/* <div className={"leftsidebar-header"}>
                <div style={{display:'flex'}}>

                    
                    <Dropdown current_user_username = {username} current_user_Fullname = {Fullname} current_user_image = {image} />

                </div>
                
                <div>
                {!Ispending && <p style={{color:IsLightTheme?light.color:dark.color,lineHeight:'2rem',fontSize:'13px',cursor:'pointer'}}>{username}@</p> }
                

                </div>
                
                
                <div style={{display:'flex',flexDirection:'row-reverse',marginLeft:'auto'}}>
                    <img src={IsLightTheme?'/images/notif.png':'/images/notif-w.png'} alt='new-message' style={{width:'25px',cursor:'pointer'}} onClick={showNotif} /> 
                    
                    {showCounter && <div style={{backgroundColor:'tomato',borderRadius:'50%',color:'#fff',width:'14px',height:'14px',textAlign:'center',marginLeft:'-8px',fontSize:'10px'}}>{Notifications.length}</div> }
                    
                    
                </div>
                
                
            </div> */}
            {/* <div className={'notif--part'} >
                {Notifications.length>0?
                    Notifications.map(notif=>{
                        
                        return(
                            <div className={'notif-container'}>
                                <div className={'notif-body'}>
                                    <img src={notif.sender.image} alt={'notif-img'}></img>
                                    <span>{notif.sender.Fullname}</span>
                                    
                                </div>
                                <p className={'notif-defualt-text'}><a style={{color:'#5ea9dd'}} href={'/username/'+notif.sender.username}>{notif.sender.username}</a>?????? ???? ???????? ???????? ??????:</p>
                                <p className={'notif-text'}>{notif.Text}</p>
                            </div>
                        )
                    })
                    :<p style={{fontSize:'13px',margin:'1rem'}}>?????????????? ???? ???????? ??????????</p>
                }
            </div> */}
            
            
                
                


            
            
            
            
            <div class={IsLightTheme?'leftsidebar-content':'leftsidebar-content-dark'}>
                <h3 style={{margin:'10px 12px',color:IsLightTheme?light.color:dark.color}}>???????????? ??????????????????</h3>
                <hr></hr>
                
                {!ispending &&
                    users.map((tweeters,index)=>{
                        if ( index >= CurPage )return
                        return(
                            // '/username/'+tweeters.username
                            // <a href={'/username/'+tweeters.username} key={tweeters.id}>
                            <Link to={'/username/'+tweeters.username}>
                                <div className={IsLightTheme?'user-prof':'user-prof-dark'}>
                                    
                                    <img src={tweeters.image} alt={'avatar-usr'} className={"avatar"}></img>
                                    <div className={IsLightTheme?'user-id':'user-id-dark'}>

                                        <p>{tweeters.Fullname} </p>
                                        <p>{tweeters.username}</p>

                                    </div>

                                
                                
                    
                                </div>

                            </Link>
                                
                            // </a>

                        )
                    })
                }
                {CurPage >= users.length ? null :
                    <div onClick={showMore} style={{paddingTop:'12px',fontSize:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:IsLightTheme?light.color:dark.color,cursor:'pointer'}} href='#'>
                        ?????????? ??????????
                    
                    </div>
                }
                
                
                
               
            </div>
            {ispending && <div className={'loader'}></div>}
            
        </div>
    )
}

export default Leftsidebar;
