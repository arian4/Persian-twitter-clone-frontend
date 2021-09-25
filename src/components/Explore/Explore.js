import React,{useContext,useEffect} from 'react'
import { ThemeContext } from '../../conext/Theme-context'
import { useHistory } from 'react-router-dom'
import Header from '../../pages/Home/header'
import useFetch from '../useFetch/useFetch'
import './explore.css'
export default function Explore() {
    const history = useHistory()
    const {data:Trends , ispending , error } = useFetch('http://127.0.0.1:8000/twitter/api/hashtags')
    const {IsLightTheme, dark} = useContext(ThemeContext)
    useEffect(() => {
        console.log('Explore ...');
    }, [])
    return (
        <div className='main'>
            {console.log(Trends)}
            <Header title={'هشتگ های پربازدید'} icon={'/images/hashtag.png'} />
            {error && <p style={{'color':'red'}}>{error}</p>}
            {ispending && <div className='loader'></div>}
            {!ispending && Trends.map(trend =>{
                return(
                    <div className={IsLightTheme?'hashtags-trend':'hashtags-trend-dark'} onClick={e=>history.push(`/hashtags/${trend.hashtag}`)}>
                        <p className='trend-hashtag-name' style={{color:IsLightTheme?'#111':dark.color}}>#{trend.hashtag}</p>
                        <p className='trend-hashtag-count' style={{color:IsLightTheme?'gray':dark.color}}>{trend.count} توییت</p>
                

                    </div>

                )
                

            })
            }
            
            <div className='hashtags-trend'>
                

            </div>
        </div>
    )
}
