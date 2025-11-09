import React, { useState, useEffect } from 'react';

function GameOne({ randomCategoryNumber }) {

  const [ allCatagories, setAllCatagories ] = useState([

  ])
  const [ gameOneCatagories, setGameOneCatagories ] = useState([]);
  const [ gameOneMoney, setGameOneMoney ] = useState([200,400,600,800,1000]);


  useEffect(() => {
    setGameOneCatagories(prev => {
      const set = new Set(prev);
      while (set.size < 6) {
        set.add(randomCategoryNumber())
      }
      return Array.from(set)
    })
  }, []);

  useEffect(() => {
    console.log(gameOneCatagories)
  }, [gameOneCatagories])


  return (
    <div className='position: absolute h-full w-full animate-slide-down flex flex-col justify-center items-center'>

        <section className='w-[80%] h-[80%] mx-auto rounded-2xl p-3 bg-[#2aa1ff] flex justify-center items-center shadow-[#053559] shadow-2xl'>
          <div className='h-[99%] w-[99%] rounded-2xl border-8 border-[#17339a]'>

            <section className='h-full flex flex-col justify-between'>

              <div className='flex'>
                {gameOneCatagories.map((num,i) => (
                  <div 
                  className='border-2 w-[16.66%] h-[16.66%] flex justify-center items-center'
                  key={i}
                  >{num}</div>
                ))}
              </div>

                {gameOneMoney.map((num, i) => (
                  <div  
                  className='border-2 w-[16.66%] h-[16.66%] justify-center items-center'
                  key={i}>
                    {num}
                    </div>
                    ))}
              </section>
            
          </div>
        </section>
    </div>
  )
}

export default GameOne;


// General Knowledge = 9
// Entertainment: Books = 10
// Entertainment: Film = 11
// Entertainment: Music = 12
// Entertainment: Musicals & Theatres = 13
// Entertainment: Television = 14
// Entertainment: Video Games = 15
// Entertainment: Board Games = 16
// Science & Nature = 17
// Science: Computers = 18
// Science: Mathematics = 19
// Mythology = 20
// Sports = 21
// Geography = 22
// History = 23
// Politics = 24
// Art = 25
// Celebrities = 26
// Animals = 27
// Vehicles = 28
// Entertainment: Comics = 29 
// Science: Gadgets = 30
// Entertainment: Japanese Anime & Manga = 31
// Entertainment: Cartoons & Animations = 32















