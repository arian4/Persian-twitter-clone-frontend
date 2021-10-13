import React,{useState} from 'react'
import HashLoader from 'react-spinners/HashLoader'
import { LogoIcon } from '../../pages/Home/icons'
export default function LoadingPage() {
    const [color] = useState('#319FD9')
    const override ={
        display: 'block',
        
    }
    
    return (
        <div style={{backgroundColor:'#f2f2f2',height:'100vh'}}>
            <center>
                <div className='loading-Wrapper'>
                    {LogoIcon}
                    <h3 style={{margin:'2rem 0'}}> لطفا منتظر بمانید... </h3>

                    <HashLoader color={color} size={80} css={override} />

                </div>
                

            </center>
            
            
            
        </div>
    )
}
