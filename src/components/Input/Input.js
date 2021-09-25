import React,{useState,useContext} from 'react'
import { ThemeContext } from '../../conext/Theme-context';
import './input.css'
import validation from './validations';

export default function Input({label,validations}) {
    const {IsLightTheme, dark, light} = useContext(ThemeContext)
    const[InputText,setInputText] = useState('')
    const[err,seterr] = useState(null)
    const ChangeInputHandler = (e)=>{
        setInputText(e.target.value)
        
        
    }
    const onBlurHandler = ()=>{
        
        seterr(validation(validations,InputText))
        

    }
    return (
        <div className='Input-container'>
            <label className={'Input-label'} style={{color:IsLightTheme?light.color:dark.color}}>{label} :</label>
            <input className={err?'Input-box-err':'Input-box'} value={InputText} onChange={ChangeInputHandler} onBlur={onBlurHandler} style={{backgroundColor:IsLightTheme?light.backgroundColor:'#282D33'}}/>
            {err &&
                err.map(e=>{
                    return(
                        <li className='error-text'>{label} {e}</li>
                    )
                })
            }
            
        </div>
    )
}
