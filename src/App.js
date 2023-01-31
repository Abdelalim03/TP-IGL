import {BrowserRouter as Router ,Route,Routes, useNavigate} from 'react-router-dom'
import Layout from './components/shared/Layout';
import AnnonceDetails from './pages/AnnonceDetails';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import PostAnnonce from './pages/PostAnnonce';
import SelfAnnonces from './pages/SelfAnnonces';
import Post from './pages/Post';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import { useSelector } from 'react-redux';
import Messages from './pages/Messages';
function App() {
  const {user} = useSelector(state=>state.auth);
    
  return (
      <Router>
          <Routes >
            <Route path="/" element={<Layout />} >
              <Route index={user && true} element={<Home />} />
              <Route path='signup' element={<Signup />} />
              <Route index={!user && true} element={<Login />} />
              <Route path='annonces' element={<PostAnnonce />} />
              <Route path='annonces/:id' element={<AnnonceDetails />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='myannonces' element={<SelfAnnonces />} />
              <Route path='postannonce' element={<Post />} />
              <Route path='messages' element={<Messages />} />
              <Route path='admin' element={<Admin />} />
              <Route path="*" element={<p className='text-center pt-[1/2]'>There's nothing here: 404!</p>} />
            </Route>
          </Routes>
      </Router>
  );
}

export default App;
