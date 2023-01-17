import { getFirestore } from 'firebase/firestore'
import React,{useEffect,useState,useContext} from 'react'
import { useParams ,useHistory} from 'react-router-dom'

import Heart from '../../assets/Heart'
import { FirebaseContext } from '../../stores/FirebaseContext'
import { PostContext } from '../../stores/PostContext'
import { SearchContext } from '../../stores/SearchContext'



function SearchPost() {
    const [searchedProducts,setSearchedProducts]=useState([])

    const Firebase=useContext(FirebaseContext)
    

    const {results} =useContext(SearchContext)
    const {setPostDetails}=useContext(PostContext)
    const {id}=useParams()
    const history=useHistory()

    console.log(results)
    


     
  return (
    <div>
        <div className="moreView">
        <div className="heading">
          
         <span>{results.length>0 ? `Showing result for ${id}`:"Sorry... we didn't find anything that matches this search "}</span>
         <span>View more</span>
        </div>
        <div className="cards">
          
          {results.map((result)=>{
            return(
              <div onClick={()=>{
                setPostDetails(result)
                history.push('/view')
              }} className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={result.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {result.price}</p>
              <span className="kilometer">{result.category}</span>
              <p className="name"> {result.name}</p>
            </div>
            <div className="date">
              <span>{result.createdAt}</span>
            </div>
          </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default SearchPost