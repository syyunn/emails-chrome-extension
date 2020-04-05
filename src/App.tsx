import React, { FunctionComponent, useEffect, useState } from 'react';
import { Entire } from './stories/Layouts/Entire.stories'
import './App.css';


function App() {
  // const initialState = () =>
  //   sessionStorage.getItem("emails") || null

  // const [emails, setEmails] = useState(initialState);

  // useEffect(() => {
  //   console.log("emails in useEffect", emails)
  //   if (emails == null) {
  //     console.log("emails are null")
  //     setEmails(sessionStorage.getItem("emails"))
  //   }
  // }, [emails]);

  return (
    <div className="App" style={{ width: "800px", height: "600px" }}>
      <Entire />
    </div>
  );
}

export default App;
