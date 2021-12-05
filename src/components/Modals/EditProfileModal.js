import React,{useRef,useContext,useState, lazy} from 'react'
import './css/modals.css'
import './css/editprofile.css'
import { AuthContext } from './../../context/Auth-context';
import { ThemeContext } from './../../context/Theme-context';
import { CameraIcon, CloseIcon } from './../../pages/Home/icons';
import Input from '../Input/Input';
import UploadMedias from '../../utilities/UploadMedias';
import { EditProfileRequest } from '../../api/api_tweet';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../../context/User-profile-context';


export default function EditProfileModal({IsOpen,setIsOpen}) {
    const token = localStorage.getItem('access_token')
    const {IsLightTheme,light,dark} = useContext(ThemeContext)
    const {Fullname,username,image:loggedInUserImage,header_image,FetchUserData} = useContext(AuthContext)
    const{handleUserData} = useContext(UserProfileContext)
    const ModalContainer = useRef()
    // ###########Image State ###########
    const [DefaultHeaderImage, setDefaultHeaderImage] = useState('/images/banner-default.jpg')
    const [userImage, setUserImage] = useState(loggedInUserImage)
    const [userImageFile, setuserImageFile] = useState(null)
    const [headerImageFile, setheaderImageFile] = useState(null)
    
    // ######### Input State ############
    const [ButtonDisabled, setButtonDisabled] = useState(false)
    const [NewFullname, setNewFullname] = useState(Fullname)
    const [NewUsername, setNewUsername] = useState(username)
    
    
    
    
    const DismissModal = (e) =>{
        // console.log('Dismiss ...')
        let modal = ModalContainer.current
        if (e.target == modal) {
            setIsOpen(false)
            setNewFullname(Fullname)
            setNewUsername(username)
            setDefaultHeaderImage(header_image?header_image:'/images/banner-default.jpg')
            setUserImage(loggedInUserImage)
            setButtonDisabled(false)
            
            
        }

    }
    const CloseModalHandler = () =>{
        setIsOpen(false)
        setNewFullname(Fullname)
        setNewUsername(username)
        setDefaultHeaderImage(header_image?header_image:'/images/banner-default.jpg')
        setUserImage(loggedInUserImage)
        setButtonDisabled(false)
        
    }

    const EditButton = () => {
        // console.log('Fullname :' , NewFullname)
        // console.log('username :' , NewUsername)
        // console.log('userImage :' , userImage)
        // console.log('HeaderImage :' , HeaderImage)
        const formData = new FormData()
        formData.append('Fullname',NewFullname)
        formData.append('username',NewUsername)
        if (userImageFile){
            formData.append('image',userImageFile)

        }
        if (headerImageFile){
            formData.append('header_image', headerImageFile)


        }
        
        EditProfileRequest(formData,username,(isOk)=>{
            if (!isOk){
                toast.error('حساب کاربری شما ویرایش نگردید')
                return
            }
            FetchUserData(token)
            handleUserData(username)
            setIsOpen(false)
            
            setTimeout(() => {
                toast.info('حساب کاربری شما ویراش گردید')
                
            }, 1200);
            
        })
    }
    
    
    
    
    
    return (
        <div ref = {ModalContainer}
            onClick = {DismissModal} 
            className="modal-container" 
            id="modal-container" 
            style = {{display : IsOpen ? 'block':'none'}}
         >
                
            <div className="modal" id="modal" style={{backgroundColor:IsLightTheme?light.backgroundColor:dark.backgroundColor}}>
                <div className='edit-modal-header'>
                    
                    <button disabled={ButtonDisabled} className='s-edit-profile-btn' onClick={EditButton}>ذخیره</button>
                    <span onClick={CloseModalHandler}>{CloseIcon}</span>
                    
                    
                </div>
                
                <div className="edit-modal-body">
                    <div className={'m-header-image-wrapper'}>
                        <img className='m-header-image' src = {header_image ? header_image: DefaultHeaderImage} alt = 'header-image' />
                        <UploadMedias   SvgIcon={CameraIcon} 
                                        SetImageState = {setDefaultHeaderImage} 
                                        setImageFile={setheaderImageFile} 
                        />

                    </div>
                    <div className='edit-user-image-wrapper' style={{backgroundImage:`url(${userImage})`}}>
                        
                        
                        <UploadMedias   SvgIcon = {CameraIcon} 
                                        SetImageState = {setUserImage} 
                                        setImageFile={setuserImageFile} /> 

                    </div>

                    <Input  IsContentEditable={true}
                            IsModalOpen = {IsOpen} 
                            input_label ={'نام و نام خانوادگی'} 
                            InputValue ={NewFullname} 
                            setInputValue={setNewFullname}
                            setButtonDisabled = {setButtonDisabled}
                    />
                    
                    <Input  IsContentEditable={true}
                            IsModalOpen = {IsOpen} 
                            input_label ={'نام کاربری'} 
                            InputValue ={NewUsername} 
                            setInputValue={setNewUsername}
                            setButtonDisabled = {setButtonDisabled}
                            
                    />
                    
                    
                    
                    
                    
                    

                    
                </div>
                
                
                
               
                

            </div>
        </div>
    )
}