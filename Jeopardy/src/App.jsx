import { useState, useEffect } from 'react';
import GameOne from './Components/GameOne';

function App() {

  const [ catagories, setCatagories ] = useState([

  ])
  const [ gameStart, setGameStart ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setGameStart(true);
    }, 3450)
  })

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
      { gameStart ? <GameOne /> : null }
    </div>
  )
}

export default App;