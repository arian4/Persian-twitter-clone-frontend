import React from 'react'
import Layout from './components/layout/layout'
import Page404 from './pages/404/Page404'
import Home from './pages/Home/home'
import Tweetbyhashtag from './pages/TweetByHashtag/tweetbyhashtag'
import Tweetbyusername from './pages/TweetByUsername/tweetbyusername'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import LoginPage from './pages/Auth/Login/LoginPage'
import Register from './pages/Auth/Register/Register'
import TweetInfo from './pages/TweetInfo/TweetInfo'
import FollowPage from './pages/Follow_Page/FollowPage'
import TweetLikes from './pages/TweetLikes/TweetLikes'
import Settings from './components/settings/Settings'
import Sm_newtweet from './pages/Home/sm_newtweet'
import Explore from './components/Explore/Explore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const App = (props) =>{
   
    console.log('App ran !');
    
    
    return (
    <>
            <ToastContainer />
    
    
            <BrowserRouter>
                    

            <Switch>
                
                

            
                <PublicRoute  path={'/login'} component={LoginPage} />
                

            
                

            
                
                
                
                
                <PublicRoute  path={'/register'} component={Register} />
                
                < PrivateRoute path={'/'} render={()=>
                    
                    
                    
                                    
                            
                        <Layout>
                            
                            <Switch>
                                
                                
                                <Route path={'/compose/tweet'} component={Sm_newtweet} />
                                <Route path={'/username/:username'} component={Tweetbyusername} />
                                <Route path={'/hashtags/:hashtag'} component={Tweetbyhashtag} />
                                <Route path={'/tweet/status/:id'} component={TweetInfo} />
                                <Route path={'/tweet/:tweetId/likes'} component={TweetLikes} />
                                <Route path={'/:username/:type'} component={FollowPage } />
                                <Route path={'/settings'} component={Settings } />
                                <Route path={'/explore'} component={Explore } />
                                <Route exact path={'/'} component={Home}  />
                                
                                <Route component={Page404} />
                        

                            </Switch>

                        </Layout>
                        
                        

                    
                    
                    

                }/> 
                

            </Switch>

            
            
            
            
            
            
        </BrowserRouter>

    
        
            

        
        
        
    </>
)};

export default App;




const isLogin = ()=>{
    return(!!localStorage.getItem('access_token'))
}

const PublicRoute  = ({component,...props}) =>{
    if(isLogin()){
        return <Redirect to={'/'} />

    }
    return(
        <Route {...props} component={component} />
    )

    
}

const PrivateRoute = ({render,...props}) =>{
    if(!isLogin()){
        return <Redirect to={'/login'} />

    }
    return(
        <Route {...props} render={render}/>
    )
}
    
    