import './App.css';
import { useState } from 'react';
import Header from './components/Header/Header.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';

function App() {

  const [list, setList] = useState('');
  const [validated, setValidated] = useState(false);
  const [currentMember, setCurrentMember] = useState('');

  return (
    <div className="App">
      <Header list={list} setValidated={setValidated} setList={setList} setCurrentMember={setCurrentMember} />
      {validated ?
        null
        :
        (
          <Login setValidated={setValidated} setList={setList} setCurrentMember={setCurrentMember} />
        )
      }
      {list ?
        (
          <Home list={list} currentMember={currentMember} setList={setList} />
        )
        :
        null
      }
    </div>
  );
}

export default App;
