import React,{useRef} from 'react'

export default function UploadMedias({SvgIcon,SetImageState,setImageFile}) {
    const InputFile = useRef()
    
    const UploadImageClick = () => InputFile.current.click()
    
    const HandleImageChange = (e) =>{
        let reader = new FileReader();
        reader.onload =()=>{
            let dataURL = reader.result;
            SetImageState(dataURL)
            
           

        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            setImageFile(e.target.files[0])
        }

    }
    return (
        <>
            <span onClick ={UploadImageClick}>{SvgIcon}</span>
            <input ref={InputFile} type={'file'} style={{display:'none'}} onChange={HandleImageChange} />
            
        </>
    )
}
