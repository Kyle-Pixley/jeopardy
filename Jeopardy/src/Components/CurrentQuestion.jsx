import React, { useEffect, useState } from 'react';
import he from "he";
import Button from '@mui/material/Button';

let lastQuestionFetch = 0;
const QUESTION_COOLDOWN_MS = 5000;

function CurrentQuestion({ playerOneScore, setPlayerOneScore, currentQuestion, setCurrentQuestion }) {

    const [ question, setQuestion ] = useState('');
    const [ questionData, setQuestionData ] = useState('');
    const [ answers, setAnswers ] = useState([]);
    const [ correctAnswer, setCorrectAnswer ] = useState('');

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);


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

    useEffect(() => {
        let isMounted = true;

        const fetchTheQuestion = async ( retry = 0) => {
          setLoading(true);
          setError(null);
        
          try {

            const now = Date.now();
            const elapsed = now - lastQuestionFetch;

            if (elapsed < QUESTION_COOLDOWN_MS) {
              const waitMs = QUESTION_COOLDOWN_MS - elapsed;
              await new Promise(res => setTimeout(res, waitMs));
            }
        
            const url = `https://opentdb.com/api.php?amount=1&category=${currentQuestion[1]}&difficulty=easy`;
        
            const response = await fetch(url);
        
            if(response.status === 429 ) {
              console.warn('Error 429, retrying...');
              lastQuestionFetch = Date.now();
              await new Promise(res => setTimeout(res, QUESTION_COOLDOWN_MS));
              return fetchTheQuestion(retry + 1);
            }
        
            const data = await response.json();
        
            if (!isMounted) return;
        
            if (!data.results || data.results.length === 0) {
              throw new Error("No questions returned.");
            }
        
            const result = data.results[0];
        
            setQuestion(he.decode(result.question));
            setQuestionData(data);
            jumbleAnswers(result.correct_answer, result.incorrect_answers);
        
            lastQuestionFetch = Date.now();
        
            console.log(data);
        
          } catch (err) {
            if (!isMounted) return;
            console.error(err);
            setError(err.message || "Something went wrong fetching the question.");
          } finally {
            if (isMounted) setLoading(false);
          }
        };
    
        fetchTheQuestion();
    
        return () => {
          isMounted = false;
        };
    }, []);

    

  return (
    <div className='absolute h-full w-full bg-blue-400 flex flex-col justify-center items-center'>
        <section className='mb-6'>
            {question}
        </section>

        <section className='grid grid-cols-2 gap-4'>

            { loading && (
              <div className='flex items-center gap-1 text-3xl'>
                <span>Loading</span>
                <span className='animate-loading-dot'>.</span>
                <span className='animate-loading-dot-2'>.</span>
                <span className='animate-loading-dot-3'>.</span>
              </div>) }

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