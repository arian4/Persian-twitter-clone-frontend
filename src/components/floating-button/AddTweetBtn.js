import React from 'react'
import  { Link, useHistory} from 'react-router-dom'
import { NewtweetIcon } from '../../pages/Home/icons'

import './addtweetbtn.css'
export default function AddTweetBtn() {
    const history = useHistory()
    return (
        <>
            <button onClick={e=>history.push('/compose/tweet')} className='float'>
                {NewtweetIcon}
                {/* <i class="material-icons" style={{marginTop:'5px'}}>add</i> */}
            </button>
            
        </>
    )
}
