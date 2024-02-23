// import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import Header from './components/header/header.js'

import Content from './components/content/content.js';
function App() {
  return (
    <div  className="App">
     <Header/>
     <Content/>
    </div>
  );
}

export default App;
