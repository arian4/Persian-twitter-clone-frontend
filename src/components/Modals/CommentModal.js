import React,{useRef,useContext,useState} from 'react'
import './css/modals.css'
import { AuthContext } from './../../context/Auth-context';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from './../../context/Theme-context';
import { toast } from 'react-toastify';
import { NewCommentRequest } from '../../api/api_tweet';

export default function CommentModal({IsOpen,setIsOpen,ModalData,setModalData,SetnumComments}) {
    const history = useHistory()
    const ModalContainer = useRef()
    const CommentBtn = useRef()
    const token = localStorage.getItem('access_token')
    const {IsLightTheme,light,dark} = useContext(ThemeContext)
    
    const {image:loggedInUserImage} = useContext(AuthContext)

    // const [TweetText, setTweetText] = useState('')
    const [TweetText, setTweetText] = useState('')
    const DismissModal = (e) =>{
        // console.log('Dismiss ...')
        let modal = ModalContainer.current
        if(e.target == modal) {
            setIsOpen(false)
            setModalData({})
            if (TweetText){
                setTweetText('')
            }
            // setRetweet(TweetDispatch ,'')
        }

            
           
    }
    
    const closeModal = () =>{
        console.log('modal closed !!!')
        setIsOpen(false)
        setModalData({})
        if (TweetText){
            setTweetText('')
        }
        // setRetweet(TweetDispatch ,'')

    }

    const displayTargetUser = () =>{
        
        history.push(`/username/${ModalData.username}`)
        setIsOpen(false)
        setModalData({})
    }
    const NewCommentHandler = () => {
        
        if (!TweetText){
            return
        }
        CommentBtn.current.classList.add('new-tweet-loading')
        const formData = new FormData()
        formData.append('tweetId',ModalData.tweetId)
        formData.append('text',TweetText)
        NewCommentRequest(token,formData,(isOk)=>{
            if (!isOk){
                toast.error('دیدگاه شما ارسال نشد')
                CommentBtn.current.classList.remove('new-tweet-loading')
                return
            }
            toast.success('دیدگاه شما با موفقیت ارسال گردید')
            SetnumComments(prev => prev + 1)
            setTweetText('')
            setIsOpen(false)
            setModalData({})
            CommentBtn.current.classList.remove('new-tweet-loading')
        })
    }
    
    return (
        <div ref = {ModalContainer}
            onClick = {DismissModal} 
            className="modal-container" 
            id="modal-container" 
            style = {{display : IsOpen ? 'block':'none'}}
         >
                
            <div className="modal" id="modal" style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
                <div className="target-tweet">
                    <div className = {'modal-header'}>
                        
                        <img src={ModalData.image} alt="user-retweet" className="user-image-modal" />
                        <p className={'m-fullname'} style={{color:IsLightTheme?light.color:dark.color}}>{ModalData.Fullname}</p>
                        <p className={'m-username'} style={{color:IsLightTheme?light.color:dark.color}}>@{ModalData.username}</p>

                    </div>
                    
                    <div className="target-content" style={{color:IsLightTheme?light.color:dark.color}}>
                        {ModalData.text}
                    </div>

                </div>
                <p style ={{marginRight:'3rem',fontSize:'11px',color:IsLightTheme?light.color:dark.color}}>پاسخ دادن به :  
                    <span style={{color:'#52B1EA',marginRight:'4px',cursor:'pointer'}} onClick ={displayTargetUser}>@{ModalData.username}</span>
                </p>
                <div className="modal-body">
                    <img src={loggedInUserImage} alt="user-image" className="user-image-modal" />
                    <textarea value={TweetText} onChange={e => setTweetText(e.target.value)} className="tweet-textarea" placeholder="توییت کنید ..." style={{color:IsLightTheme?light.color:dark.color}}></textarea>
                </div>
                <div className="modal-footer">
                    <button ref={CommentBtn} className="add-tweet" onClick={NewCommentHandler}>ثبت دیدگاه</button>
                    <button className="cancle-tweet" id="cancle-tweet" onClick={closeModal}>انصراف</button>
                </div>

            </div>
        </div>
        
    )
}
