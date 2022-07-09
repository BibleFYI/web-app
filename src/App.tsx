import './App.css';
import { Navbar } from './components/navbar';
import { Home } from './views/Home/home';

function App() {
  return (
    <div>
      <Navbar/>
      <header className="App-header">
        {Home()}
      </header>
    </div>
  );
}

export default App;
