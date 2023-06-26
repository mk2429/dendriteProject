import { Home } from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlaylistProvider } from './Context/ContextReducer';
import { AllSongProvider } from './Context/AllSongsContext';
import { UseAuth } from './UseAuth';


function App() {
  const isLogin=UseAuth();
  return (
      <AllSongProvider>
        <PlaylistProvider>
          <div className="App" >
            {isLogin?<Home/>:<p>jao yah se</p>}
          </div>
        </PlaylistProvider>
      </AllSongProvider>
  );
}

export default App;
