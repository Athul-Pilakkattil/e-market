import React, { Fragment,useContext,useState } from 'react';
import { getStorage, ref ,uploadBytes,getDownloadURL} from "firebase/storage"
import {useHistory} from 'react-router-dom'


import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../stores/FirebaseContext';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Loading from '../../Effects/Loading';


const Create = () => {
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')

  const [load,setLoad]=useState('')
  

  const date=new Date()
  const history=useHistory()

  const {user}=useContext(AuthContext)
  const Firebase=useContext(FirebaseContext)
  const storage=getStorage(Firebase)
  const db=getFirestore(Firebase)

  const handleSubmit=(e)=>{
    e.preventDefault()

    if(name!==''&&category!==''&&price!==''&&image!=''){
      setLoad(1)
    }
  
    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then(()=>{
      getDownloadURL(ref(storage, `images/${image.name}`)).then((url)=>{

        const docRef =  addDoc(collection(db, "products"), {
          name:name,
          category:category,
          price:price,
          url:url,
          userId:user.uid,
          createdAt:date.toDateString()
        });
        history.push('/')
      })
    })
    
    
   
    


  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
                
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
                
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}
              onChange={(e)=>{
                setPrice(e.target.value)
                
              }} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          <form>
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          </form>
          {load==1&&<div className='loading-2'><Loading/></div>}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
