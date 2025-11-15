import React, { useEffect, useState } from 'react';

function CurrentQuestion({ playerScore, setPlayerScore, currentQuestion, setCurrentQuestion }) {

    const [ question, setQuestion ] = useState('');
    const [ answers, setAnswers ] = useState([]);

    const handleAnswer = () => {
        setPlayerScore(playerScore + currentQuestion[0])
        setCurrentQuestion(null)
    }

    useEffect(() =>{
        const quesionDifficulty = () => {
            if(currentQuestion[0] < 500) {

            }
        }
        const fetchTheQuestion = async () => {
            const url = `https://opentdb.com/api.php?amount=1&category=${currentQuestion[1]}&difficulty=easy`

            try {

                const response = await fetch(url)

                if(!response.ok) throw new Error("Error Retriving Question")

                const data = await response.json();
                setQuestion(data.results[0].question)
                setAnswers(data.results[0].incorrect_answers)

// need to put data.results[0].correct_answer into a random spot in the data.results[0].incorrect_answers array 

                console.log(data)
                
            } catch (err) {
                console.log(err)
            }
        }

        fetchTheQuestion();

    },[])

    

  return (
    <div className='absolute h-full w-full bg-amber-500'>
        {question}
        <section>
            {currentQuestion}
        </section>

        <section>
            
        </section>

    </div>
  )
}

export default CurrentQuestion;