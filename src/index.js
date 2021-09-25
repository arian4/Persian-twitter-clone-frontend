import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './conext/Auth-context';
import { ThemeProvider } from './conext/Theme-context';
import { TweetProvider } from './conext/TweetContext';
import { UserProfileProvider } from './conext/User-profile-context';


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

