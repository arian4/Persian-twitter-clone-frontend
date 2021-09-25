import React, { useState,useEffect,useContext} from 'react'
import { SearchResults } from '../../api/api_tweet';
import { ThemeContext } from '../../conext/Theme-context';
// import axios from 'axios';
import './search.css' 
import useDebounce from './useDebounce';
function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 1000)
    const [ShowResults, setShowResults] = useState(false)
    const {IsLightTheme} = useContext(ThemeContext)
    useEffect(
        () => {
          // Make sure we have a value (user has entered something in input)
          if (debouncedSearchTerm) {
            // Set isSearching state
            setIsSearching(true);
            // Fire off our API call
            
            SearchResults((isOk,data)=>{
                if(!isOk){
                   return alert('جستجو ناموفق ...')
                }
                setIsSearching(false);
                setShowResults(true)
                setResults(data.filter((item => item.hashtag.includes(searchTerm))));
            })
          } else {
            setShowResults(false)
            setResults([]);
          }
        },
        
        [debouncedSearchTerm]
    );
    const showResultWrapper = () =>{
        console.log('hello ...');
        setShowResults(true)
    }
    return (
        <div className='input-container' onClick={showResultWrapper}>
            
            
            <input className={IsLightTheme?'search-box':'search-box-dark'} placeholder='جستجو کنید ...' onChange={e => setSearchTerm(e.target.value)} ></input>
            
            {ShowResults &&
                <div className={IsLightTheme?'res-container':'res-container-dark'}>
                    {isSearching && <div className='loader'></div>}
                    <ul>
                        {results.length > 0 ?
                            results.map((result) =>{
                                return(
                                    <li># {result.hashtag}</li>
                                )
                            })
                            :<p style={{textAlign:'center',color:IsLightTheme?'#333':'#C8CBD2',fontSize:'12px',marginTop:'10px'}}>هشتگ ها , موضوعات , افراد را جستجو کنید</p>
                        }

                    </ul>
                
                
                </div>

            }
            
        
            
            
                        
        </div>
    )
}

export default Search
