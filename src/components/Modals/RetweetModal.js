import React,{useRef,useContext,useState} from 'react'
import './css/modals.css'
import { useTweetState , useTweetDispatch , setRetweet , setTweets , setHashtags } from '../../context/TweetContext'
import { AuthContext } from './../../context/Auth-context';
import { toast } from 'react-toastify';
import { AddHashtags, newTweetRequest, updateHashtags } from '../../api/api_tweet';
import { ThemeContext } from './../../context/Theme-context';
import { ImageIcon, TagIcon } from '../../pages/Home/icons';
import Mention_Box from './Mention_Box';

export default function RetweetModal({IsOpen,setIsOpen}) {
    const ModalContainer = useRef()
    const tweetBtn = useRef()
    const UploadImageRef = useRef()
    const Modal_Textarea = useRef()
    const {IsLightTheme,light,dark} = useContext(ThemeContext)
    const {retweet} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    const {image:loggedInUserImage} = useContext(AuthContext)
    const [DisplayMentionbox, setDisplayMentionbox] = useState(false)
    const [TweetText, setTweetText] = useState('')
    const [uploadImage, SetuploadImage] = useState(null)
    const [sendTweetImage, setsendTweetImage] = useState(null)
    
    const DismissModal = (e) =>{
        // console.log('Dismiss ...')
        let modal = ModalContainer.current
        if(e.target == modal) {
            setIsOpen(false)
            setDisplayMentionbox(false)
            setRetweet(TweetDispatch ,'')
            if (TweetText){
                setTweetText('')
            }
            if (uploadImage){
                SetuploadImage(null)
            }
        }
            
           
    }
    
    const closeModal = () =>{
        setIsOpen(false)
        setDisplayMentionbox(false)
        if (TweetText){
            setTweetText('')
        }
        if (uploadImage){
            SetuploadImage(null)
        }
        setRetweet(TweetDispatch ,'')

    }
    const TweetTextHandler = (e) =>{
        setTweetText(e.target.value)
        Modal_Textarea.current.style.height = Modal_Textarea.current.scrollHeight + 'px'
    }
    
    const TweetClickHandler = () => {
        console.log('Tweet Clicked !')
        // Utility Functions
        
        if(!TweetText) return 
        
        tweetBtn.current.classList.add('new-tweet-loading')
        
        const formData = new FormData()
        formData.append('access_token',localStorage.getItem('access_token'))

        formData.append('Text',TweetText)
        formData.append('image',sendTweetImage?sendTweetImage:false)
        formData.append('retweet',true)
        formData.append('retweet_id',retweet['retweet_id'])
        newTweetRequest(formData,(isOk,data)=>{
            if(!isOk){
                toast.error('توییت شما ارسال نشد !!!')
                tweetBtn.current.classList.remove('new-tweet-loading')
                return
            }
            tweetBtn.current.classList.remove('new-tweet-loading')
            
            
            
            
            if(TweetText.includes('#')){
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
            toast.success("توییت شما با موفقیت ارسال گردید")
            setTweetText('')
            SetuploadImage(null)
            setsendTweetImage(null)
            setRetweet(TweetDispatch ,'')
            setIsOpen(false)
            
        })
        
    }
    const UploadImage = () => UploadImageRef.current.click()
    
    const UploadImageHandler = (e) =>{
        let reader = new FileReader();
        reader.onload =()=>{
            let dataURL = reader.result;
            SetuploadImage(dataURL)
            
           

        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            setsendTweetImage(e.target.files[0])
        }
    }
    const closeBtnHandler = () =>{
        SetuploadImage(null)
    }

    const MentionHandler = () =>{
        
        setDisplayMentionbox(prev => !prev)
        
    }
        
    
    
    return (
        <>
            
            <div ref = {ModalContainer} onClick = {DismissModal} className="modal-container" id="modal-container" style = {{display : IsOpen ? 'block':'none'}}>
                
                <div className="modal" id="modal" style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
                    <div className="target-tweet">
                        <div className = {'modal-header'}>
                            
                            <img src={retweet.image} alt="user-retweet" className="user-image-modal" />
                            <p className={'m-username'} style={{color:IsLightTheme?'rgb(128, 128, 128)':dark.color}}>@{retweet.username}</p>

                        </div>
                        
                        <div className="target-content" style={{color:IsLightTheme?light.color:dark.color}}>
                            {retweet.text}
                        </div>
                        <a href={retweet.tweetImage} target={'_blank'} style={{fontSize:'12px',marginTop:'6px'}}>{retweet.tweetImage}</a>

                    </div>
                    <div className="modal-body">
                        <img src={loggedInUserImage} alt="user-image" className="user-image-modal" />
                        <textarea   ref={Modal_Textarea} 
                                    style={{color:IsLightTheme?light.color:dark.color}} 
                                    value = {TweetText} className="tweet-textarea" 
                                    placeholder="توییت کنید ..." 
                                    onChange ={TweetTextHandler}>
                        
                        </textarea>
                        
                        
                    </div>
                    {uploadImage &&
                            <div style={{margin:'0.5rem 1rem',position:'relative'}}>
                                <svg onClick={closeBtnHandler} xmlns="http://www.w3.org/2000/svg" className='m-image-closeBtn'  viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <img src={uploadImage} alt='modal-image-upload' className='modal-image-upload'  />
                            </div>
                    }
                    <div className={IsLightTheme?'upload-medias':'upload-medias-dark'}>
                            <span onClick = {MentionHandler}>{TagIcon}</span>
                            <span onClick = {UploadImage}>{ImageIcon}</span>
                            <input ref={UploadImageRef} type='file' style={{display:'none'}} onChange = {UploadImageHandler} />
                            
                    </div>
                    <Mention_Box 
                        IsModalOpen={IsOpen}
                        DisplayMentionbox = {DisplayMentionbox}
                        setTweetText={setTweetText}
                     />
                    <div className="modal-footer">
                        <button ref={tweetBtn} className="add-tweet" onClick = {TweetClickHandler}>توییت جدید</button>
                        <button className="cancle-tweet" id="cancle-tweet" onClick={closeModal}>انصراف</button>
                    </div>

                </div>
            </div>
        </>
        
    )
}
