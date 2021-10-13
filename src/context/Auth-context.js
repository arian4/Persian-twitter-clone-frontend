import React,{useState} from "react";
import { GetLoggedInUserData } from "../api/api_tweet";
export const AuthContext = React.createContext()

export function AuthContextProvider({children}){
    const [userData,SetUserData] = useState([])
    
    const[Ispending,setIspending] = useState(true)
    
    const FetchUserData = (token)=>{
        GetLoggedInUserData(token,(isOk,data)=>{
            if(!isOk){
                alert('مشکلی از سمت سرور پیش آمده ! اطلاعات کاربر مورد نظر دریافت نشد')
                return
            }
            
            SetUserData(data)
            setIspending(false)

        })
        
            
    }
    const LogOutUser = () =>{
        SetUserData([])
        localStorage.removeItem('access_token')
    }
    return(
        <AuthContext.Provider value={{...userData,Ispending,FetchUserData,LogOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}