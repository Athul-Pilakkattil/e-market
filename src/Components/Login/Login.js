import React,{useState,useContext} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import {useHistory} from 'react-router-dom'

import './Login.css';
import { FirebaseContext } from '../../stores/FirebaseContext'; 
import Loading from '../../Effects/Loading';

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [load,setLoad]=useState('')

  const Firebase=useContext(FirebaseContext)
  const auth=getAuth(Firebase)
  const history=useHistory()


  const handleSubmit=(e)=>{
    e.preventDefault()

    if(email!==''&&password!=''){
      setLoad(1)
    }
    signInWithEmailAndPassword(auth, email, password).then(()=>{
      history.push('/')
    }).catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage)
      setLoad(0)
    });

  }




  return (
    <div>
      <div className="loginParentDiv">
      <div className="brandName">
          <span className='market-logo'>E-Market</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
              
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{history.push('/signup')}}>Signup</a>
        {load==1&&<div className='loading'><Loading/></div>}
      </div>
    </div>
  );
}

export default Login;
