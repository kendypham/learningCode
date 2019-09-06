import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [test, setTest] = useState('')
  useEffect(() => {
    setTest(`You clicked ${count} times haha`)
    console.log(test);

  })
  console.log(test);

  return (
    <div className="App">
      <p>{test}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
