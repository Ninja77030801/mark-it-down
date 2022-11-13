import React, { useState } from 'react';
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import SimpleMDE from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css';
import './App.css';

function App() {
  const [code, setCode] = useState("# Hello World! \n You can save your progress on the browser, or you can load your recent work.");
  const saveProgress = () => {
    localStorage.setItem("recentCode", code);
  };
  const loadProgress = () => {
    try {
      var recentCode = localStorage.getItem("recentCode");
      if(recentCode !== null){
        setCode(recentCode)
      }
    }
    catch(error: any){
     alert(error.message);
    }
  };
  const saveFile = () => {
    var blob = new Blob([code], {type: "octet/stream"});
    var url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = prompt("Enter the name of your file")+".md";
    a.click();
  };
  return (
    <div className="App">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <h3>Mark it down</h3>
          <Navbar.Divider />
          <Button icon="download" text="Save Progress" onClick={saveProgress} className="bp4-minimal" />
          <Button icon="download" onClick={saveFile} text="Save file" className="bp4-minimal" />
          <Button icon="upload" text="Load Progress" onClick={loadProgress} className="bp4-minimal" />
        </Navbar.Group>
      </Navbar>
      <SimpleMDE value={code} onChange={(value) => setCode(value)} />
    </div>
  );
}

export default App;
