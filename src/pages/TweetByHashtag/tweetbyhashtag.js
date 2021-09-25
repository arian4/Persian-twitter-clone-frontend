import React,{useEffect,useContext} from 'react'
import Header from '../Home/header'
import Tweet from '../Home/tweet'
import '../Home/home.css'
import useFetch from '../../components/useFetch/useFetch';
import { useTweetState,useTweetDispatch,setTweets } from '../../context/TweetContext';
import { AuthContext } from '../../context/Auth-context';

function Tweetbyhashtag(props) {
    // window.scrollTo({ top: 0});
    const token  = localStorage.getItem('access_token')
    const {username,FetchUserData} = useContext(AuthContext)
    const {tweets} = useTweetState()
    const tweetDispatch = useTweetDispatch()
    
    const {data , ispending , error } = useFetch('http://127.0.0.1:8000/twitter/api/tweets/')
    const { data:handleLike } = useFetch('http://127.0.0.1:8000/twitter/api/handlelike/')
    const { data:handleRetweet } = useFetch('http://127.0.0.1:8000/twitter/api/retweets/')
    useEffect(() => {
        FetchUserData(token)

        
        setTweets(tweetDispatch,data)
    }, [JSON.stringify(data)])
    
    // const user  = localStorage.getItem('username')
    const hashtag = props.match.params['hashtag']
    
    const Liked_tweet = handleLike.filter((item => item.senders.includes(username)))
    const Retweeted_tweets = handleRetweet.filter((item)=>item.user.username.includes(username) && !item.IsEdited)
    const filterhashtags = tweets.filter((item => item.hashtags.includes(hashtag)))
    
    
    return (
        <div className={'main'}>
            {error && <div>{error}</div>}
            <Header title={props.match.params.hashtag} icon={'/images/hashtag.png'} />
            {ispending && <div className='loader'></div>}
            <div className='tweets-wrapper' style={{minHeight:'100vh',marginBottom:'2rem'}}>
                {
                    filterhashtags.map(hashtags =>{
                        
                        const checkLikes = Liked_tweet.some(L => L.tweet === hashtags.id)
                        let IsLiked = checkLikes?true:false
                        const checkRetweet = Retweeted_tweets.some(R => R.tweet.id === hashtags.id);
                        let IsRetweeted = checkRetweet?true:false
                        return(
                            <Tweet twtId={hashtags.id} id={hashtags.sender.username} username={hashtags.sender.Fullname} image={hashtags.sender.image} tweet={hashtags.Text} likes={hashtags.likes} twtImg={hashtags.image} Liked_tweet={IsLiked} IsRetweeted={IsRetweeted} IsRetweet={hashtags.IsRetweet} retweets={hashtags.retweets} />


                        )
                        
                        

                        
                        
                    })
                }

            </div>
             
            
        </div>
    )
}

export default Tweetbyhashtag;
