import React from 'react'
import Header from '../Home/header'
import Tweet from '../Home/tweet'
import '../Home/home.css'
import useFetch from './../../components/useFetch/useFetch';


function Tweetbyhashtag(props) {
    // window.scrollTo({ top: 0});
    
    
    
    
    const hashtag = props.match.params['hashtag']
    const {data , ispending , error } = useFetch('http://127.0.0.1:8000/twitter/api/tweets/')
    // const Liked_tweet = All_Likes.filter((item => item.senders.includes(username)))
    const filterhashtags = data.filter((item => item.hashtags.includes(hashtag)))
    
    
    return (
        <div className={'main'}>
            
            <Header title={props.match.params.hashtag} icon={'/images/hashtag.png'} />
            {error && <p>{error}</p>}
            {ispending && <div className='loader'></div>}
            <div className='tweets-wrapper' style={{minHeight:'100vh',marginBottom:'2rem'}}>
                {!ispending &&
                    
                    filterhashtags.map(hashtags =>{
                        
                        // const checkLikes = Liked_tweet.some(L => L.tweet === hashtags.id)
                        // let IsLiked = checkLikes?true:false
                        
                        return(
                            <Tweet twtId={hashtags.id}
                                    id={hashtags.sender.username} 
                                    username={hashtags.sender.Fullname} 
                                    image={hashtags.sender.image} 
                                    tweet={hashtags.Text} likes={hashtags.likes} 
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
