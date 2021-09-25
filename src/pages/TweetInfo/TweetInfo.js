import React,{useEffect,useState,useRef,useContext} from 'react'
import Tweet from '../Home/tweet'
import axios from 'axios';
import '../Home/home.css'
import './tweetInfo.css'
import Header from '../Home/header';
import { ThemeContext } from '../../context/Theme-context';
import { AuthContext } from './../../context/Auth-context';
import {getAllTweets, getAllComments , NewCommentRequest , getAllLikes , getAllRetweets } from './../../api/api_tweet';


export default function TweetInfo(props) {
    
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const token  = localStorage.getItem('access_token')
    const {username,FetchUserData} = useContext(AuthContext)
    
    const tweetId  = parseInt(props.match.params['id'])
    const commentPart = useRef()
    
    const [twt,settweet] = useState([])
    const[commentText,setcommentText] = useState('')
    const[Issent,setIssent] = useState(false)
    const [comments , setcomments] = useState([])
    const [handleLike,sethandleLike] = useState([])
    const [handleRetweet,sethandleRetweet] = useState([])
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
        FetchUserData(token)
        
        getAllTweets((isOk,data)=>{
            if(!isOk){
                alert('توییت مورد نظر یافت نشد !!!')
                return false
            }
            settweet(data.filter((item => item.id === tweetId)))
            
            getAllLikes((isOk,data)=>{
                if(!isOk){
                    alert('ناموفق در گرفتن لایک ها !!!')
                    return false
                }
                sethandleLike(data)
            })
            
            getAllRetweets((isOk,data)=>{
                if(!isOk){
                    alert('ناموفق در گرفتن ریتوییت ها از سرور !!!')
                    return false
                }
                sethandleRetweet(data)
            })

            
            getAllComments((isOk,data)=>{
                if(!isOk){
                    alert('ناموفق در گرفتن کامنت ها !!!')
                    return false
                }
                const r_comments = data.filter(item => item.tweet === parseInt(tweetId))
                setcomments(r_comments)
            })
            
            setisPending(false)
        })
        
        
            
    },[])

    const handletextarea = (e)=>{
        console.log(commentPart.current.offsetHeight);
        commentPart.current.style.height = commentPart.current.scrollHeight + 'px'
        setcommentText(e.target.value)
        
    }

    
    let IsLiked = false
    const Liked_tweet = handleLike.filter((item => item.senders.includes(username) && item.tweet===twt[0].id))
    
    if (Liked_tweet.length >0){
        IsLiked = true
    }
    let IsRetweeted = false
    const Retweet_status = handleRetweet.filter((item)=>item.user.username.includes(username) && !item.IsEdited && item.tweet.id===twt[0].id)
    if(Retweet_status.length >0){
        IsRetweeted = true
    }
    
    
    return (
        
        <div className={'main'}>
            
            
            
            <Header title={'توییت'} icon={"https://img.icons8.com/color/48/000000/circled-left-2--v1.png"} />
            
            
            {isPending && <div className='loader'></div>}
            <div className='tweet-container'>
                {!isPending &&
                    twt.map(tweet =>{
                    return(
                        <>
                            
                            <Tweet twtId={tweet.id} senderId={tweet.sender.id} id={tweet.sender.username} username={tweet.sender.Fullname} image={tweet.sender.image} tweet={tweet.Text} likes = {tweet.likes} key={tweet.id} twtImg={tweet.image} Liked_tweet={IsLiked} IsRetweeted ={IsRetweeted} IsRetweet={tweet.IsRetweet} retweets={tweet.retweets} />
                            
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
                    ) 

                        

                    })
                }
                {
                    comments.map(comment=>{
                        return(
                            <div className={'tweet-info-comment'} style={{display:'flex',alignItems:'center',flexGrow:1,margin:'1rem'}}>
                                <img src={comment.user.image} style={{width:'40px',height:'40px',borderRadius:'50%',marginLeft:'0.4rem'}}></img>
                                <p style={{fontSize:'0.72rem',color:IsLightTheme?light.color:dark.color}}>{comment.text}</p>
                            </div>
                        )
                    })
                }

            </div>
       
            
            
            
            
            
            
            
        </div>   
        
    )
}
