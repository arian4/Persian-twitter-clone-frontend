import React, { useState , useRef} from 'react'
import './register.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import  { useHistory } from 'react-router-dom'
function Register() {
    const ImageInput = useRef()
    const [fullname,setfullname] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confpassword,setconfpassword] = useState('')
    const [image,setimage] = useState('')
   
    const history = useHistory()
    const TestFunc = () =>{
        const formData = new FormData()
        if(!fullname){
            const notify = () => toast.error('نام و نام خانوادگی خود را وارد نمایید');
            notify()
            return false;

        }
        if(!username){
            const notify = () => toast.error('نام کاربری خود را وارد نمایید');
            notify()
            return false;

        }
        if(!password || !confpassword){
            const notify = () => toast.error('رمز عبور خود را وارد نمایید');
            notify()
            return false;

        }
        if(password !== confpassword){
            
            const notify = () => toast.error("رمز های عبور همخوانی ندارند");
            notify()
            return false;
        };
        // if(!image){
        //     formData.append('image',null)
            
        // }
        if(image){
            formData.append('image',image)

        }
        
        formData.append('Fullname',fullname)
        formData.append('username',username)
        formData.append('password',password)
        
        
        axios.post('http://127.0.0.1:8000/twitter/api/register/', formData
            
          )
          .then(function (response) {
            console.log(response);
            // setisRegistered(true)
            const notify = () => toast.success("ثبت نام شما با موفقیت انجام گردید");
            notify()
            setTimeout(function(){
                history.push('/login')

            },6000)
          })
          .catch(function (error) {
            if (error.response) {
                const {username:username_error} = error.response.data
                toast.error(username_error[0])
                // console.log(error.response);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            }
            
            
          });
        
        
    }
    const uploadImage = () =>{
        ImageInput.current.click()

    }

    const handlechangeImg =(e) =>{
        console.log(e.target.files[0]);
        
        
        let reader = new FileReader();
        reader.onload =()=>{
            let dataURL = reader.result;
            // setaddtweetImg(dataURL)
            document.getElementById('upload-img').style.backgroundImage = `url(${dataURL})`
            
           

        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        setimage(e.target.files[0])
    }
    
    
    return (
        <div className={'outer-container'}>
            
            {/* {isRegistered && <Redirect to='/login' />} */}
            <div className={"register-container"}>
                <header>
                    <img src={"/images/twitter-logo.png"} className={"logo"}></img>
                    <h2>به <span style={{"color": "#00b3e9;"}}>توییتر فارسی</span> خوش آمدید</h2>
                </header>
                <main>
                    <form id="register-form" action="" method="POST">
                        <input type={"text"} placeholder={"نام و نام خانوادگی"} className={'register-input'} onChange={e =>setfullname(e.target.value)}></input>
                        <input type={"text"} placeholder={"نام کاربری"} className={'register-input'} onChange = {e => setUsername(e.target.value)}></input>
                        <input type={"password"} placeholder={"رمز عبور"} className={'register-input'} onChange={e => setPassword(e.target.value)}></input>
                        <input type={"password"} placeholder={"تکرار رمز عبور"} className={'register-input'} onChange={e =>setconfpassword(e.target.value)}></input>
                        
                        <div className={'image-wrapper'}>
                            <p>بارگذاری عکس پروفایل:</p>
                            <div className='image-container' id={'upload-img'}>
                                <input type={'file'} style={{display:'none'}} ref={ImageInput} onChange = {handlechangeImg} />
                                <i class="material-icons" onClick={uploadImage}>add</i>
                            </div>

                        </div>
                    
                        <button type="button" onClick={TestFunc}>ثبت نام</button>
                    </form>
                </main>

            </div>
        </div>
    )
}

export default Register;
