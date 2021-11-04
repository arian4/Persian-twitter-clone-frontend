import React from "react";

var TweetStateContext = React.createContext();
var TweetDispatchContext = React.createContext();

function TweetReducer(state, action) {
  switch (action.type) {
    case "setTweets":
      return {...state, tweets: action.payload};
    case "setnewTweets":
      return {...state, newtweet: action.payload};
    
    case "GET_RETWEET_DATA":
      return {...state, All_Retweets: action.payload};
    case "GET_LIKES_DATA":
      return {...state, All_Likes: action.payload};
    case "GET_Hashtags":
      return {...state, hashtags: action.payload};
    
      case "setRetweet":
      return {...state, retweet: action.payload};
    
    
    // case "plusNum":
    //   return {...state, counter: state.counter + parseInt(action.payload)};
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TweetProvider({children}) {
  var [state, dispatch] = React.useReducer(TweetReducer, {
    newtweet: '',
    retweet:'',
    tweets:[],
    All_Retweets :[],
    All_Likes:[],
    hashtags:[],
    
    
  });
  return (
    <TweetStateContext.Provider value={state}>
      <TweetDispatchContext.Provider value={dispatch}>
        {children}
      </TweetDispatchContext.Provider>
    </TweetStateContext.Provider>
  );
}

function useTweetState() {
  var context = React.useContext(TweetStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useTweetDispatch() {
  var context = React.useContext(TweetDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export {TweetProvider, 
        useTweetState, 
        useTweetDispatch,
        setnewTweets,
        setTweets,
        setHashtags,
        setRetweet,
        setRetweetsData,
        setLikesData
      };

// ###########################################################


function setnewTweets(dispatch, text) {
  dispatch({
    type: "setnewTweets",
    payload: text
  });
}

function setRetweet(dispatch, text) {
  dispatch({
    type: "setRetweet",
    payload: text
  });
}

function setTweets(dispatch, data) {
  dispatch({
    type: "setTweets",
    payload: data
  });
}
function setRetweetsData(dispatch , data){
  dispatch({
    type : 'GET_RETWEET_DATA',
    payload : data
  })
}

function setLikesData(dispatch , data){
  dispatch({
    type : 'GET_LIKES_DATA',
    payload : data
  })
}

function setHashtags(dispatch, data) {
  dispatch({
    type: "GET_Hashtags",
    payload: data
  });
}

