import React,{useRef,useContext,useState,useEffect} from 'react'
import './css/modals.css'
import  {useLocation} from 'react-router-dom'
import { AuthContext } from './../../context/Auth-context';
import { ThemeContext } from './../../context/Theme-context';
import { toast } from 'react-toastify';
import { LogoIcon, TagIcon ,ImageIcon } from './../../pages/Home/icons';
import { AddHashtags, newTweetRequest, updateHashtags } from './../../api/api_tweet';
import { useTweetDispatch , setHashtags , UpdateTweets } from '../../context/TweetContext';
import Mention_Box from './Mention_Box';

export default function TweetModal({IsOpen,setIsOpen}) {
    // const history = useHistory()
    const ModalContainer = useRef()
    const tweetBtn = useRef()
    const UploadImageRef = useRef()
    const Modal_Textarea = useRef()
    const {pathname} = useLocation()
    // #############
    
    const TweetDispatch = useTweetDispatch()
    
    const {IsLightTheme,light,dark} = useContext(ThemeContext)
    
    const {image:loggedInUserImage} = useContext(AuthContext)
    const [TweetText, setTweetText] = useState('')
    const [uploadImage, SetuploadImage] = useState(null)
    // ##############
    const [DisplayMentionbox, setDisplayMentionbox] = useState(false)
    
    // ##############
    const [sendTweetImage, setsendTweetImage] = useState(null)
    
    const InitialValue = (pathname) =>{
        
        if (pathname.includes('hashtags')){
            setTweetText(prev => prev +'#'+ pathname.split('/')[2])
        }
        if (pathname.includes('username')){
            setTweetText(prev => prev +'@'+ pathname.split('/')[2])
        }


    }
    const CheckPageForUpdate = (data) =>{
        
        if (pathname.includes('hashtags')){
            if (data.hashtags.includes(pathname.split('/')[2])){
                UpdateTweets(TweetDispatch,data)
            }
        }
        if (pathname.includes('username')){
            if (data.username === data.username){
                UpdateTweets(TweetDispatch,data)
            }
        } 

        if (pathname ==='/'){
            UpdateTweets(TweetDispatch , data)
        }

    }
    
    useEffect(() => {
        if (IsOpen){
            
            InitialValue(pathname)
            
        }
    }, [IsOpen])

    const DismissModal = (e) =>{
        // console.log('Dismiss ...')
        let modal = ModalContainer.current
        if(e.target == modal) {
            setIsOpen(false)
            setDisplayMentionbox(false)
            
            if (TweetText){
                setTweetText('')
            }
            if(uploadImage){
                SetuploadImage(null)
            }
            
        }

            
           
    }
    const TweetTextHandler = (e) =>{
        setTweetText(e.target.value)
        Modal_Textarea.current.style.height = Modal_Textarea.current.scrollHeight + 'px'
    }
    const closeModal = () =>{
        
        setIsOpen(false)
        setDisplayMentionbox(false)
        
        if (TweetText){
            setTweetText('')
        }
        if(uploadImage){
            SetuploadImage(null)
        }
        

    }
    const NewTweetHandler = () =>{
        if (!TweetText)return
        tweetBtn.current.classList.add('new-tweet-loading')
        
        const formData = new FormData()
        formData.append('access_token',localStorage.getItem('access_token'))
        formData.append('Text',TweetText)
        if(sendTweetImage){
            formData.append('image',sendTweetImage)
        }else{
            formData.append('image',false)

        }
        formData.append('retweet',false)
        newTweetRequest(formData,(isOk,data)=>{
            if (!isOk){
                toast.error('توییت شما ارسال نشد')
                tweetBtn.current.classList.remove('new-tweet-loading')
                return
            }
            
            tweetBtn.current.classList.remove('new-tweet-loading')
            toast.success("توییت شما با موفقیت ارسال گردید")
            CheckPageForUpdate(data)
            
            
            if (TweetText.includes('#')){
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
            setTweetText('')
            SetuploadImage(null)
            setsendTweetImage(null)
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
    
    
    const MentionHandler = () =>{
        
        setDisplayMentionbox(prev => !prev)
        
    }
    
    
    const closeBtnHandler = () =>{
        SetuploadImage(null)
    }
    return (
        <div ref = {ModalContainer}
            onClick = {DismissModal} 
            className="modal-container" 
            id="modal-container" 
            style = {{display : IsOpen ? 'block':'none'}}
         >
                
            <div className="modal" id="modal" style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
                <div className='tweet-modal-header' style={{backgroundColor:IsLightTheme?'#319FD9':'#191919'}}>
                    
                    {LogoIcon}
                    
                </div>
                
                <div className="modal-body">
                    <img src={loggedInUserImage} alt="user-image" className="user-image-modal" />
                    <textarea ref={Modal_Textarea} value={TweetText} onChange={TweetTextHandler } className="tweet-textarea" placeholder="توییت کنید ..." style={{color:IsLightTheme?light.color:dark.color}}></textarea>
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
                            <span onClick={MentionHandler}>{TagIcon}</span>
                            <span onClick={UploadImage}>{ImageIcon}</span>
                            <input ref={UploadImageRef} type='file' style={{display:'none'}} onChange = {UploadImageHandler} />
                            
                </div>
                <Mention_Box IsModalOpen={IsOpen} 
                            DisplayMentionbox = {DisplayMentionbox} 
                            setTweetText={setTweetText} 
                />
               
                <div className="modal-footer">
                    <button ref={tweetBtn} className="add-tweet" onClick={NewTweetHandler} >توییت جدید</button>
                    <button className="cancle-tweet" id="cancle-tweet" onClick={closeModal}>انصراف</button>
                    
                </div>

            </div>
        </div>
    )
}
