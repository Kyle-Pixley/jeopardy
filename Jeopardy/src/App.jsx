import { useState } from 'react';
import './App.css';

function App() {

  const [ catagories, setCatagories ] = useState([

  ])

  return (
    <div className='flex  justify-center h-full'>
      <section>
          <span className='inline-block text-blue-600 text-[7em] text-shadow-lg/100 
            animate-slide-in-right'>
              J</span>
          <span className='inline-block text-blue-600 text-[7em] text-shadow-lg/100 
            animate-slide-in-right-2'>
              E</span>
          <span className='inline-block text-blue-600 text-[7em] text-shadow-lg/100 
            animate-slide-in-right-3'>
              O</span>
          <span className='inline-block text-blue-600 text-[7em] text-shadow-lg/100 
            animate-slide-in-right-4'>
              P</span>
          <span className='inline-block text-blue-600 text-[7em] text-shadow-lg/100 
            animate-slide-in-right-5'>
              A</span>
          <span className='inline-block text-blue-600 text-[7em] text-shadow-lg/100 
            animate-slide-in-right-6'>
              R</span>
          <span className='inline-block text-blue-600 text-[7em] text-shadow-lg/100 
            animate-slide-in-right-7'>
              D</span>
          <span className='inline-block text-blue-600 text-[7em] text-shadow-lg/100 
            animate-slide-in-right-8'>
              Y</span>
      </section>
    </div>
  )
}

export default App;