import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './conext/Auth-context';
import { ThemeProvider } from './context/Theme-context';
import { TweetProvider } from './context/TweetContext';
import { UserProfileProvider } from './context/User-profile-context';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <TweetProvider>
          <UserProfileProvider>
            <App />

          </UserProfileProvider>
          

        </TweetProvider>

      </ThemeProvider>

    </AuthContextProvider>
    
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

