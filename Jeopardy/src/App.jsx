import { useState, useEffect } from 'react';
import GameOne from './Components/GameOne';
import CurrentQuestion from './Components/CurrentQuestion';

function App() {

  const [ questionApiToken, setQuestionApiToken ] = useState('');

  useEffect(() => {
    const fetchSessionToken = async () => {
      const url = 'https://opentdb.com/api_token.php?command=request'
      try {

        const response = await fetch(url)

        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.message || "Error with DataBase")
        }

        const data = await response.json();
        setQuestionApiToken(data.token)

      } catch (err) {
        console.log(err)
      }
    };

    fetchSessionToken();
  }, [])

  const [ playerScore, setPlayerScore ] = useState(0);
  const [ gameStart, setGameStart ] = useState(false);
  const [ currentQuestion, setCurrentQuestion ] = useState(null);

  const randomCategoryNumber = () => {
    return Math.floor(Math.random() * (32, 9 + 1)) + 9
   }

  useEffect(() => {
    setTimeout(() => {
      setGameStart(true);
    }, 0)
  },[])

  return (
    <div className='flex  justify-center h-full bg-blue-600'>
      <section>
          <span className='inline-block text-white text-[7em] text-shadow-lg/100 
            animate-slide-in-right'>
              J</span>
          <span className='inline-block text-white text-[7em] text-shadow-lg/100 
            animate-slide-in-right-2'>
              E</span>
          <span className='inline-block text-white text-[7em] text-shadow-lg/100 
            animate-slide-in-right-3'>
              O</span>
          <span className='inline-block text-white text-[7em] text-shadow-lg/100 
            animate-slide-in-right-4'>
              P</span>
          <span className='inline-block text-white text-[7em] text-shadow-lg/100 
            animate-slide-in-right-5'>
              A</span>
          <span className='inline-block text-white text-[7em] text-shadow-lg/100 
            animate-slide-in-right-6'>
              R</span>
          <span className='inline-block text-white text-[7em] text-shadow-lg/100 
            animate-slide-in-right-7'>
              D</span>
          <span className='inline-block text-white text-[7em] text-shadow-lg/100 
            animate-slide-in-right-8'>
              Y</span>
      </section>
      { gameStart ? 
        <GameOne 
          randomCategoryNumber={randomCategoryNumber} 
          setPlayerScore={setPlayerScore} 
          setCurrentQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}/> 
        : null }
      { currentQuestion ?
        <CurrentQuestion 
          playerScore={playerScore}
          setPlayerScore={setPlayerScore}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          questionApiToken={questionApiToken}
        />
        : null }
      {playerScore}
    </div>
  )
}

export default App;