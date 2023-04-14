import React from 'react';
import { Link } from 'react-router-dom';
import video from '../videos/Asaru_message.mp4';

function Information({ onClose }) {
  return ( 
    <div className="Information">
      <video controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="back-button" onClick={onClose}>Back</button>
    </div>
  );
}

export default Information;
