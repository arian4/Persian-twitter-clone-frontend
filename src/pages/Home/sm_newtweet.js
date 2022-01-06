import React,{useState,useRef,useContext} from 'react'
import './sm_newtweet.css'
import  { useHistory} from 'react-router-dom'
import { getAllTweets, newTweetRequest } from '../../api/api_tweet'
import { useTweetDispatch,useTweetState,setTweets } from '../../context/TweetContext'
import { toast } from 'react-toastify'
import { AuthContext } from './../../context/Auth-context';
import { BackIcon, ImageIcon, TagIcon } from './icons';
import { ThemeContext } from './../../context/Theme-context';
import UploadMedias from '../../utilities/UploadMedias'
export default function Sm_newtweet() {
    const {IsLightTheme} = useContext(ThemeContext)
    const {image:userImage} = useContext(AuthContext)
    const [NewTweetImg,setNewTweetImg] = useState()
    const [TweetImage,setTweetImage] = useState('')
    const [TweetText,setTweetText] = useState('')
    const {retweet} = useTweetState()
    const tweetDispatch = useTweetDispatch()

    const Textarea = useRef()
    const history = useHistory()

    const tweetTextHandler = (e) =>{
        Textarea.current.style.height = Textarea.current.scrollHeight + 'px'
        setTweetText(e.target.value)

    }
    
    
    const newTweetHandler =()=>{
        if(!TweetText){
            
            return
        }
        const formData = new FormData()
        formData.append('access_token',localStorage.getItem('access_token'))
        formData.append('Text',TweetText)
        if(TweetImage){
            formData.append('image',TweetImage)
        }else{
            formData.append('image',false)

        }
        if (retweet){
            formData.append('retweet',true)
            formData.append('retweet_id',retweet['retweet_id'])
            
        }else{
            formData.append('retweet',false)

        }
        newTweetRequest(formData,(isOk)=>{
            if(!isOk){
                return toast.error('توییت شما ارسال نشد !!!',{
                    position: toast.POSITION.BOTTOM_LEFT
                })

            }
            toast.success('توییت شما با موفقیت ارسال گردید',{
                position: toast.POSITION.BOTTOM_LEFT
            })
            
            Textarea.current.value = ''
            setTweetText('')
            setNewTweetImg('')
            getAllTweets((isOk,data)=>{
                if(!isOk){
                    return toast.error('ارتباط با سرور جهت آپدیت توییت ها ناموفق بود',{
                        position: toast.POSITION.BOTTOM_LEFT
                    })
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
            {/* <ToastContainer position={'bottom-right'} /> */}
            <div className='sm-newtweet-header'>
                <button onClick={newTweetHandler} className='sm-tweet-btn'>ایجاد توییت جدید</button>
                <i style={{color:IsLightTheme?'#333':'#ccc'}} onClick={()=>history.goBack()}>{BackIcon}</i>

            </div>
            
            <div className='sm-newtweet-content'>
                <img src={userImage} className='avatar-sm-usr'></img>
                <div className='sm-newtweet-box'>
                    <textarea style={{color:IsLightTheme?'#333':'#ccc'}} id={'sm-textarea'} placeholder={'توییت کنید ...'} onChange={tweetTextHandler} ref={Textarea}></textarea>
                    
                    {NewTweetImg && <div className={'sm-newtweet-image-wrapper'}>
                        <img src={NewTweetImg} className='sm-tweet-image' ></img>
                        <i className="material-icons" onClick={()=>{
                            setNewTweetImg(null)
                            setTweetImage(null)
                        }
                        }>close
                        </i>
                        

                    </div>}
                    
                    

                </div>
                

            </div>
            <div className='sm-newtweet-footer'>
                <span>{TagIcon}</span>
                <UploadMedias SvgIcon={ImageIcon} SetImageState={setNewTweetImg} setImageFile={setTweetImage} />
                
                

            </div>
            
            
        </div>
    )
}
