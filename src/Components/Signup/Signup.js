import React,{useState,useContext} from 'react';

import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {getFirestore,addDoc,collection} from 'firebase/firestore'
import {useHistory} from 'react-router-dom'
import {useFormInputValidation} from 'react-form-input-validation'




import { FirebaseContext } from '../../stores/FirebaseContext';
import './Signup.css';
import Loading from '../../Effects/Loading';

export default function Signup() {
  const [username,setUsername]=useState(' ')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')

  const [load,setLoad]=useState('')

  const Firebase=useContext(FirebaseContext)
  const db=getFirestore(Firebase)
  const auth=getAuth(Firebase)
  const history=useHistory()


  const handleSubmit= async(e)=>{
    
    e.preventDefault()
    const isValid = await form.validate(e);
    if (isValid) {
      // console.log(fields, errors);
      // Perform api call here
      
    }
    


    if(username!==''&&email!==''&&phone!==''&&password!=''){
      setLoad(1)
    }
    createUserWithEmailAndPassword(auth,email,password).then(()=>{
      updateProfile(auth.currentUser,{displayName:username})
      
    }).then(()=>{
       addDoc(collection(db, "user"), {
        id:auth.currentUser.uid,
        name: username,
        phone: phone
      });
    }).then(()=>{history.push('/login')})
    
    
    
  }

  const [fields, errors, form] = useFormInputValidation({
    name: "",
    email: "",
    phone: "",
    password: ""
  }, {
    name: "required",
    email: "required|email",
    phone: "required|numeric|digits_between:10,12",
    password: "required"
  });
  

 
  
  return (
    <div>
      <div className="signupParentDiv">
      <div className="brandName">
          <span className='market-logo'>E-Market</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e)=>{
              setUsername(e.target.value)
              
            }}
          />
          <br />
          <label className="error">
          {errors.name
          ? "hai"
          : ""}
          </label>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            onChange={(e)=>{
              setEmail(e.target.value)
              
            }}

            name="email"
            defaultValue="John"
          />
          <br />
          <label className="error">
          {errors.email
          ? errors.email
          : ""}
          </label>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            id="lname"
            onChange={(e)=>{setPhone(e.target.value)}}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label className="error">
          {errors.phone
          ? errors.phone
          : ""}
          </label>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="lname"
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <label className="error">
          {errors.password
          ? errors.password
          : ""}
          </label>
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a onClick={()=>history.push('/login')}>Login</a>
        {load==1&&<div className='loading'><Loading/></div>}
      </div>
    </div>
  );
}
