import React, {useState,useContext,useEffect} from 'react'
import './home.css'
import Newtweet from './newtweet'
import Header from './header'
import Tweet from './tweet'
import { setTweets, useTweetDispatch, useTweetState} from '../../context/TweetContext'
import TabList from '../../components/TabList/TabList'
import SORT_TYPES from '../../constant/sort_type'
import { ThemeContext } from '../../context/Theme-context'
import { useMediaQuery } from 'react-responsive'
import { getHomeFeed } from '../../api/api_tweet'
import { toast } from 'react-toastify';




function Home() {
    const [HomeFeedPending, SetHomeFeedPending] = useState(true)
    const token = localStorage.getItem('access_token')
    
    
    const {IsLightTheme} = useContext(ThemeContext)
    
    
    // console.log("🚀 ~ file: home.js ~ line 19 ~ Home ~ Theme", IsLightTheme, dark, light)
    
    const isMobileDevice  = useMediaQuery({maxWidth: 480})
    
    const[sortType,setsortType] = useState(SORT_TYPES.NEW_TWEETS)
    
    const {tweets} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    
    useEffect(() => {
        getHomeFeed(token,(isOk,data)=>{
            if (!isOk){
                toast.warn('مشکلی از سمت سرور پیش آمده . ناموفق در گرفتن توییت ها ')
                return
            }
            
            setTweets(TweetDispatch , data)
            SetHomeFeedPending(false)
        })

    }, [])
    
    
    
    
    
    
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

    
    
    // const Liked_tweet = All_Likes.filter((item => item.senders.includes(username)))
    
    
    
    return (
        

        <div className={'main'}>
            
            
            
            <Header title={'خانه'} icon={IsLightTheme?'/images/home-page.png':'/images/home-page-w.png'} />
            
            
            {!isMobileDevice && <Newtweet /> }
            
            
            
            <TabList setsortType={setsortType} />
            
            
            
            {HomeFeedPending && <div className='loader'></div>}

            {!HomeFeedPending &&
                getSortedTweets(sortType, tweets).map((twt)=>{
                    
                    // const checkLikes = Liked_tweet.some(L => L.tweet === twt.id);
                    // const checkRetweet = All_Retweets.filter(R => R.tweet.id === twt.id);
                    // let IsLiked = checkLikes?true:false
                    
                    return <Tweet key={twt.id}  
                                twtId={twt.id} 
                                senderId={twt.sender.id} 
                                id={twt.sender.username} 
                                username={twt.sender.Fullname} 
                                image={twt.sender.image} 
                                tweet={twt.Text} 
                                likes = {twt.likes} 
                                twtImg={twt.image}
                                tweetActions={twt.tweetActions} 
                                IsRetweet={twt.IsRetweet} 
                                retweets={twt.retweets}   />
                })
            }
            
            
            
            
            
            
        </div>
    )
}

export default Home;
