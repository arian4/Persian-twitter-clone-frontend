import React,{useEffect,useState,useRef,useContext} from 'react'
import Tweet from '../Home/tweet'
import '../Home/home.css'
import './tweetInfo.css'
import Header from '../Home/header';
import { ThemeContext } from '../../context/Theme-context';
import { AuthContext } from './../../context/Auth-context';
import { getAllComments , NewCommentRequest , getTweetById } from './../../api/api_tweet';
import { NewtweetIcon } from './../Home/icons';




export default function TweetInfo(props) {
    
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    
    const {username} = useContext(AuthContext)
    
    const tweetId  = parseInt(props.match.params['id'])
    const commentPart = useRef()
    
    const [tweet,settweet] = useState([])
    const[commentText,setcommentText] = useState('')
    const[Issent,setIssent] = useState(false)
    const [comments , setcomments] = useState([])
    const [isPending,setisPending] = useState(true)
    
    
    const handleComment = ()=>{
        
        if(!commentText){
            return false
        }
        const formData = new FormData()
        formData.append('tweetId',tweetId)
        formData.append('username',username)
        formData.append('text',commentText)
        NewCommentRequest(formData,(isOk)=>{
            if(!isOk){
                alert('دیدگاه شما ارسال نگردید !!!')
                return
            }
            setIssent(true)
            commentPart.current.value = ''
            setTimeout(() => {
                setIssent(false)
                
            }, 3000)
            getAllComments((isOk,data)=>{
                if(!isOk){
                    alert('ناموفق در گرفتن کامنت ها !!!')
                }
                const tweet_comments = data.filter(item => item.tweet === parseInt(tweetId))
                setcomments(tweet_comments)
            })
        })
        
    }

    
    useEffect(() => {
        
        getTweetById(parseInt(tweetId) , (isOk,data) =>{
            if (!isOk){
                alert('توییت مورد نظر یافت نشد !!!')
                return false
            }
            console.log(data)
            settweet(data)

            getAllComments((isOk,data)=>{
                if (!isOk){
                    alert('ناموفق در گرفتن کامنت ها !!!')
                    return false
                }
                const r_comments = data.filter(item => item.tweet === parseInt(tweetId))
                setcomments(r_comments)
                setisPending(false)
            })
        })

        
    }, [])
    

    const handletextarea = (e)=>{
        console.log(commentPart.current.offsetHeight);
        commentPart.current.style.height = commentPart.current.scrollHeight + 'px'
        setcommentText(e.target.value)
        
    }

    
    
    
    
    return (
        
        <div className={'main'} id={'main'}>
            
            
            
            <Header title={'توییت'} icon={NewtweetIcon} />
            
            
            {isPending && <div className='loader'></div>}
            <div className='tweet-container'>
                
                {!isPending &&
                    <>
                                
                    <Tweet  twtId={tweet.id}
                            senderId={tweet.sender.id} 
                            id={tweet.sender.username} 
                            username={tweet.sender.Fullname} 
                            image={tweet.sender.image} 
                            tweet={tweet.Text} 
                            likes = {tweet.likes} 
                            key={tweet.id} 
                            twtImg={tweet.image}
                            tweetActions = {tweet.tweetActions} 
                            IsRetweet={tweet.IsRetweet} 
                            retweets={tweet.retweets} />
                    
                    <div className={'input-inner'}>
                        <textarea id={'#comment-section'} onChange={handletextarea} ref={commentPart} className={IsLightTheme?'comment-insert':'comment-insert-dark'} placeholder={'دیدگاه خود را وارد کنید ...'}></textarea>
                        <span onClick={handleComment} class="material-icons">send</span>
                        {
                            Issent &&<div style={{width:'100%',backgroundColor:'#dff0d8'}}>
                            <p style={{color:'#3c763d',padding:'15px',fontSize:'13px',borderRadius:'4px'}}>دیدگاه شما با موفقیت ارسال گردید</p>
                        </div>
                        }
                        
                        
            

                    </div>
                </>
                }
                {
                    comments.map(comment=>{
                        return(
                            <div className={'tweet-info-comment'} style={{display:'flex',alignItems:'center',flexGrow:1,margin:'1rem',backgroundColor:IsLightTheme?'#ebebeb':'#212121',padding:'0.5rem 0.35rem',borderRadius:'12px'}}>
                                <img src={comment.user.image} style={{width:'30px',height:'30px',borderRadius:'50%',marginLeft:'0.4rem'}}></img>
                                <p style={{fontSize:'0.72rem',color:IsLightTheme?light.color:dark.color}}>{comment.text}</p>
                            </div>
                        )
                    })
                }

            </div>
       
            
            
            
            
            
            
            
        </div>   
        
    )
}
