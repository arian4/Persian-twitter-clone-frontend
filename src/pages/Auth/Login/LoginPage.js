import React, { useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { useHistory } from 'react-router-dom'
import { ThemeContext } from '../../../conext/Theme-context';


function LoginPage(props) {
    
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const[loggedIn,setloggedIn] = useState(false)
    const {Reset} = useContext(ThemeContext)
    
    const history = useHistory()
    
    // const {loggedInUser} = useTweetState()
    
    
    const HandleLogin = () =>{
        
        
        
        
        // console.log(username);
        // console.log(password);
        
        // console.log(props);
        
        
        axios.post('http://127.0.0.1:8000/twitter/api/login/', {
            'username': username,
            'password': password
          })
        .then(function (response) {
            console.log(response.data);
            
            localStorage.setItem('access_token',response.data['access_token'])
            localStorage.setItem('IsLightTheme',true)
            setTimeout(() => {
                Reset()
                setloggedIn(true)
                
            
            }, 2000);
            
            
            
            
            
        
           
            
           
        })
        
        .catch(function (error) {
            console.log(error);
            
            const notify = () => toast.error("کاربری با مشخصات وارد شده یافت نشد");
            notify()
            setloggedIn(false)
            
            
            
            
        
        })
        
        
        
        
    }
    
    
    useEffect(() => {
        console.log('useEffect ran !');
        if(loggedIn){
            history.push('/')

        }
        
        
    }, [loggedIn])
    
    
   
    
    
    return (
        
        
        
        <div className={'outer-container'}>
            
            <ToastContainer />

        
            <div className={"login-container"}>
            <div class="login-header">
                <img src={"/images/twitter-logo.png"} className={"logo"}></img>
                <h2>توییتر فارسی</h2>
                

            </div>
            
            <div className={"login-body"}>
                <input placeholder={"نام کاربری"} className={'login-input'} name={'username'} onChange={e => setUsername(e.target.value)}></input>
                <input placeholder={"رمز عبور"} type={"password"} className={'login-input'} name={'password'} onChange={e =>setPassword(e.target.value)}></input>
                
                <button type={"button"} onClick={HandleLogin}>ورود</button>
                
                
            </div>
            
        </div>
        
        
    </div>
    
    )
}

export default LoginPage;
