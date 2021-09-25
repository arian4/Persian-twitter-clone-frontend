import React, { useState,useRef,useContext,useEffect} from 'react'
import classnames from 'classnames'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTweetDispatch, useTweetState,setnewTweets,setRetweet,setTweets } from '../../conext/TweetContext';
import { ThemeContext } from '../../conext/Theme-context';
import './homecss/newtweet.css'
import { AuthContext } from '../../conext/Auth-context';

function Newtweet({updateTweets,AddHashtags}) {
    const token  = localStorage.getItem('access_token')
    const {image,Ispending,FetchUserData} = useContext(AuthContext)
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const [addtweetImg,setaddtweetImg] = useState('')
    const [sendtwtImg,setsendtwtImg] = useState('')
    
    
    
    const UTextarea = useRef()
    const tweetImg = useRef()
    
    
    const {newtweet,retweet} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    // console.log('retweet',retweet);
    // const getprofileImg = ()=>{
    //     FetchUserData(token)
    //     return userData.image

    // }
    useEffect(() => {
        FetchUserData(token)
    }, [])
    const newtweetclick = () =>{
        
        
        
        if(!newtweet){
            
            return false;
        }
        const formData = new FormData()
        formData.append('sender_username',localStorage.getItem('username'))
        formData.append('Text',newtweet)
        if(sendtwtImg){
            formData.append('image',sendtwtImg)
        }else{
            formData.append('image',false)

        }
        
        if(retweet){
            formData.append('retweet',true)
            formData.append('retweet_id',retweet['retweet_id'])
            formData.append('user',localStorage.getItem('username'))
            
        }else{
            formData.append('retweet',false)

        }

        axios.post('http://127.0.0.1:8000/twitter/api/tweets/', formData
            
            
          )
          .then(function (response) {
            console.log(response.data);
            
            const tweetId = response.data['id']
            
            toast.success("توییت شما با موفقیت ارسال گردید");
            updateTweets()
            // setTweets(TweetDispatch,updated_tweets)
            
            
            setnewTweets(TweetDispatch,'')
            UTextarea.current.value = ''
            setaddtweetImg('')
            setsendtwtImg(false)
            setRetweet(TweetDispatch,'')
            return tweetId 
            
            
            
            
            })
            .then(function (tweetId) {
                
                
                AddHashtags(tweetId)
                
            })
            
                
          .catch(function (error) {
            console.log(error);
            toast.error('توییت شما ارسال نشد !!!')
            
          });
        
          
        
        
          
    }
    
    const handletweetImg = () =>{
        
        tweetImg.current.click();

    }
    const handlechangeImg =(e) =>{
        console.log(e.target.files[0]);
        
        
        let reader = new FileReader();
        reader.onload =()=>{
            let dataURL = reader.result;
            setaddtweetImg(dataURL)
            
           

        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        setsendtwtImg(e.target.files[0])
    }
    
    
    
    
    
    return (
        <div className={"twt-box"}>
            
                <ToastContainer />
                
                
                <div className={"twt-box-header"}>
                    <img src={Ispending?'/images/person.png':image} alt={'avatar-usr'} className={"avatar-usr"}></img>
                    <div className={'twt-box-content'}>
                        <textarea className={'twt-box-header-textarea'} style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor,color:IsLightTheme?light.color:dark.color}} placeholder={'توییت کن ...'} rows={'7'} id={'textarea'} value={newtweet} onChange={e=>setnewTweets(TweetDispatch,e.target.value)} ref={UTextarea}></textarea>
                        {addtweetImg && <br></br>}
                        {retweet && <div className={'retweet-section'} >
                            <div style={{display:'flex',alignItems:'center'}}>
                            <img src={retweet['image']} className={'retweet-usr'}></img>
                            <span style={{fontSize:'13px',color:'gray'}}>{retweet['username']}@</span>

                            </div>
                            
                            <br></br>
                            <p className={'retweet-body'} style={{color:IsLightTheme?light.color:dark.color}}>
                                {retweet['text']}

                            </p>
                            
                        </div>}
                        
                        {addtweetImg && <img className={'addtweetImg'} contentEditable={false} src={addtweetImg} alt={'uploaded-img'} ></img>}
                         
                    </div>
                    
                </div>
                
                
                <div className={"twt-box-footer"}>
                    <input ref={tweetImg} type={'file'} style={{display:'none'}} onChange={handlechangeImg}></input>
                    <i className={classnames("fa","fa-image")} onClick={handletweetImg}></i>
                    <button id={"add-twt"} onClick={newtweetclick} style={{boxShadow:IsLightTheme?'2px 2px 3px #999':'0 2px 10px rgba(0, 0, 0, .4)'}}>ایجاد توییت جدید</button>
                    {/* <button onClick={test}>test me!</button> */}
                </div>
               

            </div>
    )
}

export default Newtweet;
