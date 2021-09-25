import React,{useState,useEffect,useContext} from 'react'
import Header from '../Home/header';
import  { useHistory} from 'react-router-dom'
import axios from 'axios'
import './followpage.css'
import FollowBtn from '../../components/FollowBtn/FollowBtn';
import { ThemeContext } from '../../conext/Theme-context';
export default function FollowPage(props) {
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    window.scrollTo({ top: 0});
    const history = useHistory()
    const user = props.match.params['username']
    const type = props.match.params['type']
    console.log(type);
    const[data,setdata] = useState([])
    const checkUser=(e,user)=>{
        // console.log(e);
        // console.log(user);
        // console.log(e.currentTarget.classList.contains('followBtn-I'));
        if(!e.target.classList.contains('followBtn-I')){
            
            history.push('/username/'+user.username)
        }
        

    }

    const sort_by_followings= (data)=>{
        let sorted_data = []
        let other_data = []
        data.forEach(element => {
            if(element.Followers.includes(parseInt(localStorage.getItem('id')))){
                sorted_data.push(element)
            }else{
                other_data.push(element)
            }
            
        });
        return sorted_data.concat(other_data)
    }
    
    
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/twitter/api/'+user+'/'+type)
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
            {type==='followers'?<Header title={'دنبال کنندگان'} icon={IsLightTheme?'https://img.icons8.com/fluency-systems-regular/48/000000/add-user-male.png':'https://img.icons8.com/fluency-systems-regular/48/ffffff/add-user-male.png'} />:<Header title={'دنبال شوندگان'} icon={'https://img.icons8.com/fluency-systems-regular/48/000000/add-user-male.png'} />}
            
            <div className={'follow-data-container'}>
                {
                    data.map(user=>{
                        return(
                            <div className={IsLightTheme?'follow-data':'follow-data-dark'} onClick={(e)=>checkUser(e,user)}>
                                <img src={user.image} alt='follow-pic-alt' className={'follow-pic'}></img>
                                
                                <span className={'follow-user'} style={{color:IsLightTheme?'#111':dark.color}}>@{user.username}</span>
                                <span style={{marginLeft:'auto',marginRight:'20px'}}>
                                    <FollowBtn data={user} />

                                </span>
                                
                            </div>

                        )
                    })
                }
                
            </div>
            
            
        </div>
    )
}
