import React, { useContext ,useState} from 'react';
import { getAuth, signOut } from "firebase/auth"
import {useHistory} from 'react-router-dom'

import { getFirestore,collection,getDocs } from 'firebase/firestore'

import './Header.css';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../stores/FirebaseContext';
import { FirebaseContext } from '../../stores/FirebaseContext';
import { SearchContext } from '../../stores/SearchContext';
function Header() {

  const [query,setQuery]=useState(null)
  const {user}=useContext(AuthContext)
  const Firebase=useContext(FirebaseContext)
  const history=useHistory()
  const {setResults}=useContext(SearchContext)

  const db=getFirestore(Firebase)

  const fetchResults=()=>{
    const getData = async () =>{
      const querySnapshot = await getDocs(collection(db, "products"));
      const dataa=[]
      querySnapshot.forEach((doc) => {
         dataa.push({...doc.data(),id:doc.id})
  
      });
      setResults(dataa.filter(obj=>obj.category.toLowerCase().includes(query.toLowerCase())||obj.name.toLowerCase().includes(query.toLowerCase())))
      
      
     }
     getData()
  }
  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <span className='market-logo'>E-Market</span>
        </div>
        
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              onChange={(e)=>{
                setQuery(e.target.value)
              }}
            />
          </div>
          <div onClick={()=>{
            {fetchResults()}
            
           if(query){
            history.push(`/search/${query}`)
           }else {
            history.push('/')
           }
            
            
          }} className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          
        </div>
        <div className="loginPage">
          <span onClick={()=>{history.push('/login')}} className="user-name">{user ? user.displayName : 'Login'}</span>
          <hr />
          
        </div>
        {user&&<span className='logout-btn' onClick={()=>{
          const auth=getAuth(Firebase)
          signOut(auth).then(()=>{history.push('/login')})

        }}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{history.push('/create')}}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
