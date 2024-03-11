import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './filter.css'; 
import Image from './yn.png';

function FilterPage() {
  const [answer, setAnswer] = useState(''); // State to store the selected answer
  const navigate = useNavigate();

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value); // Update the answer state when the radio button selection changes
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected answer, for example, navigate based on the answer
    if (answer === 'yes') {
      // Navigate to a page if the answer is 'yes'
      navigate('/yesPage');
    } else if (answer === 'no') {
      // Navigate to a different page if the answer is 'no'
      navigate('/noPage');
    }
  };

  return (
    <div>
      <div className="nav-container"></div>
      <div className="head">
        <p> Did we get that right </p>
      </div>
      <div className="small">
        <img src={Image} alt="Sample Image" className='small'/>
        </div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="yes"
              checked={answer === 'yes'}
              onChange={handleAnswerChange}
            />
            Yes
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="no"
              checked={answer === 'no'}
              onChange={handleAnswerChange}
            />
            No
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    
  );
}

export default FilterPage;
