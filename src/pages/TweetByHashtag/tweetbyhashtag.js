import React,{useEffect,useState} from 'react'
import Header from '../Home/header'
import Tweet from '../Home/tweet'
import '../Home/home.css'
import { getTweetByHashtag } from '../../api/api_tweet';
import { toast } from 'react-toastify';
import { useTweetDispatch, useTweetState , setTweets } from '../../context/TweetContext';
import { HashtagIcon } from '../Home/icons';


function Tweetbyhashtag(props) {
    // window.scrollTo({ top: 0});
    
    // const [tweets, setTweets] = useState([])
    const [ispending, Setispending] = useState(true)
    const {tweets} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    
    const hashtag = props.match.params['hashtag']
    
    
    useEffect(() => {
        console.log('hashtag ... changed ')
        getTweetByHashtag(hashtag,(isOk,data)=>{
            
            if (!isOk){
                toast.error('توییت های مرتبط با هشتگ واکاوی نشدند ! ')
                return
            }
            
            setTweets(TweetDispatch , data)
            Setispending(false)
        return () => {
            setTweets(TweetDispatch,[])
            }
        })
        
        
        
    }, [hashtag])
    
    return (
        <div className={'main'} id={'main'}>
            
            <Header title={props.match.params.hashtag} icon={HashtagIcon} />
            
            {ispending && <div className='loader'></div>}
            <div className='tweets-wrapper'>
                {!ispending &&
                    
                    
                    tweets.map(hashtags =>{
                        
                        // const checkLikes = Liked_tweet.some(L => L.tweet === hashtags.id)
                        // let IsLiked = checkLikes?true:false
                        
                        return(
                            <Tweet twtId={hashtags.id}
                                    id={hashtags.sender.username} 
                                    username={hashtags.sender.Fullname} 
                                    image={hashtags.sender.image} 
                                    tweet={hashtags.Text} 
                                    likes={hashtags.likes} 
                                    twtImg={hashtags.image}
                                    tweetActions={hashtags.tweetActions}  
                                    IsRetweet={hashtags.IsRetweet} 
                                    retweets={hashtags.retweets} />


                        )
                        
                        

                        
                        
                    })
                }

            </div>
             
            
        </div>
    )
}

export default Tweetbyhashtag;
