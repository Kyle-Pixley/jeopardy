import React, { useState, useEffect } from 'react';

function GameOne({ randomCategoryNumber, setPlayerOneScore, setCurrentQuestion, setGameTwo }) {

  const [ gameOneCatagories, setGameOneCatagories ] = useState([]);
  const [ gameOneMoney, setGameOneMoney ] = useState([200,400,600,800,1000]);
  const [ usedCells, setUsedCells ] = useState({});
  const [ activatedCell, setActivatedCell ] = useState(null);
  const [ pendingQuestion, setPendingQuestion ] = useState(null);

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
    console.log('usedcells', Object.keys(usedCells).length)
    // ! dont forget to change this to >= 30 !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (Object.keys(usedCells).length >= 30) {
      setGameTwo(true);
    }
  }, [usedCells])

  const catagoryName = num => {
    switch(num){
      case 9: return 'General Knowledge'; break;
      case 10: return 'Books'; break;
      case 11: return 'Film'; break;
      case 12: return 'Music'; break;
      case 13: return 'Musicals & Theatres'; break;
      case 14: return 'Television'; break;
      case 15: return 'Video Games'; break;
      case 16: return 'Board Games'; break;
      case 17: return 'Science & Nature'; break;
      case 18: return 'Computers'; break;
      case 19: return 'Mathematics'; break;
      case 20: return 'Mythology'; break;
      case 21: return 'Sports'; break;
      case 22: return 'Geography'; break;
      case 23: return 'History'; break;
      case 24: return 'Politics'; break;
      case 25: return 'Art'; break;
      case 26: return 'Celebrities'; break;
      case 27: return 'Animals'; break;
      case 28: return 'Vehicles'; break;
      case 29: return 'Comics'; break;
      case 30: return 'Japanese Anime & Manga'; break;
      case 31: return 'Cartoons & Animations'; break;
      default: return num;
    }
  }

  const cellClicked = (num, colIndex, rowIndex) => {
    const key = `${rowIndex}-${colIndex}`;

    setActivatedCell(key);

    setUsedCells(prev => ({
      ...prev,
      [key]: true
    }));

    const catagory = gameOneCatagories[colIndex]
    setPendingQuestion([num, catagory]);
    // setCurrentQuestion([num, catagory]);
  }


  return (
    <div className='absolute h-full w-full animate-slide-down flex flex-col justify-center items-center'>

        <section className='w-[80%] h-[80%] mx-auto rounded-2xl p-3 bg-[#2aa1ff] flex justify-center items-center shadow-[#053559] shadow-2xl'>
          <div className='h-[99%] w-[99%] rounded-2xl border-8 border-[#17339a]'>

            <section className='h-full flex flex-col justify-between'>

              <div className='flex border-2 h-[16.66%]'>
                {gameOneCatagories.map((num,i) => (
                  <div 
                  className='border-2 w-[16.66%] h-full flex justify-center items-center'
                  key={i}
                  >{catagoryName(num)}</div>
                ))}
              </div>

                {gameOneMoney.map((num, rowIndex) => (
                  <div className='flex w-full h-[16.66%]' key={rowIndex}>
                    {Array.from({ length: 6 }).map((_, colIndex) => {

                      const key = `${rowIndex}-${colIndex}`;
                      const isUsed = usedCells[key];
                      const isActive = activatedCell === key;

                      return (
                        <div
                          key={key}
                          onClick={() => !isUsed && cellClicked(num,colIndex,rowIndex)}

                          onAnimationEnd={() => {
                            if (activatedCell === key) {
                              setActivatedCell(null)

                              if (pendingQuestion) {
                                setCurrentQuestion(pendingQuestion);
                                setPendingQuestion(null);
                              }
                            }
                          }}

                          className={`border-2 w-[16.66%] h-full flex justify-center items-center ${isUsed && !isActive ? 'opacity-40 pointer-events-none' : 'cursor-pointer'} ${isActive ? 'animate-grow-up' : '' }`}>
                          {isUsed  && !isActive ? '' : num}
                        </div>

                      )
                    })}
                  </div>
                ))}

              </section>
            
          </div>
        </section>
    </div>
  )
}

export default GameOne;