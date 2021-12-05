import React,{useContext,useRef,useState,useEffect} from 'react'
import VALIDATIONS from '../../constant/validation_types';
import validation from './validations';
import { ThemeContext } from '../../context/Theme-context';
import './input.css'



export default function Input({IsContentEditable,IsModalOpen ,input_label,InputValue,setInputValue,setButtonDisabled }) {
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const InputWrapperRef = useRef()
    
    
    const [Errors, setErrors] = useState(null)
    useEffect(() => {
        
        if (!IsModalOpen)setErrors(null)

    }, [IsModalOpen])
    
    const TestFocus = () =>{
        // InputWrapperRef.current.classList.remove('input-wrapper')
        InputWrapperRef.current.classList.add('selected-input')

    }
    const TestBlur = () =>{
        // if (!InputText)InputWrapperRef.current.classList.add('blank-error')
        InputWrapperRef.current.classList.remove('selected-input')
        let validate_input = validation([VALIDATIONS.REQUIRED,VALIDATIONS.LENGTH],InputValue)
        
        if (validate_input){
            setErrors(validate_input)
            setButtonDisabled(true)
        }
        else{
            setErrors(null)
            setButtonDisabled(false)
        }
        
        

    }
   
    
    return (
        <>
            <div ref={InputWrapperRef} className={IsContentEditable?'input-Editable':'input-wrapper'} wrapper-label = {input_label}>
                <input
                    style={{color:IsLightTheme?light.color:dark.color}}
                    value={InputValue}
                    onFocus={TestFocus} 
                    onBlur={TestBlur} 
                    onChange={(e)=>setInputValue(e.target.value)} 
                    className='inner-input'
                />

            </div>
            {Errors &&
                Errors.map((err,index )=>{
                    return <li key={index} style={{color:'tomato',margin:'10px 20px',fontSize:'12px'}}> {input_label} {err}</li>
                })
            }
        </>
        
        
    )
}
