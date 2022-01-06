import React,{useContext,useEffect,useState} from 'react'

import Leftsidebar from '../leftsidebar/leftsidebar'
import Rightsidebar from '../rightsidebar/rightsidebar'

import './main.css'

import { useMediaQuery } from 'react-responsive'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'
import H_navbar from '../H_navbar/H_navbar'
import MiniLeftsidebar from '../leftsidebar/MiniLeftsidebar'
import { ThemeContext } from '../../context/Theme-context'
import AddTweetBtn from '../floating-button/AddTweetBtn'
import Nav_Icons from '../nav-icon/Nav_Icons'
import { AuthContext } from './../../context/Auth-context';
import { useTweetDispatch ,  setRetweetsData , setLikesData } from '../../context/TweetContext'
import LoadingPage from '../LoadingPage/LoadingPage'
import { getCurrentUserRetweetedMedias } from '../../api/api_tweet'
import { toast } from 'react-toastify';
import { getCurrentUserLikedMedias } from './../../api/api_tweet';


function Layout(props) {
    
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    
    const token  = localStorage.getItem('access_token')
    // console.log(token);
    
    const {FetchUserData,Ispending} = useContext(AuthContext)
    
    const tweetDispatch = useTweetDispatch()
    const [retweetsIspending, SetretweetsIspending] = useState(true)
    const [likesIspending, SetlikesIspending] = useState(true)
    
    

    useEffect(() => {
        FetchUserData(token)
        getCurrentUserRetweetedMedias(token,(isOk,data)=>{
            if (!isOk){
                toast.warn('ناموفق در گرفتن ریتوییت ها')
                return
            }
            setRetweetsData(tweetDispatch,data)
            SetretweetsIspending(false)
        })

        getCurrentUserLikedMedias(token,(isOk,data)=>{
            if (!isOk ){
                toast.warn('ناموفق در گرفتن لایک ها')
                return
            }
            setLikesData(tweetDispatch , data)
            SetlikesIspending(false)
        })
        // setTweets(tweetDispatch,all_tweets)
        // setRetweetsData(tweetDispatch , all_retweets)
        // setLikesData(tweetDispatch , all_likes)
        console.log('changed something ...')
        
        
    }, [])
    
    const isMobileDevice  = useMediaQuery({maxWidth: 480})
    const isTabletDevice = useMediaQuery({ minWidth: 481, maxWidth: 768 })
    const isLaptopDevice = useMediaQuery({ minWidth: 769, maxWidth: 1024 })
    const isDesktop = useMediaQuery({ minWidth: 1025 , maxWidth:1200 })
    const isExtraLarge = useMediaQuery({ minWidth: 1200 })
    
    return (
        <>
           
        
            
            
            
            {(Ispending||retweetsIspending || likesIspending) && <LoadingPage />}
            {!Ispending && !retweetsIspending && !likesIspending &&
                <>
                    {isMobileDevice && <div className='container' style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}> {props.children} <AddTweetBtn /> <Nav_Icons /> <HamburgerMenu/> </div> }
                    {isTabletDevice && <div className='container' style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}> <HamburgerMenu/> {props.children}  <MiniLeftsidebar/></div> }
                    {isLaptopDevice && <div className='container' style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}> {props.children}  <MiniLeftsidebar/></div> }
                    {isDesktop && <div className='container' style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}><Rightsidebar/> {props.children} <MiniLeftsidebar/></div>}
                    {isExtraLarge && <div className='container' style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}><Rightsidebar/> {props.children} <Leftsidebar /></div>}
                </>
            }
            
            
            
            
            
        </>
    )
}

export default Layout;
