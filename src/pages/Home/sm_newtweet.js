import React,{useState,useRef} from 'react'
import './sm_newtweet.css'
import  { useHistory} from 'react-router-dom'
import { getAllTweets, newTweetRequest } from '../../api/api_tweet'
import { useTweetDispatch,useTweetState,setTweets } from '../../context/TweetContext'
import { toast, ToastContainer } from 'react-toastify'
export default function Sm_newtweet() {
    const [NewTweetImg,setNewTweetImg] = useState()
    const [TweetImage,setTweetImage] = useState('')
    const [TweetText,setTweetText] = useState('')
    const {retweet} = useTweetState()
    const tweetDispatch = useTweetDispatch()

    const Textarea = useRef()
    const hiddenFileInput = useRef()
    const history = useHistory()

    const tweetTextHandler = (e) =>{
        Textarea.current.style.height = Textarea.current.scrollHeight + 'px'
        setTweetText(e.target.value)

    }
    const imageIconHandler = () =>{
        hiddenFileInput.current.click()
    }
    const ImageSelectHandler = (e) =>{
        let reader = new FileReader();
        reader.onload =()=>{
            let dataURL = reader.result;
            setNewTweetImg(dataURL)
            
           

        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            setTweetImage(e.target.files[0])
        }
        

    }
    const newTweetHandler =()=>{
        if(!TweetText){
            
            return
        }
        const formData = new FormData()
        formData.append('sender_username',localStorage.getItem('username'))
        formData.append('Text',TweetText)
        if(TweetImage){
            formData.append('image',TweetImage)
        }else{
            formData.append('image',false)

        }
        if(retweet){
            formData.append('retweet',true)
            formData.append('retweet_id',retweet['retweet_id'])
            
        }else{
            formData.append('retweet',false)

        }
        newTweetRequest(formData,(isOk)=>{
            if(!isOk){
                return toast.error('توییت شما ارسال نشد !!!')

            }
            toast.success('توییت شما با موفقیت ارسال گردید')
            
            Textarea.current.value = ''
            setTweetText('')
            setNewTweetImg('')
            getAllTweets((isOk,data)=>{
                if(!isOk){
                    return toast.error('ارتباط با سرور جهت آپدیت توییت ها ناموفق بود')
                }
                setTweets(tweetDispatch,data)
                setTimeout(() => {
                    history.push('/')
                    
                }, 4000);
                

            })
            
        })

    }
    return (
        <div className='sm-newtweet-container'>
            <ToastContainer position={'bottom-right'} />
            <div className='sm-newtweet-header'>
                <button onClick={newTweetHandler} className='sm-tweet-btn'>ایجاد توییت جدید</button>
                <i className="material-icons" onClick={()=>history.goBack()}>arrow_back</i>

            </div>
            
            <div className='sm-newtweet-content'>
                <img src={localStorage.getItem('image')} className='avatar-sm-usr'></img>
                <div className='sm-newtweet-box'>
                    <textarea id={'sm-textarea'} placeholder={'توییت کنید ...'} onChange={tweetTextHandler} ref={Textarea}></textarea>
                    
                    {NewTweetImg && <div className={'sm-newtweet-image-wrapper'}>
                        <img src={NewTweetImg} className='sm-tweet-image' ></img>
                        <i className="material-icons" onClick={()=>setNewTweetImg(null)}>close</i>
                        

                    </div>}
                    
                    

                </div>
                

            </div>
            <div className='sm-newtweet-footer'>
                <img src="https://img.icons8.com/windows/22/4a90e2/laugh.png"/>
                <img onClick={imageIconHandler} src="https://img.icons8.com/ios-glyphs/22/4a90e2/image.png"/>
                
                
                <input type='file' style={{display:'none'}} ref={hiddenFileInput} onChange={ImageSelectHandler}></input>

            </div>
            
            
        </div>
    )
}
