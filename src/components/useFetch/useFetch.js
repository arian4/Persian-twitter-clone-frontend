import { useState ,useEffect} from 'react'
import axios from 'axios';
export default function useFetch(url) {
    const [data,setData] = useState([])
    const[ispending,setIspending] = useState(true)
    const [error,setError] = useState('')
    
    useEffect(() => {
        axios.get(url)
            .then(function (response) {
                
                // handle success
                // setTimeout(() => {
                //     setData(response.data)
                //     setIspending(false)
                // }, 1000);
                setData(response.data)
                setIspending(false)
                
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setError(error)
            })
            .then(function () {
                // always executed
            });
        
    }, [url])
    return {data , ispending , error }

    
}
