import React, { useEffect, useState } from 'react';
import he from "he";
import Button from '@mui/material/Button';

function CurrentQuestion({ playerOneScore, setPlayerOneScore, currentQuestion, setCurrentQuestion }) {

    const [ question, setQuestion ] = useState('');
    const [ questionData, setQuestionData ] = useState('');
    const [ answers, setAnswers ] = useState([]);
    const [ correctAnswer, setCorrectAnswer ] = useState('');

    const handleAnswer = ans => {

        if(ans === correctAnswer) {
            setPlayerOneScore(playerOneScore + currentQuestion[0])
        } else setPlayerOneScore(playerOneScore - currentQuestion[0]);

        setCurrentQuestion(null);
    }

    //puts the correct answer in a random spot of the wrong answers array
    const jumbleAnswers = (correct_answer, incorrect_answers) => {

        const decodedCorrect = he.decode(correct_answer);
        const decodedIncorrect = incorrect_answers.map(a => he.decode(a));
        setCorrectAnswer(decodedCorrect)

        const answersArray = [...decodedIncorrect];

        const randomIndex = Math.floor(Math.random() * (answersArray.length + 1));

        answersArray.splice(randomIndex, 0, decodedCorrect);

        setAnswers(answersArray)
    }

    useEffect(() =>{
        // const quesionDifficulty = () => {
        //     if(currentQuestion[0] < 500) {

        //     }
        // }
        const fetchTheQuestion = async () => {
            const url = `https://opentdb.com/api.php?amount=1&category=${currentQuestion[1]}&difficulty=easy`

            try {

                const response = await fetch(url)

                if(!response.ok) throw new Error("Error Retriving Question")

                const data = await response.json();
                setQuestion(he.decode(data.results[0].question))
                setQuestionData(data)
                jumbleAnswers(data.results[0].correct_answer, data.results[0].incorrect_answers)

                console.log(data)
                
            } catch (err) {
                console.log(err)
            }
        }

        fetchTheQuestion();

    },[])

    

  return (
    <div className='absolute h-full w-full bg-blue-400 flex flex-col justify-center items-center'>
        <section className='mb-6'>
            {question}
        </section>

        <section className='grid grid-cols-2 gap-4'>
            {answers.map((ans,i) => (
                <Button
                    sx={{
                        backgroundColor: '#17339a',
                        border: '4px solid #2aa1ff',
                        color: '#fff',
                        padding: '20px',
                        fontSize: '1.1rem',
                        '&:hover': {
                          backgroundColor: '#2aa1ff',
                          borderColor: '#17339a'}
                    }}
                    key={i}
                    onClick={() => handleAnswer(ans)}>{ans}</Button>
            ))}
        </section>

    </div>
  )
}

export default CurrentQuestion;