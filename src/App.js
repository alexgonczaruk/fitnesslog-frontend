import './App.css';
import Logs from './components/Logs';

function App() {
  return (
    <div className="App">
      <header className="Header">
        <div>
          Fitness Log
        </div>
      </header>
      <div className="Container">
        <div className="Flex-Container">
        <Logs></Logs>
        </div>
      </div>
    </div>
  );
}

export default App;
