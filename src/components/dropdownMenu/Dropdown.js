import React,{useState,useContext,useEffect} from 'react'
import  { Link, useHistory} from 'react-router-dom'
import './dropdown.css'
import axios from 'axios';
import { ThemeContext } from '../../context/Theme-context';
import { AuthContext } from '../../context/Auth-context';

function Dropdown({current_user_username, current_user_Fullname , current_user_image}) {
    
    const {Ispending} = useContext(AuthContext)
    
    // console.log(Theme);
    const {IsLightTheme,Reset} = useContext(ThemeContext)
    const [profileImg,setprofileImg] = useState(Ispending?'/images/person.png':current_user_image)
    const history = useHistory()
    
    
    
    const showDropdown = () =>{
        let dropdown = document.getElementsByClassName(IsLightTheme?'dropdown-content':'dropdown-content-dark')[0];
        dropdown.classList.toggle('show');
        
    }
    const LogOut = () =>{
        localStorage.clear()
        Reset()
        console.log('You Logged out !');
        history.push('/login')

    }
    const changeprofileImg = (e) =>{
        console.log('uploaded image !');
        
        
        
        let username  = localStorage.getItem('username')
        const formData = new FormData()
        formData.append('image',e.target.files[0])
        axios.put('http://127.0.0.1:8000/twitter/api/username/'+username, 
            formData
          )
          .then(function (response) {
            console.log(response.data);
            let reader = new FileReader();
            reader.onload =()=>{
                var dataURL = reader.result;
                setprofileImg(dataURL)
                localStorage.setItem('image',dataURL)
                setTimeout(() => {
                    window.location.reload()
                    
                }, 3000);
               

            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0]);
            }
            
          })
          .catch(function (error) {
            console.log(error);
        });

        
        
        
        
        

    }
    
    
    return (
        <>
        <img src={Ispending?'/images/person.png':current_user_image} alt={'avatar-usr'} className={"d-avatar-usr"} onClick={showDropdown}></img>
        <div id={"myDropdown"} >
                    
                    
                <div className={IsLightTheme?"dropdown-content":'dropdown-content-dark'}>
                    {!Ispending && <p >{current_user_Fullname}</p>}
                    
                    <hr></hr>


                    <p > 
                        <span>
                            <label >
                                تغییر عکس پروفایل 
                                <input type={"file"} style={{"display": "none"}} onChange={changeprofileImg}/>  
                            </label>
                            
                            
                        </span>
                        
                    </p>
                    
                    
                    
                    <p>< Link style={{'color':IsLightTheme?'#111':'#adbac7'}} to={`/username/${current_user_username}`}>توییت های شما</ Link></p>
                    <p style={{color:'red'}} onClick={LogOut}>خروج</p>
                </div> 
                
            </div>

        </>
        
    )
}

export default Dropdown
