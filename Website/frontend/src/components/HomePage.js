import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 
import Image from './bg1.png';// Import the CSS file

function HomePage() {
  const [cameraAccess, setCameraAccess] = useState(false);

  const handleClick = () => {
    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        // If access is granted, set cameraAccess state to true
        setCameraAccess(true);
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="navbar-container">
        {/* Navbar elements */}
      </div>
      <div className="heading">

        <div className="he1"><h1>A Randomwalk Initiative</h1></div>

        <div className="he2">
          <h2> Click & Find <br/> your profession</h2>
        </div>
        <div className="pic">
        <img src={Image} alt="Sample Image" className='small'/>
        </div>
        {/* Link to CameraPage only if camera access is granted */}
        <div className='tap'>
          <h3>Click & Know your <br/> profession you belong too...</h3>
        {cameraAccess ? (
          <Link to="/camera">Open Camera</Link>
        ) : (
          <button onClick={handleClick}>Click</button>
        )}
        </div>
      </div>

      
    </div>
    </div>
  );
}

export default HomePage;
