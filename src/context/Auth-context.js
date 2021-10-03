import React,{useState} from "react";
import axios from 'axios'
export const AuthContext = React.createContext()

export function AuthContextProvider({children}){
    const [userData,SetUserData] = useState([])
    
    const[Ispending,setIspending] = useState(true)
    
    const FetchUserData = (token)=>{
        axios.post('http://127.0.0.1:8000/twitter/api/user-authentication/',{
            'access_token':token
        })
            .then(function (response) {
                
                // handle success
                SetUserData(response.data)
                
                setIspending(false)
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            
    }
    return(
        <AuthContext.Provider value={{...userData,Ispending,FetchUserData}}>
            {children}
        </AuthContext.Provider>
    )
}