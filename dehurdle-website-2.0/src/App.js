import logo from './logo.svg';
import './App.css';
import HomePage from './homePage.js';

function App() {
  return (
    <div className="App">
      <div className='header'></div>
      <div className='main'>
        <HomePage />  
      </div>
      <div className='footer'> </div>
    </div>
  );
}

export default App;
