import React,{useContext,useState,useEffect} from 'react';

import './View.css';
import { PostContext } from '../../stores/PostContext';
import { FirebaseContext } from '../../stores/FirebaseContext';
import { getFirestore,collection,query,where,getDocs } from 'firebase/firestore';
function View() {

  const {postDetails}=useContext(PostContext)
  const Firebase=useContext(FirebaseContext)

  const db=getFirestore(Firebase)
  
  const [userDetails,setUserDetails]=useState(null)

  useEffect(() => {
    const getData = async () =>{
      console.log('hai')
      const q = query(collection(db, "user"), where( "id", "==", postDetails.userId));
      const querySnapshot = await getDocs(q);
      const users=[]
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data())
        
  
      });
      
     }
     getData()
    
  }, [])
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        
        {userDetails&&<div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.name}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
