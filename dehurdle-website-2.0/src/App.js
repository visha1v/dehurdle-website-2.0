import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './screens/home/Home';
//import About from './pages/About';
//import Plans from './pages/Plans';
//import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="*" element={<NotFound />} />*/}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;