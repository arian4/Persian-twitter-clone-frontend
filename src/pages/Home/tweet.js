import React, {useRef,useState,useContext,useEffect } from 'react'
import  { Link, useHistory} from 'react-router-dom'
import classnames from 'classnames'
import { useTweetDispatch,setRetweet, useTweetState,setTweets ,setHashtags} from '../../conext/TweetContext';
import axios from 'axios'
import Swal from 'sweetalert2'
import { ThemeContext } from '../../conext/Theme-context';
import './homecss/tweet.css'
import { heartIcon, QuoteTweetIcon, retweetIcon } from './icons';
import { DeleteRetweetRequest, newRetweetRequest } from '../../api/api_tweet';



function Tweet({twtId,id,username,image,tweet,likes,twtImg,Liked_tweet,IsRetweeted,IsRetweet,retweets,retweetFlag,retweet_id}) {
    const history = useHistory()
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    // const {Theme} = useContext(ThemeContext)
    
    const RenderTweet =(text)=>{
    
        
        
    return {__html: text.replace(/#\S+/g,function( matchedString){
        const noSymbol = matchedString.slice(1)
        return '<a href=/hashtags/'+noSymbol.toString() +' '+ 'class="hashtag">'+matchedString+'</a>'
    }).replace(/(?<=^|(?<=[^a-zA-Z0-9-_\.]))@([A-Za-z]+[A-Za-z0-9-_]+)/g,function( matchedString){
        const noSymbol = matchedString.slice(1)
        return '<a href=/username/'+noSymbol.toString() +' '+ 'class="mention">'+matchedString+'</a>'
    })}
    };
    const handleLike = useRef()
    const retweet_actin = useRef()
    const retweet_btn = useRef()
    const tweet_Body = useRef()
    const [checkPermissions,setcheckPermissions] = useState(false)
    const [isToggled,setisToggled] = useState(false)
    
    
    const {tweets} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    const likebtn = (e) =>{
        
        const token  = localStorage.getItem('access_token')
        
        axios.post('http://127.0.0.1:8000/twitter/api/handlelike/', {
            'twtId': twtId,
            'access_token': token
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        
        let current_num_likes =parseInt(handleLike.current.innerHTML)
        
        if(e.target.classList.value==='fa fa-heart-o'){
            // setlike('fa-heart')
            e.target.classList.value = 'fa fa-heart'
            current_num_likes +=1
            handleLike.current.innerHTML = current_num_likes
            
            
            
            

        }else{
            // setlike('fa-heart-o')
            e.target.classList.value = 'fa fa-heart-o'
            current_num_likes -=1
            handleLike.current.innerHTML = current_num_likes
            
        }
        
        
        
        

    }
    
    
    
    const Quote_Tweet = () =>{
        const data = {}
        data['retweet_id'] = twtId
        data['text'] = tweet
        data['image'] = image
        data['username'] = id
        console.log(data);
        retweet_actin.current.classList.toggle('show-retweet-choice')
        
        document.getElementsByClassName('main')[0].scrollTop = 0;
        setRetweet(TweetDispatch,data)
        

    }
    const retweetClick = () =>{
        retweet_btn.current.style.color = '#66CC66'
        retweet_actin.current.classList.toggle('show-retweet-choice')
        const formData = new FormData()
        formData.append('tweet_id',twtId)
        
        newRetweetRequest(formData,localStorage.getItem('username'),(isOk)=>{
            if(!isOk){
                retweet_btn.current.style.color = '#111'
                return alert('ری توییت شما ارسال نشد !!!!')
            }
        })
        
        
    }
    const UndoRetweet = ()=>{
        tweet_Body.current.style.display = 'none'
        retweet_actin.current.classList.toggle('show-retweet-choice')
        const formData = new FormData()
        formData.append('retweet_id',retweet_id)
        DeleteRetweetRequest(formData,(isOk)=>{
            if(!isOk){
                tweet_Body.current.style.display = 'block'
                return alert('ریتوییت شما حذف نگردید !!!')

            }
        })

    }
    const commentBtn = () =>{
        
        history.push('/tweet/status/'+twtId.toString()+'/#comment-section')
        
        
        
    }
    const tweetDetails = (e)=>{
        console.log('tweet body clicked ... ');
        if(!e.target.classList.contains('mention') && !e.target.classList.contains('hashtag')){
            console.log('Just tweet body ... ');
            history.push('/tweet/status/'+twtId.toString())

        }
        
    }

    
    const showHiddenicons = ()=>{
        
        
        if(!isToggled){
            setisToggled(true)
        }else{
            setisToggled(false)
        }
        
        if (localStorage.getItem('username')==id){
            setcheckPermissions(true)
        }
        
        

    }
    const checkRetweetInfo = ()=>{
        
        history.push('/tweet/status/'+retweets.tweet.id)
    }
    const updateHashtags = () =>{
        axios.get('http://127.0.0.1:8000/twitter/api/hashtags/')
        .then(function (response) {
            // handle success
            console.log('hashtags updated ...');
            console.log(response.data);
            setHashtags(TweetDispatch,response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        
    }
    

    const AddHashtags = () =>{
        axios.post('http://127.0.0.1:8000/twitter/api/addhashtags/', {
            'newtweetId': twtId,
            
          })
          .then(function (response) {
              console.log(response.data);
              updateHashtags()
            
          })
          .catch(function (error) {
            console.log(error);
            
        });

    }
    
    const handleDelete = ()=>{
        Swal.fire({
            
            text: "آیا از حذف توییت اطمینان داردید؟",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'حذف توییت',
            cancelButtonText : 'انصراف'
          }).then((result) => {
              
            if (result.isConfirmed) {
                    axios.delete('http://127.0.0.1:8000/twitter/api/tweets/', {
                        data:{'twtId':twtId}
                    
                    
                    })
                    .then(function (response) {
                        
                        let current_tweets = (tweets.filter((item => item.id !== twtId)));
                        
                        setTweets(TweetDispatch,current_tweets)
                        if(tweet.includes("#")){
                                
                            updateHashtags()
                        }
                        
                    
                        setisToggled(false)
                    })
                   
                    .catch(function (error) {
                        console.log(error);
                    });

                    Swal.fire({
                    text : 'توییت مورد نظر با موفقیت حذف گردید',
                    icon: 'success',
                    confirmButtonText: 'تایید',

                    })
                    
                
                }
          })
        
        
        

    }
    
    const handleEditcomment = () =>{
        Swal.fire({
            input: 'textarea',
            
            icon:'info',
            inputLabel: 'توییت خود را ویرایش کنید :',
            inputValue: tweet,
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true,
            confirmButtonText: 'ویرایش',
            cancelButtonText : 'انصراف',
            confirmButtonColor:'#099e45',
            cancelButtonColor: '#d33',
        }).then((result)=>{
            if (result.isConfirmed){
                console.log(result.value);
                if(result.value === tweet){
                    Swal.fire({
                        icon: 'error',
                        text: 'توییت شما ویرایش نگردید ...',
                        confirmButtonText: 'تایید',
                      })
                      
                      setisToggled(false)
                    
                
                    }else{
                        axios.post('http://127.0.0.1:8000/twitter/api/edit-comment/',{
                            'twtId':twtId,
                            'new_text':result.value
                        }).then(function (response){
                            console.log(response.data);
                            if(result.value.includes("#")){
                                
                                AddHashtags()
                            }
                            const found_index = tweets.findIndex((item)=>item.id===twtId);
                            const edited_data = [...tweets.slice(0,found_index),{...tweets[found_index],'Text':result.value},...tweets.slice(found_index+1)]
                            setTweets(TweetDispatch,edited_data)
                            
                            
                            Swal.fire({
                                icon:'success',
                                text:'توییت شما با موفقیت ویرایش گردید ',
                                confirmButtonText: 'تایید',
                            })
                            setisToggled(false)

                        }).catch(function (error) {
                            console.log(error);
                        });
                    
                }

            }
            
        })
    }
    const retweet_action_handler = ()=>{
        console.log(retweetFlag);
        
        retweet_actin.current.classList.toggle('show-retweet-choice')
    }
    return (
        
        <div className={"tweets"} ref={tweet_Body}>
                {retweetFlag && <div className='retweetFlag'>
                    <span style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color}}>{retweetIcon}</span>
                    <p style={{fontSize:'10px',color:IsLightTheme?'rgb(83, 100, 113)':dark.color}}> {retweetFlag.Fullname} باز نشر کرد</p>
                   
                    
                    </div>}
                <div className={"tweet-header"} style={{color:IsLightTheme?light.color:dark.color}} >
                    <Link to={'/username/'+id}>
                        <img src={image} alt={'avatar'} className={"avatar"}></img>

                    </Link>
                    
                    
                    <p className={IsLightTheme?'tweet-header-fullname':'tweet-header-fullname-dark'}>{username}</p>
                    <p className={IsLightTheme?'tweet-header-id':'tweet-header-id-dark'}>@{id}</p>
                    
                    
                    <div className='hidden-icons' title="more">
                        <i  className="material-icons" onClick={showHiddenicons}>more_horiz</i>
                        <div className={'hidden'} style={{display: isToggled && 'block'}}>
                            <span className="material-icons">bookmark_border</span>
                            {checkPermissions && <span className="material-icons" onClick={handleEditcomment}>create</span> }
                            {checkPermissions && <span className="material-icons" onClick={handleDelete}>delete</span> }
                            
                            
                            

                        </div>
                        
                        
                        
                    </div>
                    
                    


                </div>
                <div className={"tweet-body"} style={{color:IsLightTheme?light.color:dark.color}}>
                {
                    tweet.split("\n").map((text)=>{
                        return(<div onClick={tweetDetails}  dangerouslySetInnerHTML={RenderTweet(text)}/>)
                    })
                }

                </div>
                
                
                
                
                {IsRetweet && <div onClick={checkRetweetInfo} className={IsLightTheme?'retweet-container':'retweet-container-dark'}>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <img src={retweets.tweet.sender.image} className={'retweet-usr'}></img>
                                <span style={{fontSize:'13px',color:IsLightTheme?'gray':dark.color}}>{retweets.tweet.sender.username}@</span>

                            </div>
                            
                            <br></br>
                            <p className={'retweet-body'} style={{color:IsLightTheme?light.color:dark.color}}>
                                {retweets.tweet.Text}

                            </p>
                            
                            
                </div>}
                {twtImg && <img src={twtImg} className={'twtImg'} style={{marginTop:'12px'}}></img>}
                <p onClick={e=>history.push('/tweet/'+twtId.toString()+'/likes')} className={"num_like"}>{heartIcon} <span ref={handleLike}>{likes}</span>    نفر پسندیده اند </p>
                <div className={"tweet-footer"} style={{color:IsLightTheme?'#111':dark.color}}>
                    <span><i class="material-icons download">file_download</i></span>
                    <span><i className="material-icons chat_bubble" onClick={commentBtn} >chat_bubble_outline</i></span>
                    <span>
                        {Liked_tweet && <i className={classnames("fa", 'fa-heart')}  onClick={likebtn}></i> }
                        {!Liked_tweet && <i className={classnames("fa", 'fa-heart-o')}  onClick={likebtn}></i> }

                    </span>
                    
                    
                    
                    
                    <span  className='retweet-icon-section'>
                        <i className={classnames("fa", "fa-retweet")} style={{color:IsRetweeted&&'#66CC66'}} onClick={retweet_action_handler} ref={retweet_btn}></i>
                        <div className='retweet-choices' ref={retweet_actin}>
                            {!IsRetweeted ?
                                <p onClick={retweetClick}>
                                    {retweetIcon}
                                    ریتوییت
                                
                                </p>
                                :
                                <p onClick={UndoRetweet}>
                                    {retweetIcon}
                            
                                    حذف ریتوییت
                            
                                </p>
                            }
                            
                            <p onClick={Quote_Tweet}>
                                {QuoteTweetIcon}
                                ریتویت با متن
                            </p>
                        </div>
                    </span>
                    
                    
                    
                </div>
                
                
        </div>
    )
}

export default Tweet;
