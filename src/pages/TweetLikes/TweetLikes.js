import React,{useState,useEffect,useContext} from 'react'
import  { useHistory} from 'react-router-dom'
import Header from '../Home/header'
import axios from 'axios'
import FollowBtn from '../../components/FollowBtn/FollowBtn'
import './tweetlikes.css'
import { ThemeContext } from '../../context/Theme-context'
import { AuthContext } from './../../context/Auth-context';
export default function TweetLikes(props) {
    const {id} = useContext(AuthContext)
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    
    window.scrollTo({ top: 0});
    const tweetId = props.match.params['tweetId']
    const history = useHistory()
    const[data,setdata] = useState([])

    const checkUser=(e,user)=>{
        
        
        if(!e.target.classList.contains('followBtn-I')){
            
            history.push('/username/'+user.username)
        }
        

    }

    const sort_by_followings= (data)=>{
        let sorted_data = []
        let other_data = []
        data.forEach(element => {
            if(element.Followers.includes(id)){
                sorted_data.push(element)
            }else{
                other_data.push(element)
            }
            
        });
        return sorted_data.concat(other_data)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/twitter/api/tweet/'+tweetId.toString()+'/likes')
        // tweet/<int:tweetId>/likes
        .then(function (response) {
            // handle success
            
            setdata(sort_by_followings(response.data))
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        
    }, [])
    return (
        <div className={'main'} style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
            
            <Header title={'پسندیده اند'} icon={'https://img.icons8.com/material-outlined/24/fa314a/like--v1.png'}/>
            <div className={'like-data-container'}>
                {
                    data.map(user=>{
                        return(
                            <div className={IsLightTheme?'like-data':'like-data-dark'} onClick={(e)=>checkUser(e,user)}>
                                <img src={user.image} alt='follow-pic-alt' className={'follow-pic'}></img>
                                <span className={'like-user'} style={{color:IsLightTheme?'gray':'#fff'}}>@{user.username}</span>
                                {user.id !==id ?
                                    <span style={{marginLeft:'auto',marginRight:'20px'}}>
                                        <FollowBtn data={user} current_user_id = {id} />

                                    </span>
                                    :null

                                }
                                
                                
                            </div>

                        )
                    })
                }
                
            </div>
            
        </div>
    )
}
