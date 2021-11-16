import React from 'react'
import { Route } from 'react-router-dom';
import UserDashBoard from './Components/userDashboard'
import Homepage from './Components/homepage';
import UpdateInfo from './Components/UpdateInfo';


function App() {
  return (

        <div className="App">
            
              <Route exact path="/" component={UserDashBoard}/>  
              <Route exact path="/userDashBoard" component={UserDashBoard}/>            
              <Route path="/profile" component={Homepage}/>
              <Route path= "/updateinfo" component={UpdateInfo} />
            
        </div>
  
  );
}

export default App
