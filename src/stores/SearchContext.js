import {createContext,useState} from 'react'

export const SearchContext=createContext(null)


export default function SearchCont ({children}){
    const [results,setResults]=useState([])

    return(
        <SearchContext.Provider value={{results,setResults}}>
            {children}
            

        </SearchContext.Provider>
    )}