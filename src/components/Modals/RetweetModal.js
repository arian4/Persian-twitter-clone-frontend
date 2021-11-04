import React,{useRef,useContext,useState} from 'react'
import './css/modals.css'
import { useTweetState , useTweetDispatch , setRetweet , setTweets , setHashtags } from '../../context/TweetContext'
import { AuthContext } from './../../context/Auth-context';
import { toast } from 'react-toastify';
import { AddHashtags, newTweetRequest, updateHashtags } from '../../api/api_tweet';
import { getAllTweets } from './../../api/api_tweet';

export default function RetweetModal({IsOpen,setIsOpen}) {
    const ModalContainer = useRef()
    const tweetBtn = useRef()
    
    const {retweet} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    const {image:loggedInUserImage} = useContext(AuthContext)

    const [TweetText, setTweetText] = useState('')
    
    const DismissModal = (e) =>{
        // console.log('Dismiss ...')
        let modal = ModalContainer.current
        if(e.target == modal) {
            setIsOpen(false)
            setRetweet(TweetDispatch ,'')
        }
            
           
    }
    
    const closeModal = () =>{
        setIsOpen(false)
        setRetweet(TweetDispatch ,'')

    }
    
    const TweetClickHandler = () => {
        console.log('Tweet Clicked !')
        // Utility Functions
        
        if(!TweetText) return 
        
        tweetBtn.current.classList.add('new-tweet-loading')
        
        const formData = new FormData()
        formData.append('access_token',localStorage.getItem('access_token'))
        formData.append('Text',TweetText)
        formData.append('image',false)
        formData.append('retweet',true)
        formData.append('retweet_id',retweet['retweet_id'])
        newTweetRequest(formData,(isOk,data)=>{
            if(!isOk){
                toast.error('توییت شما ارسال نشد !!!')
                tweetBtn.current.classList.remove('new-tweet-loading')
                return
            }
            
            
            getAllTweets((isOk,data)=>{
                if(!isOk){
                    toast.warn('مشکلی در بروزرسانی توییت ها پیش آمده !')
                    return false
                }
                setTweets(TweetDispatch,data)
                
                tweetBtn.current.classList.remove('new-tweet-loading')
                toast.success("توییت شما با موفقیت ارسال گردید")
                
                setTweetText('')
                setRetweet(TweetDispatch ,'')
                setIsOpen(false)
                
            })
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
            
        })
        
    }
        
    
    
    return (
        <>
            
            <div ref = {ModalContainer} onClick = {DismissModal} className="modal-container" id="modal-container" style = {{display : IsOpen ? 'block':'none'}}>
                
                <div className="modal" id="modal">
                    <div className="target-tweet">
                        <div className = {'modal-header'}>
                            
                            <img src={retweet.image} alt="user-retweet" className="user-image-modal" />
                            <p className={'m-username'}>@{retweet.username}</p>

                        </div>
                        
                        <div className="target-content">
                            {retweet.text}
                        </div>

                    </div>
                    <div className="modal-body">
                        <img src={loggedInUserImage} alt="user-image" className="user-image-modal" />
                        <textarea value = {TweetText} className="tweet-textarea" placeholder="توییت کنید ..." onChange ={(e) => setTweetText(e.target.value)}></textarea>
                    </div>
                    <div className="modal-footer">
                        <button ref={tweetBtn} className="add-tweet" onClick = {TweetClickHandler}>توییت جدید</button>
                        <button className="cancle-tweet" id="cancle-tweet" onClick={closeModal}>انصراف</button>
                    </div>

                </div>
            </div>
        </>
        
    )
}
