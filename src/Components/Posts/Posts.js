import React,{useState,useEffect,useContext} from 'react';
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useHistory } from 'react-router-dom';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../stores/FirebaseContext';
import {PostContext} from '../../stores/PostContext'

function Posts() {
  
  const Firebase=useContext(FirebaseContext)
  const db=getFirestore(Firebase)
  const [products,setProducts]=useState([])
  const [fresh,setFresh]=useState([])
  const {setPostDetails} =useContext(PostContext)

  const history=useHistory()

  const date=new Date();
  const month=date.toLocaleString('default',{month:'short'})
  
  
  useEffect(() => {
     const getData = async () =>{
      const querySnapshot = await getDocs(collection(db, "products"));
      const dataa=[]
      querySnapshot.forEach((doc) => {
        dataa.push({...doc.data(),id:doc.id})
        
  
      });
      setProducts(dataa)
      setFresh(dataa.filter(obj=>obj.createdAt.toLowerCase().includes(month.toLowerCase())))
      
     }
     getData()
  }, [])


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product)=>{
            return(
              <div onClick={()=>{
                setPostDetails(product)
                history.push('/view')
              }}
            className="card"
            
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            )
          })}
        </div>
      </div>
      
      <div className="moreView">
        <div className="heading">
          <span>Fresh recommendations</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {fresh.map((fresh)=>{
            return(
              <div onClick={()=>{
               setPostDetails(fresh)
                history.push('/view')
            }} className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={fresh.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {fresh.price}</p>
              <span className="kilometer">{fresh.category}</span>
              <p className="name">{fresh.name}</p>
            </div>
            <div className="date">
              <span>{fresh.createdAt}</span>
            </div>
          </div>
          

            )
          })}
        </div>
        </div>
    </div>
  );
}

export default Posts;
