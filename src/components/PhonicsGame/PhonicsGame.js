import React, { useState, useEffect, useCallback } from 'react';
import correctSound from '../../sounds/correct.mp3';
import incorrectSound from '../../sounds/incorrect.mp3';
import './PhonicsGame.css';
import antImg from '../../images/ant.png';
import beetleImg from '../../images/beetle.png';
import butterflyImg from '../../images/butterfly.png';
import dragonflyImg from '../../images/dragonfly.png';
import spiderImg from '../../images/spider.png';
import beeImg from '../../images/bee.png';
import flyImg from '../../images/fly.png';
import ladybirdImg from '../../images/ladybird.png';
import wormImg from '../../images/worm.png';
import throttle from 'lodash.throttle';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PhonicsGame() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isCheckDisabled, setIsCheckDisabled] = useState(true);
  const [audio, setAudio] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/'); 
  };

  useEffect(() => {
    preloadLetterSounds();
  }, []);

  const preloadLetterSounds = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    letters.split('').forEach(async (letter) => {
      const audioPath = await import(`../../sounds/${letter}.mp3`);
      const audio = new Audio(audioPath.default);
      audio.load();
    });
  };  
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

  const questions = [
    { id: 1, question: 'What is the name of this insect?', image: antImg, answer: 'Ant' },
    { id: 2, question: 'What is the name of this insect?', image: beetleImg, answer: 'Beetle' },
    { id: 3, question: 'What is the name of this insect?', image: butterflyImg, answer: 'Butterfly' },
    { id: 4, question: 'What is the name of this insect?', image: dragonflyImg, answer: 'Dragonfly' },
    { id: 5, question: 'What is the name of this insect?', image: spiderImg, answer: 'Spider' },
    { id: 6, question: 'What is the name of this insect?', image: beeImg, answer: 'Bee' },
    { id: 7, question: 'What is the name of this insect?', image: flyImg, answer: 'Fly' },
    { id: 8, question: 'What is the name of this insect?', image: ladybirdImg, answer: 'Ladybird' },
    { id: 9, question: 'What is the name of this insect?', image: wormImg, answer: 'Worm' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const generateRandomQuestion = useCallback(() => {
    let newQuestion;
    do {
      newQuestion = questions[Math.floor(Math.random() * questions.length)];
    } while (currentQuestion && newQuestion.id === currentQuestion.id);
    setQuestion(newQuestion.question);
    setResult('');
    setInputValue('');
    setCurrentQuestion(newQuestion);
    setIsCheckDisabled(true);
    return newQuestion;
  }, [currentQuestion]);

  useEffect(() => {
    const newQuestion = generateRandomQuestion();
    setCurrentQuestion(newQuestion);
  }, []);

  useEffect(() => {
    if (result !== '') {
      const timer = setTimeout(() => {
        const newQuestion = generateRandomQuestion();
        setCurrentQuestion(newQuestion);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [result, generateRandomQuestion]);

  const checkAnswer = () => {
    if (!currentQuestion) {
      return;
    }
    const currentImage = currentQuestion.image;
    const correctAnswer = currentQuestion.answer.toUpperCase();
    const isCorrectAnswer = inputValue.toLowerCase() === correctAnswer.toLowerCase();
    if (isCorrectAnswer) {
      setInputValue('Correct!')
      setCorrectCount(correctCount + 1);
      new Audio(correctSound).play();
          setTimeout(() => {
            setResult("");
            }, 2000);
    } else {
      setInputValue(`Incorrect. The answer is ${correctAnswer}.`);
      setIncorrectCount(incorrectCount + 1);
      new Audio(incorrectSound).play();
      setTimeout(() => {
      setResult("");
    }, 2000);
    }

    setShowResult(true); 
    setTimeout(() => {
      setShowResult(false);
      generateRandomQuestion();
    }, 2000);

    const checkButton = document.querySelector('.Check');
    if (checkButton && checkButton.classList) {
      checkButton.classList.add('disabled');
    }
  };

  const handleInputChange = (event) => {
    const previousValue = inputValue;
    const newValue = event.target.value;

    setInputValue(newValue);
    setIsCheckDisabled(false);

    if (newValue.length > previousValue.length) {
      const newLetter = newValue.slice(-1).toUpperCase();
      playLetterSound(newLetter);
    }
  };

  const playLetterSound = async (letter) => {
    const audioPath = await import(`../../sounds/${letter}.mp3`);
    new Audio(audioPath.default).play();
  };

  const handleKeyPress = useCallback(
    throttle((event) => {
      if (inputValue === '') {
        return;
      }
      const keyPressed = event.key.toUpperCase();
      const lastLetter = inputValue.slice(-1).toUpperCase();

      if (keyPressed === lastLetter) {
        const newInputValue = inputValue.slice(0, -1);
        setInputValue(newInputValue);
        checkAnswer();
        playLetterSound(lastLetter);
      } else {
        playLetterSound(keyPressed);
      }
    }, 300),
    [inputValue, checkAnswer, playLetterSound]
  );

  const addLetter = (letter) => {
    setInputValue(inputValue + letter);
    setIsCheckDisabled(false);
    playLetterSound(letter);
  };
 
  const eraseLetter = () => {
    setInputValue(inputValue.slice(0, -1));
    setIsCheckDisabled(false);
  };

  const nextQuestion = () => {
    generateRandomQuestion();
  };

  return (
    <>
      <div className="PhonicsGame">
      <IconButton onClick={goBack} style={{ position: 'absolute', top: 10, left: 10 }}>
        <ArrowBackIcon />
      </IconButton>
        <h1 className="Title">Minibeast Phonics</h1>
        <div>
          <div className="BodyText">{question}</div>
          {currentQuestion && (
            <img src={currentQuestion.image} alt="Insect" key={currentQuestion.id} />
          )}
          <div className="input-check-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Enter answer"
            />
            {showResult && ( 
              <div className="result">{result}</div>
            )}
            <button
              className="Check"
              onClick={checkAnswer}
              onMouseLeave={stopAudio}
            >
              Check
            </button>
          </div>

          <div className="buttons-container">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <button key={letter} onClick={() => addLetter(letter)}>
                {letter}
              </button>
            ))}
            <button
              className="Erase"
              onClick={eraseLetter}
              onMouseEnter={() => playAudio(process.env.PUBLIC_URL + '/sounds/erase.mp3')}
              onMouseLeave={stopAudio}
            >
              Erase
            </button>
          </div>
        </div>
      </div>
      <div className="score">
        <div>
          Correct: {correctCount}  |  Incorrect: {incorrectCount}
        </div>
      </div>
      <div className="start-button-container">
      </div>
    </>
  );
}

export default PhonicsGame;