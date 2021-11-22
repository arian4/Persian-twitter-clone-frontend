import React ,{useState,useEffect,useContext} from 'react'
import { getUser_Followers_OR_Followings } from '../../api/api_tweet';
import { AuthContext } from './../../context/Auth-context';
import { ThemeContext } from './../../context/Theme-context';

export default function Mention_Box({IsModalOpen,DisplayMentionbox,setTweetText}) {
    const {username} = useContext(AuthContext)
    const {IsLightTheme} = useContext(ThemeContext)
    const [Mentionfeeds, setMentionfeeds] = useState([])
    const [MentionboxPending, setMentionboxPending] = useState(true)
    
    const AddUserToText = (username) =>{
        setTweetText(prev => prev + `@${username}`)

    }

    useEffect(() => {
        if(IsModalOpen){
            getUser_Followers_OR_Followings(username,'followings',(isOk,data)=>{
            
                if (!isOk){
                    alert('شخص مورد نظر شما یافت نشد !')
                    return
                }
                
                setMentionfeeds(data)
                setMentionboxPending(false)
            })
        }
        return () => {
            // cleanup
        }
    }, [IsModalOpen])

    return (
        <div className={IsLightTheme?'m-mention-box':'m-mention-box-dark'} style={{display:DisplayMentionbox?'block':'none' }}>
                    <input className={IsLightTheme?'m-mentionbox-search':'m-mentionbox-search-dark'} placeholder='دنبال چه کسی می گردی ؟'></input>
                    
                    {
                        MentionboxPending && <div className='loader'></div>
                    }
                    
                    {  !MentionboxPending && 
                        
                        Mentionfeeds.map(user =>{
                            return(
                                <div className={IsLightTheme?'mention-user-wrapper':'mention-user-wrapper-dark'} key={user.id} onClick={()=>AddUserToText(user.username)}>
                                    <p className='mention-box-user-username' style={{color:IsLightTheme?'#111':'#ccc'}}>@{user.username}</p>
                                    <img className='mention-box-user-img' src={user.image} alt={'mention-image'} />
                                </div>

                            )
                        })
                        
                    }
                    
                    

        </div>
        
    )
}
