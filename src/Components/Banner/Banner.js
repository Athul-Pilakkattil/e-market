import React from 'react';
import { getFirestore,collection,getDocs } from 'firebase/firestore';
import {useHistory} from 'react-router-dom'

import './Banner.css';
import Arrow from '../../assets/Arrow'
import { useContext, useState } from 'react';
import { FirebaseContext } from '../../stores/FirebaseContext';
import { SearchContext } from '../../stores/SearchContext';
function Banner() {
  
  const Firebase=useContext(FirebaseContext)
  const db=getFirestore(Firebase)
  const {setResults}=useContext(SearchContext)
  const history=useHistory()

  const fetchResults=(query)=>{
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
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>CATEGORIES</span>
             
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>{
              {fetchResults("car")}
              history.push(`/search/cars`)
            }}>Cars</span>

            <span onClick={()=>{
              {fetchResults("bike")}
              history.push(`/search/Motorcycles`)
            }}>Motorcy...</span>

            <span onClick={()=>{
              {fetchResults("mobile")}
              history.push(`/search/MobilePhone`)
            }}>Mobile Ph...</span>

            <span onClick={()=>{
              {fetchResults("houses")}
              history.push(`/search/Houses and Apartments`)
            }}>For Sale:Houses & Apart...</span>

            <span onClick={()=>{
              {fetchResults("two wheeler")}
              history.push(`/search/scooter`)
            }}>Scoot...</span>

            <span onClick={()=>{
              {fetchResults("car")}
              history.push(`/search/Commercial & Other Ve...`)
            }}>Commercial & Other Ve...</span>

            <span onClick={()=>{
              {fetchResults("houses")}
              history.push(`/search/For Rent: House & Apart...`)
            }}>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
