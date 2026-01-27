
import './App.css'
import {Route, BrowserRouter as Router , Routes} from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import Authentication from './pages/authentication.jsx';
import VideoMeetComponents from './pages/VideoMeet.jsx';
import HomeComponents from './pages/home.jsx';
import History from './pages/history.jsx';
import  {AuthProvider} from './contexts/AuthContext.jsx';



function App() {

  return (
<div className='App'>
<Router>
<AuthProvider>
<Routes>
<Route path='/' element={<LandingPage/>}/>
<Route path='/auth' element={<Authentication/>}/>
<Route path='/home' element={<HomeComponents/>}/>
<Route path='/history' element={<History/>}/>
<Route path='/:url' element={<VideoMeetComponents/>}/>
</Routes>
</AuthProvider>
</Router>
</div>
  );
}

export default App;
