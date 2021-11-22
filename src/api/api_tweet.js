import { getAxiosInstance } from "./api"


export const getAllTweets = (callback)=>{
    getAxiosInstance().get('tweets/')
    .then(response => {
        const data = response.data
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const getHomeFeed = (token,callback)=>{
    getAxiosInstance().get(`tweets/?sort_type=home`,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    .then(response => {
        const data = response.data
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}

export const getTweetById = (tweetId,callback)=>{
    getAxiosInstance().get(`tweets/?id=${tweetId}`)
    .then(response => {
        const data = response.data
        
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const getTweetByHashtag= (hashtag,callback)=>{
    getAxiosInstance().get(`tweets/?hashtag=${hashtag}`)
    .then(response => {
        const data = response.data
        
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const newTweetRequest = (data,callback)=>{
    getAxiosInstance().post('tweets/',data)
    .then(response => {
        const data = response.data
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const EditTweetRequest = (data,callback)=>{
    getAxiosInstance().patch('tweets/',data)
    .then(response => {
        const data = response.data
        console.log(data)
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false)
    })
}
export const DeleteTweetRequest = (tweetId,callback)=>{
    getAxiosInstance().delete('tweets/',{ data: { 'twtId': tweetId }})
    .then(response => {
        
        const data = response.data
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false)
    })
}
// ###################################################33
export const AddHashtags = (tweetId,callback)=>{
    getAxiosInstance().post('addhashtags/',{
        newtweetId : tweetId
    })
    .then(response => {
        // const data = response.data
        callback(true)
    })
    .catch(error =>{
        console.log(error);
        callback(false)
    })
}
export const updateHashtags = (callback)=>{
    getAxiosInstance().get('hashtags')
    .then(response => {
        const data = response.data
        callback(true,data)
        
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
//###################################################
export const getAllRetweets = (callback)=>{
    getAxiosInstance().get('retweets/')
    .then(response => {
        const data = response.data
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const getCurrentUserRetweetedMedias = (token,callback) =>{
    getAxiosInstance().get(`retweets/?sort_type=current-user-retweets`,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    .then(response => {
        const data = response.data
        console.log('data is : ' , data)
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })

}
export const newRetweetRequest = (data,user,callback)=>{
    getAxiosInstance().post('tweets/'+user,data)
    .then(response => {
        
        const response_data = response.data
        callback(true,response_data)
    })
    .catch(error =>{
        console.log(error);
        callback(false)
    })
}

export const DeleteRetweetRequest = (data,callback)=>{
    getAxiosInstance().delete('retweets/',{ data: data })
    .then(response => {
        console.log(response);
        // const status = response.status
        callback(true)
    })
    .catch(error =>{
        console.log(error);
        callback(false)
    })
}
// ##########################################################
export const getAllComments = (callback)=>{
    getAxiosInstance().get('comments/')
    .then(response => {
        const data = response.data
        console.log(response);
        // const status = response.status
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const NewCommentRequest = (token,data,callback)=>{
    getAxiosInstance().post('comments/',data,{headers:{
        Authorization: 'Bearer ' + token

    }})
    .then(response => {
        // console.log(response);
        // const status = response.status
        callback(true)
    })
    
    .catch(error =>{
        console.log(error);
        callback(false)
    })
}
//#####################################################
export const SearchResults = (callback)=>{
    getAxiosInstance().get('hashtags')
    .then(response => {
        const data = response.data
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}

export const getAllLikes = (callback)=>{
    getAxiosInstance().get('handlelike/')
    .then(response => {
        const data = response.data
        // console.log(data);
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const getCurrentUserLikedMedias = (token,callback) =>{
    getAxiosInstance().get(`handlelike/?sort_type=current-user-likes`,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    .then(response => {
        const data = response.data
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })

}
export const LikeTweetRequest = (data,callback)=>{
    getAxiosInstance().post('handlelike/',data)
    .then(response => {
        // console.log(response);
        const response_data = response.data
        callback(true,response_data)
    })
    
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const getAllUsers = (callback)=>{
    getAxiosInstance().get('users/')
    .then(response => {
        const data = response.data
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const GetUserData = (username,callback)=>{
    getAxiosInstance().get(`username/${username}`)
    .then(response => {
        const data = response.data
        // console.log(data);
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}

export const GetLoggedInUserData = (token,callback)=>{
    getAxiosInstance().post(`user-authentication/`,{'access_token':token})
    .then(response => {
        const data = response.data
        // console.log(data);
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const GetTopTweeters = (callback)=>{
    getAxiosInstance().get(`best-twitters/`)
    .then(response => {
        const data = response.data
        // console.log(data);
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}
export const getUser_Followers_OR_Followings = (username ,type,callback)=>{
    getAxiosInstance().get(`${username}/${type}`)
    .then(response => {
        const data = response.data
        // console.log(data);
        callback(true,data)
    })
    .catch(error =>{
        console.log(error);
        callback(false,error)
    })
}