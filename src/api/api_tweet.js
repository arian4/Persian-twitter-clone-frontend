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

export const newTweetRequest = (data,callback)=>{
    getAxiosInstance().post('tweets/',data)
    .then(response => {
        const data = response.data
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
export const newRetweetRequest = (data,user,callback)=>{
    getAxiosInstance().post('tweets/'+user,data)
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
export const NewCommentRequest = (data,callback)=>{
    getAxiosInstance().post('comments/',data)
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