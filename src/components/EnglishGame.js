import React, { useState, useEffect } from 'react';
import correctSound from '../sounds/correct.mp3'; 
import incorrectSound from '../sounds/incorrect.mp3';
import './EnglishGame.css';
import antImg from '../images/ant.png';
import beetleImg from '../images/beetle.png';
import butterflyImg from '../images/butterfly.png'; 
import dragonflyImg from '../images/dragonfly.png';
import spiderImg from '../images/spider.png';
import beeImg from '../images/bee.png';
import flyImg from '../images/fly.png';
import ladybirdImg from '../images/ladybird.png';
import wormImg from '../images/worm.png';
import q1 from '../sounds/q1.mp3';
import q2 from '../sounds/q2.mp3';
import q3 from '../sounds/q3.mp3';
import q4 from '../sounds/q4.mp3';
import q5 from '../sounds/q5.mp3';
import q6 from '../sounds/q6.mp3';
import q7 from '../sounds/q7.mp3';
import q8 from '../sounds/q8.mp3';
import q9 from '../sounds/q9.mp3';
import q10 from '../sounds/q10.mp3';
import q11 from '../sounds/q11.mp3';
import q12 from '../sounds/q12.mp3';
import q13 from '../sounds/q13.mp3';
import q14 from '../sounds/q14.mp3';
import q15 from '../sounds/q15.mp3';
import q16 from '../sounds/q16.mp3';
import q17 from '../sounds/q17.mp3';
import q18 from '../sounds/q18.mp3';
import q19 from '../sounds/q19.mp3';
import q20 from '../sounds/q20.mp3';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EnglishGame({ onStart }) {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [result, setResult] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [audio, setAudio] = useState(null);
  const [options, setOptions] = useState([]);
  const [firstRender, setFirstRender] = useState(true);


  const playAudio = (src) => {
    if (audio) audio.pause();
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

  const navigate = useNavigate();
  const goBack = () => {
    stopAudio()
    navigate('/'); 
  };

  useEffect(() => {
    if (!firstRender) generateRandomQuestion();
    else setFirstRender(false);
  }, [firstRender]);

  const questions = [
    { text: 'Which one transforms after being a caterpillar?', answer: 'Butterfly', audio: q1 },
    { text: 'which one has a fuzzy body and can collect nectar from flowers?', answer: 'Bee', audio: q2 },
    { text: 'Which one has a slim body and darts around in the air?', answer: 'Dragonfly', audio: q3 },
    { text: 'What has a spotted body with 6 legs?', answer: 'Ladybird', audio: q4 },
    { text: 'Which one has an exoskeleton and has over 350,000 different species?', answer: 'Beetle', audio: q5 },
    { text: 'Which one has a long, slim body and can be found slithering in the dirt?', answer: 'Worm', audio: q6 },
    { text: 'Which one has two wings and annoys you in your house?', answer: 'Fly', audio: q7 },
    { text: 'Which one has eight legs and is not actually an insect, but an arachnid?', answer: 'Spider', audio: q8 },
    { text: 'Which one has superhuman strength and works very hard in a colony?', answer: 'Ant', audio: q9 },
    { text: 'Which one has no eyes or ears and gets eaten by birds?', answer: 'Worm', audio: q10 },
    { text: 'Which one can create amazing webs to catch its prey?', answer: 'Spider', audio: q11 },
    { text: 'Which one has four wings and can fly in many different directions?', answer: 'Dragonfly', audio: q12 },
    { text: 'Which one has transparent wings, and uses their feet to taste?', answer: 'Butterfly', audio: q13 },
    { text: 'Which one can make honey and is known for its stinger?', answer: 'Bee', audio: q14 },
    { text: 'Which one has wings, but can also walk upside down, and see behind them?', answer: 'Fly', audio: q15 },
    { text: 'Which one can click its wings together to make a sound?', answer: 'Beetle', audio: q16 },
    { text: 'Which one has a species so big that it can catch and eat birds?', answer: 'Spider', audio: q17 },
    { text: 'Which one can communicate with other members of its hive through dance?', answer: 'Bee', audio: q18 },
    { text: 'Which one has a bright red or orange body with black spots and is good luck?', answer: 'Ladybird', audio: q19 },
    { text: 'Which one can be found living in water and has a long, thin body with six legs?', answer: 'Dragonfly', audio: q20 }
  ];

  const insects = [
    { name: 'Butterfly', image: butterflyImg },
    { name: 'Bee', image: beeImg },
    { name: 'Dragonfly', image: dragonflyImg },
    { name: 'Ladybird', image: ladybirdImg },
    { name: 'Beetle', image: beetleImg },
    { name: 'Worm', image: wormImg },
    { name: 'Fly', image: flyImg },
    { name: 'Spider', image: spiderImg },
    { name: 'Ant', image: antImg },
  ];

  const generateRandomQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCorrectAnswer(randomQuestion.answer);
    setQuestion(randomQuestion.text);
    setResult('');
    generateOptions(randomQuestion.answer);
    playAudio(randomQuestion.audio);
  };

  const generateOptions = (correctAnswer) => {
    const wrongAnswers = insects.filter(i => i.name !== correctAnswer).map(i => i.name);
    const shuffledAnswers = shuffleArray(wrongAnswers).slice(0, 2);
    shuffledAnswers.push(correctAnswer);
    setOptions(shuffleArray(shuffledAnswers));
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const checkAnswer = (chosenAnswer) => {
    if (chosenAnswer === correctAnswer) {
      setResult('Correct!');
      setCorrectCount(correctCount + 1);
      stopAudio();
      new Audio(correctSound).play();
    } else {
      setResult(`Incorrect. The answer is ${correctAnswer}.`);
      setIncorrectCount(incorrectCount + 1);
      stopAudio();
      new Audio(incorrectSound).play();
    }
    setTimeout(() => generateRandomQuestion(), 4000);
  };

  return (
    <div className="EnglishGame">
      <IconButton onClick={goBack} style={{ position: 'absolute', top: 10, left: 10 }}>
        <ArrowBackIcon />
      </IconButton> 
      <div className="score">Correct: {correctCount}&emsp;  |  &emsp;Incorrect: {incorrectCount}</div>
      <h1>Minibeast Quiz</h1>
      <div className="question">
        <div className="BodyText">{question}</div>
        <div className="options">
          {options.map((option, index) => (
            <img
              key={index}
              src={insects.find(i => i.name === option).image}
              alt={option}
              onClick={() => checkAnswer(option)}
            />
          ))}
        </div>
      </div>
      <div className="result">{result}</div>
    </div>
  );
}

export default EnglishGame;