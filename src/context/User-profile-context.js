import React,{useState} from "react";
import { GetUserData} from "../api/api_tweet";
export const UserProfileContext = React.createContext()

export function UserProfileProvider({children}){
    const [user,SetUser] = useState([])
    const [objectData,setobjectData] = useState({})
    const[Ispending,setIspending] = useState(true)
    
    
    const handleUserData = (username)=>{
        
        GetUserData(username,(isOk,data)=>{
            if(!isOk){
                alert('مشکلی از سمت سرور پیش آمده ! اطلاعات کاربر مورد نظر دریافت نشد')
                return
            }
            SetUser(data[0])
            setobjectData(data[0])
            setIspending(false)
            console.log('user data updated ...');

        })
        
    }

    
    return(
        <UserProfileContext.Provider value={{...user,objectData,handleUserData,Ispending}}>
            {children}
        </UserProfileContext.Provider>
    )
}