import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import Navbar from './components/Navbar';

function App() {
  return (
   <div>
   <Navbar/>
     <Switch>
       <Route path="/" exact component={Home} />
       <Route path="/rooms" exact component={Rooms} />
       <Route path="/rooms/:slug" exact component={SingleRoom} />
       <Route path="/error" exact component={Error} />
       <Route component={Error} />
     </Switch>
   </div>
  );
}

export default App;
