import React,{useRef,useContext} from 'react'
import './css/modals.css'
import { AuthContext } from './../../context/Auth-context';
import { useHistory } from 'react-router-dom';

export default function CommentModal({IsOpen,setIsOpen,ModalData,setModalData}) {
    const history = useHistory()
    const ModalContainer = useRef()
    
    
    
    const {image:loggedInUserImage} = useContext(AuthContext)

    // const [TweetText, setTweetText] = useState('')
    
    const DismissModal = (e) =>{
        // console.log('Dismiss ...')
        let modal = ModalContainer.current
        if(e.target == modal) {
            setIsOpen(false)
            setModalData({})
            // setRetweet(TweetDispatch ,'')
        }
            
           
    }
    
    const closeModal = () =>{
        setIsOpen(false)
        setModalData({})
        // setRetweet(TweetDispatch ,'')

    }

    const displayTargetUser = () =>{
        
        history.push(`/username/${ModalData.username}`)
        setIsOpen(false)
        setModalData({})
    }
    
    return (
        <div ref = {ModalContainer}
            onClick = {DismissModal} 
            className="modal-container" 
            id="modal-container" 
            style = {{display : IsOpen ? 'block':'none'}}
         >
                
            <div className="modal" id="modal">
                <div className="target-tweet">
                    <div className = {'modal-header'}>
                        
                        <img src={ModalData.image} alt="user-retweet" className="user-image-modal" />
                        <p className={'m-fullname'}>{ModalData.Fullname}</p>
                        <p className={'m-username'}>@{ModalData.username}</p>

                    </div>
                    
                    <div className="target-content">
                        {ModalData.text}
                    </div>

                </div>
                <p style ={{marginRight:'3rem',fontSize:'11px'}}>پاسخ دادن به :  
                    <span style={{color:'royalblue',marginRight:'4px',cursor:'pointer'}} onClick ={displayTargetUser}>@{ModalData.username}</span>
                </p>
                <div className="modal-body">
                    <img src={loggedInUserImage} alt="user-image" className="user-image-modal" />
                    <textarea className="tweet-textarea" placeholder="توییت کنید ..."></textarea>
                </div>
                <div className="modal-footer">
                    <button className="add-tweet">توییت جدید</button>
                    <button className="cancle-tweet" id="cancle-tweet" onClick={closeModal}>انصراف</button>
                </div>

            </div>
        </div>
        
    )
}
