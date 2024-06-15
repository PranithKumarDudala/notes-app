import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import DisplayNote from './Components/DisplayNote';




function App() {
  return (
  
    <Router>

      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path = "/login" Component={Login} />
        <Route exact path = "/signup" Component={SignUp} />
        <Route exact path='/:id' Component={DisplayNote}/>
      </Routes>

     

    </Router>
    

    
  );
}

export default App;
