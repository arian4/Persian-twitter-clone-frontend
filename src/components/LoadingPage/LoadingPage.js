import React,{useState} from 'react'
import HashLoader from 'react-spinners/HashLoader'

export default function LoadingPage() {
    const [color] = useState('#319FD9')
    const override ={
        display: 'block',
        
    }
    
    return (
        <div style={{backgroundColor:'#f2f2f2',height:'100vh'}}>
            <center>
                <div className='loading-Wrapper'>
                    <img src={'/images/twitter-logo.png'} width={100} height={100} style={{marginTop:'3rem'}} />
                    <h3 style={{margin:'2rem 0'}}> لطفا منتظر بمانید... </h3>

                    <HashLoader color={color} size={80} css={override} />

                </div>
                

            </center>
            
            
            
        </div>
    )
}
