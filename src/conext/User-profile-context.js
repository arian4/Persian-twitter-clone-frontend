import React,{useState} from "react";
import axios from 'axios'
export const UserProfileContext = React.createContext()

export function UserProfileProvider({children}){
    const [user,SetUser] = useState([])
    const [objectData,setobjectData] = useState({})
    const[Ispending,setIspending] = useState(true)
    
    const handleUserData = (username)=>{
        axios.get('http://127.0.0.1:8000/twitter/api/username/'+username)
            .then(function (response) {
                // handle success
                SetUser(response.data[0])
                setobjectData(response.data[0])
                setIspending(false)
                
                console.log('user data updated ...');
                // console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    return(
        <UserProfileContext.Provider value={{...user,objectData,handleUserData,Ispending}}>
            {children}
        </UserProfileContext.Provider>
    )
}