import React, { FunctionComponent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const initialState = () =>
    sessionStorage.getItem("emails") || null

  const [emails, setEmails] = useState(initialState);

  useEffect(() => {
    console.log("emails in useEffect", emails)
    if (emails == null) {
      console.log("emails are null")
      setEmails(sessionStorage.getItem("emails"))
    }
  }, [emails]);

  return (
    <div className="App" style={{ width: "800px", height: "600px" }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React2
        </a>
      </header>
    </div>
  );
}

export default App;
