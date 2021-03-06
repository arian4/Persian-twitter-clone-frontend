import React, {useRef,useState,useContext,useEffect } from 'react'
import  { Link, useHistory,useLocation} from 'react-router-dom'
import classnames from 'classnames'
import { useTweetDispatch,setRetweet, useTweetState,setTweets,setHashtags, setRetweetsData, setLikesData } from '../../context/TweetContext';
import Swal from 'sweetalert2'
import { ThemeContext } from '../../context/Theme-context';
import './homecss/tweet.css'
import {QuoteTweetIcon, retweetIcon } from './icons';
import { DeleteRetweetRequest, EditTweetRequest, getCurrentUserRetweetedMedias, LikeTweetRequest, newRetweetRequest } from '../../api/api_tweet';
import { AuthContext } from './../../context/Auth-context';
import { DeleteTweetRequest, updateHashtags } from './../../api/api_tweet';
import RetweetModal from '../../components/Modals/RetweetModal';
import CommentModal from '../../components/Modals/CommentModal';
import { toast } from 'react-toastify';


function Tweet({twtId,
                id,
                username,
                image,
                tweet,
                twtImg,
                tweetActions,
                IsRetweet,
                retweets,
                retweetFlag,}) {

    const history = useHistory()
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const {pathname} = useLocation()
    // const {Theme} = useContext(ThemeContext)
    const {username:current_user_username} = useContext(AuthContext)
    const RenderTweet =(text)=>{
    
        
        
    return {__html: text.replace(/#\S+/g,function( matchedString){
        const noSymbol = matchedString.slice(1)
        return '<a href=/hashtags/'+noSymbol.toString() +' '+ 'class="hashtag">'+matchedString+'</a>'
    }).replace(/(?<=^|(?<=[^a-zA-Z0-9-_\.]))@([A-Za-z]+[A-Za-z0-9-_]+)/g,function( matchedString){
        const noSymbol = matchedString.slice(1)
        return '<a href=/username/'+noSymbol.toString() +' '+ 'class="mention">'+matchedString+'</a>'
    })}
    };
    const {retweet,All_Retweets , All_Likes , tweets} = useTweetState()
    const TweetDispatch = useTweetDispatch()
    
    const retweet_actin = useRef()
    const retweet_btn = useRef()
    const tweet_Body = useRef()
    
    
    const Related_Retweets = All_Retweets.filter((item)=>item.tweet.id === twtId)
    const Related_Likes = All_Likes.filter((item) => item.tweet === twtId)
    
    const [tweetText, SetTweetText] = useState(tweet)
    const [numLikes, SetnumLikes] = useState(tweetActions.numLikes)
    const [numRetweets, SetnumRetweets] = useState(tweetActions.numRetweets)
    const [numComments, SetnumComments] = useState(tweetActions.numComments)
    const [checkPermissions,setcheckPermissions] = useState(false)
    const [isToggled,setisToggled] = useState(false)
    
    const [Modal_IsOpen, setModal_IsOpen] = useState(false)
    const [CommentModal_IsOpen, setCommentModal_IsOpen] = useState(false)
    const [CommentModalData, setCommentModalData] = useState({})
    
    useEffect(() => {

        SetnumLikes(tweetActions.numLikes)
        SetnumRetweets(tweetActions.numRetweets)
        SetnumComments(tweetActions.numComments)
        SetTweetText(tweet)

    }, [JSON.stringify(tweetActions),tweet])
    
    
    
    const likebtn = (e) =>{
        
        
        if(e.target.classList.value==='fa fa-heart-o'){
            // setlike('fa-heart')
            e.target.classList.value = 'fa fa-heart'
            SetnumLikes(prev => prev + 1)
            
            
            
        }else{
            // setlike('fa-heart-o')
            e.target.classList.value = 'fa fa-heart-o'
            SetnumLikes(prev => prev - 1)
            
            
        }
        
        const token  = localStorage.getItem('access_token')
        const LikeformData = new FormData()
        LikeformData.append('twtId',twtId)
        LikeformData.append('access_token',token)
        
        LikeTweetRequest(LikeformData,(isOk,data)=>{
            if(!isOk){
                if(e.target.classList.value==='fa fa-heart-o'){
                    // setlike('fa-heart')
                    e.target.classList.value = 'fa fa-heart'
                    SetnumLikes(prev => prev + 1)
                    
                }
                else{
                    // setlike('fa-heart-o')
                    e.target.classList.value = 'fa fa-heart-o'
                    SetnumLikes(prev => prev - 1)
                }
                return

            }
            
            setLikesData(TweetDispatch,data)
            
        })
        
        
    }

    const kFormatter = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    

    const Quote_Tweet = () =>{
        const data = {}
        data['retweet_id'] = twtId
        data['tweetImage'] = twtImg ? twtImg :null
        data['text'] = tweet
        data['image'] = image
        data['username'] = id
        console.log(data);
        retweet_actin.current.classList.toggle('show-retweet-choice')
        // pathname == '/' ? console.log('Pathname : Home') : console.log('Another')
        setRetweet(TweetDispatch,data)
        
        pathname == '/' ? document.getElementsByClassName('main')[0].scrollTop = 0 : setModal_IsOpen(true)
        
    }
    
    const retweetClick = () =>{
        retweet_btn.current.style.color = '#66CC66'
        SetnumRetweets(prev => prev + 1)
        retweet_actin.current.classList.toggle('show-retweet-choice')
        const formData = new FormData()
        formData.append('tweet_id',twtId)
        
        newRetweetRequest(formData,current_user_username,(isOk,data)=>{
            if(!isOk){
                retweet_btn.current.style.color = '#111'
                SetnumRetweets(prev => prev - 1)
                toast.error('?????????? ?????? ???????? . ?????????????? ?????? ?????????? ??????')
                return
                
            }
            setRetweetsData(TweetDispatch,data)
            toast.info('?????????????? ?????? ?????? ??????????')
        })
        
        
    }
    const UndoRetweet = ()=>{
        retweet_actin.current.classList.toggle('show-retweet-choice')
        retweet_btn.current.style.color = IsLightTheme?'#111':dark.color
        SetnumRetweets(prev => prev - 1)
        const formData = new FormData()
        let [{id :retweetId}] = Related_Retweets

        formData.append('retweet_id',retweetId)
        DeleteRetweetRequest(formData,(isOk)=>{
            if(!isOk){
                tweet_Body.current.style.display = 'block'
                retweet_btn.current.style.color = '#66CC66'
                SetnumRetweets(prev => prev + 1)
                toast.error('?????????????? ?????? ?????? ???????????? . ???????? ?????????? ???????? ???????? ')
                return

            }
            getCurrentUserRetweetedMedias(localStorage.getItem('access_token'),(isOk,data)=>{
                if (!isOk){
                    toast.error('?????????? ???? ?????????????? ???????????? ???? ???????? ?????? ???????? . ?????????????? ???? ???????????? ??????????')
                    return

                }
                
                setRetweetsData(TweetDispatch , data)
                retweetFlag ? 
                        setTimeout(() => {
                            toast.info('?????????????? ?????? ?????? ??????????')
                            tweet_Body.current.style.display = 'none'

                            
                        }, 1500)
                        :toast.info('?????????????? ?????? ?????? ??????????')
            })
            
            
        })

    }
    const commentBtn = () =>{
        const comment_data = {}
        comment_data['tweetId'] = twtId
        comment_data['Fullname'] = username
        comment_data['username'] = id
        comment_data['text'] = tweetText
        comment_data['image'] = image
        setCommentModalData(comment_data)
        setCommentModal_IsOpen(true)
        
        
        
    }
    const tweetDetails = (e)=>{
        console.log('tweet body clicked ... ');
        if(!e.target.classList.contains('mention') && !e.target.classList.contains('hashtag')){
            console.log('Just tweet body ... ');
            history.push('/tweet/status/'+twtId.toString())

        }
        
    }

    
    const showHiddenicons = ()=>{
        
        
        
        !isToggled ? setisToggled(true) : setisToggled(false)
        
        
        
        if (current_user_username==id){
            setcheckPermissions(true)
        }
        
        

    }
    const checkRetweetInfo = ()=>{
        
        history.push('/tweet/status/'+retweets.tweet.id)
    }
    
    

    
    
    const handleDelete = ()=>{
        Swal.fire({
            
            text: "?????? ???? ?????? ?????????? ?????????????? ????????????",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '?????? ??????????',
            cancelButtonText : '????????????'
          }).then((result) => {
              
            if (result.isConfirmed) {
                DeleteTweetRequest(twtId , (isOk)=>{
                    if(!isOk){
                        Swal.fire({
                            text:"?????????? ???????? ?????? ?????? ???????????? !!!",
                            icon:'error',
                            confirmButtonText:'?????????? ??????!',
                            confirmButtonColor:'tomato'
                        })
                        return
                    }
                    // console.log(tweets)
                    
                    let current_tweets = (tweets.filter((item => item.id !== twtId)));
                    setTweets(TweetDispatch,current_tweets)

                    if(tweet.includes("#")){
                                
                        updateHashtags((isOk,data)=>{
                            if(!isOk){
                                alert('?????????? ???? ?????????????????? ???????? ???? ?????? ???????? !')
                                return
                            }
                            setHashtags(TweetDispatch,data)
                        })
                    }
                    setisToggled(false)

                    Swal.fire({
                        text : '?????????? ???????? ?????? ???? ???????????? ?????? ??????????',
                        icon: 'success',
                        confirmButtonText: '??????????',
    
                    })
                })
                
                    
                
                }
          })
        
        
        

    }
    
    const handleEditcomment = () =>{
        Swal.fire({
            input: 'textarea',
            
            icon:'info',
            inputLabel: '?????????? ?????? ???? ???????????? ???????? :',
            inputValue: tweet,
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true,
            confirmButtonText: '????????????',
            cancelButtonText : '????????????',
            confirmButtonColor:'#099e45',
            cancelButtonColor: '#d33',
        }).then((result)=>{
            if (result.isConfirmed){
                console.log(result.value);
                if(result.value === tweet){
                    Swal.fire({
                        icon: 'error',
                        text: '?????????? ?????? ???????????? ???????????? ...',
                        confirmButtonText: '??????????',
                      })
                      
                      setisToggled(false)
                    
                
                    }else{
                        const EditformData = new FormData()
                        EditformData.append('id' , twtId)
                        EditformData.append('Text',result.value)
                        EditTweetRequest(EditformData,(isOk,data)=>{
                            if(!isOk){
                                Swal.fire({
                                    icon: 'error',
                                    text: '?????????? ???? ?????? ???????? ???? ???????? ?????????? ?????? ?????????? ??????!!!',
                                    confirmButtonText: '??????????',
                                })
                                return

                            }
                            // console.log(data.data.Text)
                            SetTweetText(data.data.Text)
                            

                            Swal.fire({
                                icon:'success',
                                text:'?????????? ?????? ???? ???????????? ???????????? ?????????? ',
                                confirmButtonText: '??????????',
                            })
                            setisToggled(false)
                            
                        })
                        
                    
                }

            }
            
        })
    }
    const retweet_action_handler = ()=>{
        
        retweet_actin.current.classList.toggle('show-retweet-choice')
    }
    
    return (
        
        <div className={"tweets"} ref={tweet_Body}>
                
                <RetweetModal IsOpen ={Modal_IsOpen} setIsOpen ={setModal_IsOpen} ModalData ={retweet}  />
                <CommentModal IsOpen ={CommentModal_IsOpen} setIsOpen ={setCommentModal_IsOpen} ModalData ={CommentModalData} setModalData={setCommentModalData} SetnumComments={SetnumComments}/>
                {retweetFlag && <div className='retweetFlag'>
                    <span style={{color:IsLightTheme?'rgb(83, 100, 113)':dark.color}}>{retweetIcon}</span>
                    <p style={{fontSize:'10px',color:IsLightTheme?'rgb(83, 100, 113)':dark.color}}> {retweetFlag.Fullname} ?????? ?????? ??????</p>
                   
                    
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
                    tweetText.split("\n").map((text)=>{
                        return(<div onClick={tweetDetails} dangerouslySetInnerHTML={RenderTweet(text)}/>)
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
                            <a className={'image-link'} href={retweets.tweet.image} target={'_blank'}>{retweets.tweet.image}</a>
                            
                            
                </div>}
                {twtImg && <img src={twtImg} className={'twtImg'} style={{marginTop:'12px'}}></img>}
                {/* <p onClick={e=>history.push('/tweet/'+twtId.toString()+'/likes')} className={"num_like"}>{heartIcon} <span ref={handleLike}>{likes}</span>    ?????? ?????????????? ?????? </p> */}
                <div className={"tweet-footer"} style={{color:IsLightTheme?'#111':dark.color}}>
                    
                    <span className ={'download-icon-section icon-section'}>
                        <i class="material-icons download">file_download</i>
                        
                    </span>
                    
                    <span className ={'comment-icon-section icon-section'}>
                        <i className="material-icons chat_bubble" onClick={commentBtn} >chat_bubble_outline</i>
                        <span style={{color:IsLightTheme?'#111':dark.color}}>{numComments}</span>
                    </span>
                    
                    <span className ={'like-icon-section icon-section'}>
                        {
                            Related_Likes.length > 0 ? <i className={classnames("fa", 'fa-heart')}  onClick={likebtn}/> : <i className={classnames("fa", 'fa-heart-o')}  onClick={likebtn}/> 
                        }
                        
                        <span style={{color:IsLightTheme?'#111':dark.color}} onClick = {e=>history.push(`/tweet/${twtId.toString()}/likes`)}>{kFormatter(numLikes)}</span>

                    </span>
                    
                    
                    
                    
                    <span  className='retweet-icon-section icon-section'>
                        <i className={classnames("fa", "fa-retweet")} style={{color:Related_Retweets.length > 0 ? '#66CC66':IsLightTheme?light.color:dark.color}} onClick={retweet_action_handler} ref={retweet_btn}></i>
                        <span style={{color:IsLightTheme?'#111':dark.color}}>{numRetweets}</span>
                        <div className={IsLightTheme?'retweet-choices':'retweet-choices-dark'} ref={retweet_actin}>
                            {(Related_Retweets.length === 0) ?
                                <p onClick={retweetClick}>
                                    {retweetIcon}
                                    ??????????????
                                
                                </p>
                                :
                                <p onClick={UndoRetweet}>
                                    {retweetIcon}
                            
                                    ?????? ??????????????
                            
                                </p>
                            }
                            
                            <p onClick={Quote_Tweet}>
                                {QuoteTweetIcon}
                                ???????????? ???? ??????
                            </p>
                        </div>
                    </span>
                    
                    
                    
                </div>
                
                
        </div>
    )
}

export default Tweet;
