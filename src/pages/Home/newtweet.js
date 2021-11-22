import React, { useState,useRef,useContext,useEffect} from 'react'
import './homecss/newtweet.css'
import classnames from 'classnames'
import {  toast } from 'react-toastify';
import { useTweetDispatch, useTweetState,setnewTweets,setRetweet,setTweets,setHashtags } from '../../context/TweetContext';
import { ThemeContext } from '../../context/Theme-context';
import { AuthContext } from '../../context/Auth-context';
import { newTweetRequest , getAllTweets, AddHashtags, updateHashtags, getHomeFeed } from '../../api/api_tweet';


function Newtweet() {
    
    const {image,Ispending} = useContext(AuthContext)
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const [addtweetImg,setaddtweetImg] = useState('')
    const [sendtwtImg,setsendtwtImg] = useState('')
    useEffect(() => {
        console.log('NewTweet components ran ...!');
        return () => {
            console.log('clean up ran ...!')
        }
    }, [])
    
    
    const UTextarea = useRef()
    const tweetImg = useRef()
    
    
    const {newtweet,retweet} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    
    
    const newtweetclick = () =>{
        
        
        
        if(!newtweet){
            
            return false;
        }
        const formData = new FormData()
        formData.append('access_token',localStorage.getItem('access_token'))
        formData.append('Text',newtweet)
        if(sendtwtImg){
            formData.append('image',sendtwtImg)
        }else{
            formData.append('image',false)

        }
        
        if(retweet){
            formData.append('retweet',true)
            formData.append('retweet_id',retweet['retweet_id'])
            formData.append('user',localStorage.getItem('access_token'))
            
        }else{
            formData.append('retweet',false)

        }
        
        newTweetRequest(formData,(isOk,data)=>{
            if(!isOk){
                toast.error('توییت شما ارسال نگردید !!!')
                return false
            }
            toast.success("توییت شما با موفقیت ارسال گردید");
            
            getHomeFeed(localStorage.getItem('access_token'),(isOk,data)=>{
                if(!isOk){
                    toast.warn('مشکلی در بروزرسانی توییت ها پیش آمده !')
                    return
                }
                setTweets(TweetDispatch,data)
                // toast.success('توییت ها با موفقیت بروزرسانی شدند')
                setnewTweets(TweetDispatch,'')
                UTextarea.current.value = ''
                setaddtweetImg('')
                setsendtwtImg(false)
                setRetweet(TweetDispatch,'')
            })
            if(newtweet.includes('#')){
                AddHashtags(data.id,(isOk)=>{
                    if(!isOk){
                        toast.warn('مشکلی در اضافه شدن هشتگ ها به دیتابیس پیش آمده !!!')
                        return
                    }

                    updateHashtags((isOk,data)=>{
                        if(!isOk){
                            toast.warn('مشکلی در بروزرسانی هشتگ ها پیش آمده')
                            return
                        }
                        setHashtags(TweetDispatch,data)
                    })
                    
                })
            }
            

            
        })

        
        
          
        
        
          
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

    const AddtweetImgClose = () =>{
        setaddtweetImg(null)
        setsendtwtImg(false)

    }
    
    
    
    
    
    return (
        <div className={"twt-box"}>
            
                
                
                
                <div className={"twt-box-header"}>
                    <img src={Ispending?'/images/person.png':image} alt={'avatar-usr'} className={"avatar-usr"}></img>
                    <div className={'twt-box-content'}>
                        <textarea className={'twt-box-header-textarea'} style={{backgroundColor:IsLightTheme?'#f2f2f2':'#444',color:IsLightTheme?light.color:dark.color}} placeholder={'توییت کن ...'} rows={'7'} id={'textarea'} value={newtweet} onChange={e=>setnewTweets(TweetDispatch,e.target.value)} ref={UTextarea}></textarea>
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
                        
                        {addtweetImg && 
                        <div style={{position:'relative'}}>
                            <img className={'addtweetImg'} contentEditable={false} src={addtweetImg} alt={'uploaded-img'} />
                            <svg onClick={AddtweetImgClose} xmlns="http://www.w3.org/2000/svg" className={'addtweetImg-close'}  viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        
                        }
                         
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
