import '../css/App.css'
import Header from './header'
import Content from './Content'
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <Header score={score} bestScore={bestScore}/>
      <Content score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore}/>
    </>
  )
}

export default App
