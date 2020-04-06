import React, { FunctionComponent, useEffect, useState } from 'react';
import { Entire } from './stories/Layouts/Entire.stories'
import './App.css';


function App() {

  // useEffect(() => {
  //   chrome.runtime.onMessage.addListener(
  //     function (request, sender, sendResponse) {
  //       console.log("message received at ext", request, sender, sendResponse);
  //       console.log("request.emails", JSON.parse(request.emails))
  //       sendResponse({ emails: request.emails })
  //       // if (request.greeting == "hello")
  //       //   sendResponse({ farewell: "goodbye" });
  //     });
  // }, [])

  return (
    <div className="App" style={{ width: "800px" }}>
      <Entire />
    </div>
  );
}

export default App;
