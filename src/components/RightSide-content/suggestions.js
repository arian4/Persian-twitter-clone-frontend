import React,{useState,useEffect,useContext} from 'react'
import './suggestions.css'
import { AuthContext } from './../../context/Auth-context';
import { getAllUsers } from './../../api/api_tweet';
import { useHistory } from 'react-router-dom';
import FollowBtn from '../FollowBtn/FollowBtn';
import { ThemeContext } from './../../context/Theme-context';
// import _ from 'lodash'
export default function Suggestions() {
    
    const {IsLightTheme,light,dark} = useContext(ThemeContext)
    const {id:current_user_id,Followers,Followings} = useContext(AuthContext)
    
    const override ={
        marginRight: 'auto',
        marginLeft:'10px',
        padding : '4px 13px' ,
        borderRadius:'9px',
        fontSize:'12px'
    }
    const history = useHistory()
    
    const [AllUsers, setAllUsers] = useState([])
    const [CurPage, setCurPage] = useState(3)

    
    
    useEffect(() => {
        console.log('Suggestions useEffect ran !')
        getAllUsers((isOk,data)=>{
            if(!isOk){
                alert('ناموفق در گرفتن لیست یوزر ها ')
                return
            }
            setAllUsers(data)
    
        })
        
    }, [Followers.length])
    
    
    const Suggestions_Users = AllUsers.filter(user => Followers.includes(user.id) && !Followings.includes(user.id))
    // const divided_users = _.chunk(Suggestions_Users, 3)
    
    const check_suggestions = (e,username) =>{
        if(!e.target.classList.contains('followBtn-I')) history.push(`/username/${username}`)
    }
    const Show_More_Users = () =>{
        setCurPage(prevState => prevState + 3)
    }
    
    return (
        <aside style={{backgroundColor:IsLightTheme?'#ebebebeb':'#555'}}>
            
            <h4 style={{color:IsLightTheme?light.color:dark.color}}>ممکنه خوشت بیاد</h4>
            {
                Suggestions_Users.map((user , index )=>{
                    if (index >=CurPage) return
                    return(
                        // <Link key ={user.id} to = {`/username/${user.username}`}>
                            <div key={user.id} className={IsLightTheme?'suggestions':'suggestions-dark'} onClick = {(e)=>check_suggestions(e,user.username)}>
                                <img src={user.image} alt='s-users' className='avatar' />
                                <div className='s-user-data'>
                                    <p className='s-user-Fullname' style={{color:IsLightTheme?'#111':dark.color}}>{user.Fullname}</p>
                                    <p className='s-user-username' style={{color:IsLightTheme?'#808080':dark.color}} >@{user.username}</p>
                                </div>
                                <FollowBtn data={user} current_user_id = {current_user_id} style={override} />
                            </div>
                        // </Link>
                        

                    )
                    


                })
            }
            
            <div className='s-show-more' style={{color:IsLightTheme?'#0B66FE':dark.color}} onClick ={Show_More_Users}>
                {CurPage > Suggestions_Users.length ? null : 'نمایش بیش تر ...'}
            </div>
            
            

        </aside>
    )
}
