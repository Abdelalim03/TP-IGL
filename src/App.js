import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Layout from './components/shared/Layout';
import AnnonceDetails from './pages/AnnonceDetails';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import PostAnnonce from './pages/PostAnnonce';
import SelfAnnonces from './pages/SelfAnnonces';
import Post from './pages/Post';
import Signup from './pages/Signup';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Router>
          <Routes >
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path='signup' element={<Signup />} />
              <Route path='login' element={<Login />} />
              <Route path='annonces' element={<PostAnnonce />} />
              <Route path='annonces/:id' element={<AnnonceDetails />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='myannonces' element={<SelfAnnonces />} />
              <Route path='postannonce' element={<Post />} />
            </Route>
          </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
