import React,{useContext,useEffect} from 'react';
import './App.css';
import {HashRouter,Route} from 'react-router-dom'
import { getAuth ,onAuthStateChanged} from "firebase/auth"

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import Create from './Components/Create/Create';
import Search from './Pages/Search'

import { AuthContext, FirebaseContext } from './stores/FirebaseContext';
import ViewPost from './Pages/ViewPost';
import Post from './stores/PostContext';
import SearchCont from './stores/SearchContext';


function App() {
  
  const {setUser}=useContext(AuthContext)
  

  const Firebase=useContext(FirebaseContext)
  
 
  

  useEffect(() => {
    const auth=getAuth(Firebase)
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })

    return () => {
      
    }
  }, [])
  
  return (
    <div>
      <HashRouter>
      <SearchCont>
      <Post>

       <Route exact path="/">
 <Home/>
       </Route>
       <Route path="/signup">
       <Signup/>
       </Route>
       <Route path="/login">
       <Login/>
       </Route>

       <Route path="/create">
       <Create/>
       </Route>

       <Route path="/view">
       <ViewPost/>
       </Route>


       <Route path='/search/:id'>
       <Search/>
       </Route>
 



      </Post>

      </SearchCont>
      
      </HashRouter>
      
      
    </div>
  );
}

export default App;
