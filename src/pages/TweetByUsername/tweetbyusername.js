import React,{useContext,useEffect} from 'react'
import Header from '../Home/header'
import Tweet from '../Home/tweet'
import '../Home/home.css'
import useFetch from '../../components/useFetch/useFetch';
import User_profile from '../../components/User_profile/User_profile';
import { ThemeContext } from '../../context/Theme-context';
import { useTweetDispatch,setTweets ,useTweetState} from '../../context/TweetContext';



function Tweetbyusername(props) {
    
    
    // window.scrollTo({ top: 0});
    const {IsLightTheme} = useContext(ThemeContext)
    
    const username  = props.match.params['username']
    const {tweets:Related_Tweets} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    
    const {data , ispending , error } = useFetch('http://127.0.0.1:8000/twitter/api/tweets/' + username)
    // const tweetsCopy = data.tweets
    const retweetsCopy = data.retweets
    
    useEffect(() => {
        setTweets(TweetDispatch,data.tweets)
        

        
        return () => {
            setTweets(TweetDispatch,[])
        }
    }, [JSON.stringify(data)])
    
    
   
    // const Liked_tweet = All_Likes.filter((item => item.senders.includes(current_user)))
    // ############################
    
    
    
    
    return (
        <div className={'main'}>
            
            
            {error && <div>{error}</div>}
            
            <Header title={props.match.params.username} icon={IsLightTheme?'/images/user-icon.png':'/images/user-w.png'} />
            <User_profile user_data={username} />
            
            
            
            {ispending && <div className='loader'></div>}
            <div className='tweets-wrapper' style={{minHeight:'100vh',marginBottom:'2rem'}}>
                {!ispending && !!( retweetsCopy.length > 0 ) && retweetsCopy.map(twt =>{
                    
                    
                    // const checkLikes = Liked_tweet.some(L => L.tweet === twt.tweet.id);
                    
                    
                    // let IsLiked = checkLikes?true:false
                    
                    return(
                        <Tweet  key={twt.tweet.id} 
                                twtId={twt.tweet.id} 
                                id={twt.tweet.sender.username} 
                                username={twt.tweet.sender.Fullname} 
                                image={twt.tweet.sender.image} 
                                tweet={twt.tweet.Text} 
                                likes={twt.tweet.likes} 
                                twtImg={twt.tweet.image}
                                tweetActions={twt.tweet.tweetActions}  
                                IsRetweet={twt.tweet.IsRetweet} 
                                retweets={twt.tweet.retweets} 
                                retweetFlag={twt.user} />
                    )
                })}
                {!ispending && !!( Related_Tweets.length > 0 ) && Related_Tweets.map(twt =>{
                    
                    
                    
                    // const checkLikes = Liked_tweet.some(L => L.tweet === twt.id);
                    
                    
                    // let IsLiked = checkLikes?true:false
                    return(
                        <Tweet  key={twt.id} 
                                twtId={twt.id} 
                                id={twt.sender.username} 
                                username={twt.sender.Fullname} 
                                image={twt.sender.image} 
                                tweet={twt.Text} 
                                likes={twt.likes} 
                                twtImg={twt.image} 
                                tweetActions={twt.tweetActions} 
                                IsRetweet={twt.IsRetweet} 
                                retweets={twt.retweets} />
                    )
                })}

            </div>
            
            
            

            
        </div>
    )
}

export default Tweetbyusername;
