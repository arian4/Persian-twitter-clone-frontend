
import React,{useState,useContext,useEffect} from 'react'
import './leftsidebar.css'
import useFetch from '../useFetch/useFetch';
import Dropdown from '../dropdownMenu/Dropdown';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme-context';
import { AuthContext } from '../../context/Auth-context';


function Leftsidebar() {
    const token  = localStorage.getItem('access_token')
    const {username,Ispending,FetchUserData} = useContext(AuthContext)
    
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const [Notifications, setNotifications] = useState([])
    const [showCounter, setshowCounter] = useState(false)
    const getNotifications = () =>{
        axios.get('http://127.0.0.1:8000/twitter/api/notifications/'+localStorage.getItem('username'))
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
    useEffect(() => {
        FetchUserData(token)
    }, [])

    
    
    
    
    
   
    return (
        
        
        <div className={'leftsidebar'}>
            
            {error && <div>{error}</div>}
            <div className={"leftsidebar-header"}>
                <div style={{display:'flex'}}>

                    
                    <Dropdown />

                </div>
                
                <div>
                {!Ispending && <p style={{color:IsLightTheme?light.color:dark.color,lineHeight:'2rem',fontSize:'13px',cursor:'pointer'}}>{username}@</p> }
                

                </div>
                
                
                <div style={{display:'flex',flexDirection:'row-reverse',marginLeft:'auto'}}>
                    <img src={IsLightTheme?'/images/notif.png':'/images/notif-w.png'} alt='new-message' style={{width:'25px',cursor:'pointer'}} onClick={showNotif} /> 
                    
                    {showCounter && <div style={{backgroundColor:'tomato',borderRadius:'50%',color:'#fff',width:'14px',height:'14px',textAlign:'center',marginLeft:'-8px',fontSize:'10px'}}>{Notifications.length}</div> }
                    
                    
                </div>
                
                
            </div>
            <div className={'notif--part'} >
                {Notifications.length>0?
                    Notifications.map(notif=>{
                        
                        return(
                            <div className={'notif-container'}>
                                <div className={'notif-body'}>
                                    <img src={notif.sender.image} alt={'notif-img'}></img>
                                    <span>{notif.sender.Fullname}</span>
                                    
                                </div>
                                <p className={'notif-defualt-text'}><a style={{color:'#5ea9dd'}} href={'/username/'+notif.sender.username}>{notif.sender.username}</a>شما را خطاب قرار داد:</p>
                                <p className={'notif-text'}>{notif.Text}</p>
                            </div>
                        )
                    })
                    :<p style={{fontSize:'13px',margin:'1rem'}}>اطلاعیه ای وجود ندارد</p>
                }
            </div>
            
            
                
                


            
            
            
            
            <div class={IsLightTheme?'leftsidebar-content':'leftsidebar-content-dark'}>
                <h3 style={{margin:'10px 12px',color:IsLightTheme?light.color:dark.color}}>بهترین خبرنگاران</h3>
                <hr></hr>
                
                {
                    users.map(tweeters=>{
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
                
                
                
            </div>
            {ispending && <img src='/images/dots-loading.gif' alt='dots-loading' style={{width:'60px',marginRight:'30px'}}></img>}
            
        </div>
    )
}

export default Leftsidebar;
