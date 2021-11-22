import React, { useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './login.css'
import { toast } from 'react-toastify';
import  { useHistory } from 'react-router-dom'
import { ThemeContext } from '../../../context/Theme-context';
import { HashLoader } from 'react-spinners';


function LoginPage(props) {
    
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    // const[loggedIn,setloggedIn] = useState(false)
    const {Reset} = useContext(ThemeContext)
    const override ={
        margin: '4rem auto',

        
    }
    const [HashLoaderHandler, SetHashLoaderHandler] = useState(false)
    const history = useHistory()
    
    // const {loggedInUser} = useTweetState()
    
    
    const HandleLogin = () =>{
        SetHashLoaderHandler(true)
        
        
        
        
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
                // setloggedIn(true)
                SetHashLoaderHandler(false)
                history.push('/')
                
            
            }, 2500);
            
            
            
            
            
        
           
            
           
        })
        
        .catch(function (error) {
            console.log(error);
            
            const notify = () => toast.error("کاربری با مشخصات وارد شده یافت نشد");
            notify()
            // setloggedIn(false)
            SetHashLoaderHandler(false)
            
            
            
            
        
        })
        
        
        
        
    }
    
    
    // useEffect(() => {
    //     console.log('useEffect ran !');
    //     if(loggedIn){
    //         history.push('/')

    //     }
        
        
    // }, [loggedIn])
    
    
   
    
    
    return (
        
        
        
        <div className={'outer-container'}>
            
            

        
            <div className={"login-container"}>
            <div class="login-header">
                <img src={"/images/twitter-logo.png"} className={"logo"}></img>
                <h2>توییتر فارسی</h2>
                

            </div>
            
            <div className={"login-body"}>
                <input placeholder={"نام کاربری"} className={'login-input'} name={'username'} onChange={e => setUsername(e.target.value)}></input>
                <input placeholder={"رمز عبور"} type={"password"} className={'login-input'} name={'password'} onChange={e =>setPassword(e.target.value)}></input>
                
                <button type={"button"} onClick={HandleLogin}>ورود</button>
                {HashLoaderHandler && <HashLoader color='#319FD9' css={override} />}
                
                
                
            </div>
            
        </div>
        
        
    </div>
    
    )
}

export default LoginPage;
