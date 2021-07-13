import logo from './logo.svg';
import './App.css';
import { Carousel } from './components/carousel';

function App() {
    return (
      <div className="App" style= {{display: "flex", justifyContent: 'center',
      alignItems: 'center'}}>
        <Carousel/>
      </div>
    );
  }

export default App;
