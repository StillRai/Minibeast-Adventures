import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';
import { IconButton, Modal, Box } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import asaruMessageVideo from '../videos/0412.mp4';

function StartScreen() {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
    return () => {
      context.close();
    };
  }, []);

  const playAudio = async (src) => {
    if (audioSource) {
      audioSource.stop();
    }

    if (!audioBuffer) {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(buffer);
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
    setAudioSource(source);
  };

  const stopAudio = () => {
    if (audioSource) {
      audioSource.stop();
      setAudioSource(null);
    }
  };

  const renderModal = () => {
    return (
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          className="modal-content"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: '60%',
            minHeight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <IconButton
            onClick={() => setOpenModal(false)}
            color="inherit"
            aria-label="close modal"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2 id="modal-title" className='Home-Modal'>About the Game</h2>
          <div className="modal-description">
            <p id="modal-description">
              Welcome to the Minibeast Adventure! <br /> <br /> Hi, I hope you enjoy this fun project that I made with my mom. It has lots of different games about cute and tiny creatures called minibeasts. Each game has 10 rounds of questions, and you can find out your overall score at the end. There are nice sounds in the game, so make sure your volume is just right. Have a great time playing! Asaru, Year Reception.
            </p>
          </div>
          <video src={asaruMessageVideo} controls></video>
        </Box>
      </Modal>
    );
  };

  return (
    <div className="StartScreen">
      <h1>Minibeast Adventures</h1>
      <IconButton className='transparent-butto'
        onClick={() => setOpenModal(true)}
        color="primary"
                aria-label="open game info modal"
      >
        <HelpIcon style={{ fontSize: 50, color: "#942543", }} />
      </IconButton>
      <button onClick={() => navigate('/math-game')}>Start Math Game</button>
      <button onClick={() => navigate('/quiz-game')}>Start Minibeast Quiz</button>
      <button onClick={() => navigate('/phonics-game')}>Start Minibeast Phonics</button>
      {renderModal()}
    </div>
  );
}

function MinibeastApp() {
  return (
    <div className="App">
      <StartScreen />
    </div>
  );
}

export default MinibeastApp;