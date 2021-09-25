import React,{useState} from "react";
export const ThemeContext = React.createContext()

export function ThemeProvider({children}) {
    

    const [Theme,setTheme] = useState({
    
        IsLightTheme : localStorage.getItem('IsLightTheme')==='true'? true: false,
        light : {backgroundColor:'#fff',color:'#111'},
        dark : {backgroundColor:'rgba(54, 54, 54, 1)',color:'#adbac7'}
        
    })
    const Reset=()=>{
        setTheme(prevState => ({
            ...prevState,
            IsLightTheme: true
        }))

    }
    const ToggleTheme =()=>{
        if(Theme.IsLightTheme){
            
            setTheme(prevState => ({
                ...prevState,
                IsLightTheme: false
            }))
            

        }else{
            
            setTheme(prevState => ({
                ...prevState,
                IsLightTheme: true
            }))
            

        }
        
        
        
        
        
        
    }
    
    
    
    return (
        <ThemeContext.Provider value={{...Theme,ToggleTheme,Reset}}>
            {children}
        </ThemeContext.Provider>
    );
}