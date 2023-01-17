import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContext} from './stores/FirebaseContext'
import {Firebase} from './firebase/config'
import Context from './stores/FirebaseContext';

ReactDOM.render(
<FirebaseContext.Provider value={Firebase}> 
<Context>
<App />
</Context>



</FirebaseContext.Provider>    


, document.getElementById('root'));
