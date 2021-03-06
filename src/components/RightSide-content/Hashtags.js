import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useTweetState,useTweetDispatch,setHashtags } from '../../context/TweetContext'
import useFetch from '../useFetch/useFetch'
import './hashtagsList.css'
import { HashtagIcon } from './../../pages/Home/icons';
export default function Hashtags({theme}) {
    
    const {hashtags} = useTweetState()
    const HashtagDispatch = useTweetDispatch()
    
    const {data , ispending , error } = useFetch('http://127.0.0.1:8000/twitter/api/hashtags')
    useEffect(() => {
        setHashtags(HashtagDispatch,data)
        
    }, [JSON.stringify(data)])
    
    return (
        <>
            {!ispending &&
            <div className={'hashtags-container'}>
                {error && <p style={{color:'red'}}>{error}</p>}
                <ul className={'hashtags-list'}>
                        {   
                            hashtags.map((hashtag,index)=>{
                                if(index > 7){
                                    return
                                }
                                return(
                                    <li className={'hashtag-item'} key={hashtag.id}>
                            
                                        <Link to={'/hashtags/'+hashtag.hashtag} className={theme.IsLightTheme?'hashtag-item-link':'hashtag-item-link-dark'}>
                                            {HashtagIcon}
                                            <p>{hashtag.hashtag} ({hashtag.count})</p>
                                            
                                            

                                        </Link>
                                        
                                    </li>

                                )
                            })
                        }
                    

                </ul>
            
            </div> 
        }
        {ispending && <img src='/images/dots-loading.gif' alt='dots-loading' style={{width:'60px',marginRight:'50%'}}></img>}
        </>
        
        
    )
}
