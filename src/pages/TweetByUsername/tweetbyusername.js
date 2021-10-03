import React,{useContext} from 'react'
import Header from '../Home/header'
import Tweet from '../Home/tweet'
import '../Home/home.css'
import useFetch from '../../components/useFetch/useFetch';
import User_profile from '../../components/User_profile/User_profile';

import { ThemeContext } from '../../context/Theme-context';
import { AuthContext } from '../../context/Auth-context';


function Tweetbyusername(props) {
    
    const {username:current_user} = useContext(AuthContext)
    // window.scrollTo({ top: 0});
    const {IsLightTheme} = useContext(ThemeContext)
    
    const username  = props.match.params['username']
    
    
    const {data , ispending , error } = useFetch('http://127.0.0.1:8000/twitter/api/tweets/' + username)
    const { data:handleLike } = useFetch('http://127.0.0.1:8000/twitter/api/handlelike/')
    const { data:handleRetweet } = useFetch('http://127.0.0.1:8000/twitter/api/retweets/')
   
    const Liked_tweet = handleLike.filter((item => item.senders.includes(current_user)))
    const Retweeted_tweets = handleRetweet.filter((item)=>item.user.username.includes(current_user) && !item.IsEdited)
    // ############################

    
    
    
    return (
        <div className={'main'}>
            
            
            {error && <div>{error}</div>}
            
            <Header title={props.match.params.username} icon={IsLightTheme?'/images/user-icon.png':'/images/user-w.png'} />
            <User_profile user_data={username} />
            
            
            {ispending && <div className='loader'></div>}
            <div className='tweets-wrapper' style={{minHeight:'100vh',marginBottom:'2rem'}}>
                {!ispending && !!( data.retweets.length > 0 ) && data.retweets.map(twt =>{
                    
                    
                    const checkLikes = Liked_tweet.some(L => L.tweet === twt.tweet.id);
                    const checkRetweet = Retweeted_tweets.some(R => R.tweet.id === twt.tweet.id);
                    let IsRetweeted = checkRetweet?true:false
                    let IsLiked = checkLikes?true:false
                    
                    return(
                        <Tweet key={twt.tweet.id} twtId={twt.tweet.id} id={twt.tweet.sender.username} username={twt.tweet.sender.Fullname} image={twt.tweet.sender.image} tweet={twt.tweet.Text} likes={twt.tweet.likes} twtImg={twt.tweet.image} Liked_tweet={IsLiked} IsRetweeted ={IsRetweeted }  IsRetweet={twt.tweet.IsRetweet} retweets={twt.tweet.retweets} retweetFlag={twt.user} retweet_id={twt.id} />
                    )
                })}
                {!ispending && !!( data.tweets.length > 0 ) && data.tweets.map(twt =>{
                    
                    
                    const checkLikes = Liked_tweet.some(L => L.tweet === twt.id);
                    const checkRetweet = Retweeted_tweets.some(R => R.tweet.id === twt.id);
                    let IsRetweeted = checkRetweet?true:false
                    let IsLiked = checkLikes?true:false
                    return(
                        <Tweet key={twt.id} twtId={twt.id} id={twt.sender.username} username={twt.sender.Fullname} image={twt.sender.image} tweet={twt.Text} likes={twt.likes} twtImg={twt.image} Liked_tweet={IsLiked} IsRetweeted={IsRetweeted} IsRetweet={twt.IsRetweet} retweets={twt.retweets} />
                    )
                })}

            </div>
            
            
            

            
        </div>
    )
}

export default Tweetbyusername;
