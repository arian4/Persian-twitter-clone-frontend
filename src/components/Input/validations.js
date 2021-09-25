const validation = (validations,text)=>{
    const res = []
    validations.map(validation=>{
        // console.log(validation.TYPE);
        switch (validation.TYPE) {
            case 'REQUIRED':
                if(!text){
                    
                    res.push(validation.REQUIRED_TEXT)
                    break
                    

                }else{
                    break
                }
                
                
            case 'LENGTH':
                if(text.length > 20){
                    
                    res.push(validation.MAX_LENGTH_TEXT)
                    break

                }else if(text.length<4){
                    
                    res.push(validation.MIN_LENGTH_TEXT)
                    break
                }else{
                    
                    break
                }
                
        
            
        }
        
    })
    if(res.length>0){
        return res
    }else{
        return null
    }
    

}

export default validation