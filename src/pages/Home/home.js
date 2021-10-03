import React, { useEffect,useState,useContext} from 'react'
import './home.css'
import Newtweet from './newtweet'
import Header from './header'
import Tweet from './tweet'
import axios from 'axios'
import { useTweetDispatch, useTweetState,setTweets,setHashtags} from '../../context/TweetContext'
import useFetch from '../../components/useFetch/useFetch'
import TabList from '../../components/TabList/TabList'
import SORT_TYPES from '../../constant/sort_type'
import { ThemeContext } from '../../context/Theme-context'
import { useMediaQuery } from 'react-responsive'
import { AuthContext } from '../../context/Auth-context'



function Home() {
    const token  = localStorage.getItem('access_token')
    
    const {IsLightTheme} = useContext(ThemeContext)
    const {username} = useContext(AuthContext)
    
    // console.log("🚀 ~ file: home.js ~ line 19 ~ Home ~ Theme", IsLightTheme, dark, light)
    
    const isMobileDevice  = useMediaQuery({maxWidth: 480})
    
    const[sortType,setsortType] = useState(SORT_TYPES.NEW_TWEETS)
    
    const {tweets} = useTweetState()
    const tweetDispatch = useTweetDispatch()
    
    
    const {data , ispending , error } = useFetch('http://127.0.0.1:8000/twitter/api/tweets/')
    const { data:handleLike} = useFetch('http://127.0.0.1:8000/twitter/api/handlelike/')
    const { data:handleRetweet } = useFetch('http://127.0.0.1:8000/twitter/api/retweets/')
    
    useEffect(() => {
        setTweets(tweetDispatch,data)
        
        
    }, [JSON.stringify(data)])
    
    const getSortedTweets = (sortType, tweetsArr) => {
        
        switch(sortType){
            case 'NEW_TWEETS':
                return tweetsArr.sort((a,b)=>{return b.id-a.id})
            case 'HOT_TWEETS':
               return tweetsArr.sort((a,b)=> b.likes - a.likes)
            case 'RETWEETS':
                return tweetsArr.filter((item)=>item.retweets !==null)
            case 'IMAGES_MEDIA':
                return tweetsArr.filter((item)=>item.image !==null)
            default:
                return tweetsArr
        }
    }

    
    
    
   
    const updateTweets = () =>{
        axios.get('http://127.0.0.1:8000/twitter/api/tweets/')
        .then(function (response) {
            // handle success
            console.log('tweets updated ...');
            setTweets(tweetDispatch,response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            
            // always executed
        })
    }

    const updateHashtags = () =>{
        axios.get('http://127.0.0.1:8000/twitter/api/hashtags')
        .then(function (response) {
            // handle success
            
            console.log(response.data);
            console.log('hashtags updated ...');
            setHashtags(tweetDispatch,response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            
            // always executed
        })
    }
    const AddHashtags = (newtweetId) =>{
        axios.post('http://127.0.0.1:8000/twitter/api/addhashtags/', {
            'newtweetId': newtweetId,
            
          })
          .then(function (response) {
              console.log(response.data);
              updateHashtags()
            
          })
          .catch(function (error) {
            console.log(error);
            
        });

    }

    

    
    
    const Liked_tweet = handleLike.filter((item => item.senders.includes(username)))
    const Retweeted_tweets = handleRetweet.filter((item)=>item.user.username.includes(username) && !item.IsEdited)
    
    
    
    
    

    return (
        

        <div className={'main'}>
            
            {error && <div>{error}</div>}
            
            <Header title={'خانه'} icon={IsLightTheme?'/images/home-page.png':'/images/home-page-w.png'} />
            
            
            {!isMobileDevice && <Newtweet updateTweets = {updateTweets} AddHashtags={AddHashtags} /> }
            
            
            
            <TabList setsortType={setsortType} />
            
            {ispending && <div className='loader'></div>}


            {!ispending &&
                getSortedTweets(sortType, tweets).map((twt)=>{
                    
                    const checkLikes = Liked_tweet.some(L => L.tweet === twt.id);
                    const checkRetweet = Retweeted_tweets.some(R => R.tweet.id === twt.id);
                    let IsLiked = checkLikes?true:false
                    let IsRetweeted = checkRetweet?true:false
                    return <Tweet key={twt.id}  twtId={twt.id} senderId={twt.sender.id} id={twt.sender.username} username={twt.sender.Fullname} image={twt.sender.image} tweet={twt.Text} likes = {twt.likes} key={twt.id} twtImg={twt.image} Liked_tweet={IsLiked} IsRetweet={twt.IsRetweet} IsRetweeted={IsRetweeted} retweets={twt.retweets}   />
                })
            }
            
            
            
            
            
            
        </div>
    )
}

export default Home;
