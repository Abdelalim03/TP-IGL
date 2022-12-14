import { useSelector } from 'react-redux';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Navbar from './components/shared/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import PostAnnonce from './pages/PostAnnonce';
import Signup from './pages/Signup';
function App() {
  const {user} = useSelector((state)=>state.auth)

  return (
    <Router>
        <Navbar button0={user &&"CONSULTER MES FAVORIS"} button1={user ?"CONSULTER MES ANNONCES":"Créer COMPTE"} button2={user ?"PUBLIER UNE ANNONCE":"se connecter"}  />
        <Routes >
          <Route path="/" >
            <Route  index element={<Home />} />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='postAnnonce' element={<PostAnnonce />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
