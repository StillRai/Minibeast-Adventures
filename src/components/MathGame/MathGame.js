import React, { useState, useEffect } from 'react';
import './MathGame.css';
import antImg from '../../images/ant.png';
import beetleImg from '../../images/beetle.png';
import beeImg from '../../images/bee.png';
import butterflyImg from '../../images/butterfly.png'; 
import dragonflyImg from '../../images/dragonfly.png';
import spiderImg from '../../images/spider.png';
import caterpillarImg from '../../images/caterpillar.png';
import flyImg from '../../images/fly.png';
import ladybirdImg from '../../images/ladybird.png';
import wormImg from '../../images/worm.png';
import correctSound from '../../sounds/correct.mp3';
import incorrectSound from '../../sounds/incorrect.mp3';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const minibeasts = [
    { id: 1, name: 'Ant', image: antImg, value: 1 },
    { id: 2, name: 'Beetle', image: beetleImg, value: 1 },
    { id: 3, name: 'Butterfly', image: butterflyImg, value: 1 },
    { id: 4, name: 'Dragonfly', image: dragonflyImg, value: 1 },
    { id: 5, name: 'Spider', image: spiderImg, value: 1 },
    { id: 6, name: 'Bee', image: beeImg, value: 1 },
    { id: 7, name: 'Fly', image: flyImg, value: 1 },
    { id: 8, name: 'Ladybird', image: ladybirdImg, value: 1 },
    { id: 9, name: 'Worm', image: wormImg, value: 1 },
    { id: 10, name: 'Bee', image: beeImg, value: 1 },
    { id: 11, name: 'Caterpillar', image: caterpillarImg, value: 1 },
];

function MathGame({ onStart }) {
    const [num1, setNum1] = useState(Math.ceil(Math.random() * 5));
    const [num2, setNum2] = useState(Math.ceil(Math.random() * (6 - num1)) || 1);
    const [insectIndices1, setInsectIndices1] = useState(Array.from({ length: num1 }, () => Math.floor(Math.random() * minibeasts.length)));
    const [insectIndices2, setInsectIndices2] = useState(Array.from({ length: num2 }, () => Math.floor(Math.random() * minibeasts.length)));
    const [answer, setAnswer] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [audio, setAudio] = useState(null);
    const navigate = useNavigate();
    const goBack = () => {
      navigate('/'); 
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    };

    const addDigit = (digit) => setAnswer(answer + digit);
    const playDigitSound = async (digit) => {
        const audioPath = await import(`../../sounds/${digit}.mp3`);
        new Audio(audioPath.default).play();
    };
    const handleInputChange = (event) => setAnswer(event.target.value);
    const playAudio = (src) => {
        if (audio) {
            audio.pause();
        }
        const newAudio = new Audio(src);
        newAudio.play();
        setAudio(newAudio);
    };
    const stopAudio = () => {
        if (audio) {
            audio.pause();
            setAudio(null);
        }
    };
    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, [audio]);

    const generateRandomNumbers = () => {
        const newNum1 = Math.ceil(Math.random() * 9);
        let newNum2 = Math.ceil(Math.random() * (10 - newNum1));
        if (newNum2 === 0) {
          newNum2 = 1;
        }
        setNum1(newNum1);
        setNum2(newNum2);
        setAnswer('');
    
        const newInsectIndices1 = Array.from({ length: newNum1 }, () => Math.floor(Math.random() * minibeasts.length));
        const newInsectIndices2 = Array.from({ length: newNum2 }, () => Math.floor(Math.random() * minibeasts.length));
        setInsectIndices1(newInsectIndices1);
        setInsectIndices2(newInsectIndices2);
      };

    const checkAnswer = () => {
        const parsedAnswer = parseInt(answer, 10);
        if (parsedAnswer === (num1 + num2)) {
            setAnswer("Correct!");
            setCorrectCount(correctCount + 1);
            stopAudio();
            new Audio(correctSound).play();
            setTimeout(() => {
                setAnswer("");
                generateRandomNumbers();
            }, 2000);
        } else {
            setAnswer(`Incorrect. The correct answer is ${num1 + num2}.`);
            setIncorrectCount(incorrectCount + 1);
            stopAudio();
            new Audio(incorrectSound).play();
            setTimeout(() => {
                setAnswer("");
                generateRandomNumbers();
            }, 2000);
        }
    };

    return (
        <div className="MathGame">
          <IconButton onClick={goBack} style={{ position: 'absolute', top: 10, left: 10 }}>
        <ArrowBackIcon />
      </IconButton>
            <div className="score">
                <div>Correct: {correctCount}&emsp;  |  &emsp;Incorrect: {incorrectCount}</div>
            </div>
            <h1>Minibeast Math</h1>
            <div className='BodyText'>Count the bugs and enter your answer to check if it is correct.</div>
          <div className="numbers">
        {insectIndices1.map((index, i) => (
          <img key={i} src={minibeasts[index].image} alt={minibeasts[index].name} />
        ))}
        <h2 className='Symbols'>+</h2>
        {insectIndices2.map((index, i) => (
          <img key={i} src={minibeasts[index].image} alt={minibeasts[index].name} />
        ))}
                <h2 className='Symbols'>=</h2>
                <div className="input-check-container">
                    <input
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter answer"
                    />
                    <button
                        className="Check"
                        onClick={checkAnswer}
                        onMouseLeave={stopAudio}
                    >
                        Check
                    </button>
                </div>

                <div className="buttons-container">
                    {[...Array(10)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                addDigit(index);
                                playDigitSound(index);
                            }}
                        >
                            {index}
                        </button>
                    ))}
                </div>
                <button
                    className="NextQuestion"
                    onMouseEnter={() => playAudio(process.env.PUBLIC_URL + '/sounds/new_question.mp3')}
                    onMouseLeave={stopAudio}
                    onClick={generateRandomNumbers}
                >
                    New question
                </button>
                <button
                    className="Erase"
                    onClick={() => setAnswer(answer.slice(0, -1))}
                    onMouseEnter={() => playAudio(process.env.PUBLIC_URL + '/sounds/erase.mp3')}
                    onMouseLeave={stopAudio}
                >
                    Erase
                </button>

            </div>
        </div>
    );
}

export default MathGame;
