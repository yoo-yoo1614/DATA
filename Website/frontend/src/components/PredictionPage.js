// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function PredictionPage() {
//   const location = useLocation();
//   const { image } = location.state;
//   const navigate = useNavigate();

//   const goToFilterPage = () => {
//     // Replace 'https://example.com' with the actual external URL
//     window.open('https://demo-mauve-mu.vercel.app/', '_blank');
//   };

//   return (
//     <div>
//       <h1>Prediction Page</h1>
//       <img src={image} alt="Captured Image" />
//       <button onClick={goToFilterPage}>Filter Page</button>
//       {/* Add prediction logic here */}
//     </div>
//   );
// }

// export default PredictionPage;


// //serverside
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// function PredictionPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { image, prediction } = location.state;
//   const [htmlContent, setHtmlContent] = useState(null);

//   useEffect(() => {
//     const fetchHtmlContent = async () => {
//       try {
//         const response = await fetch('http://localhost:3001');
//         const html = await response.text();
//         setHtmlContent(html);
//       } catch (error) {
//         console.error('Error fetching HTML content:', error);
//       }
//     };

//     fetchHtmlContent();
//   }, []);
  
//   const goToFilterPage = () => {
//     const maxConfidencePrediction = prediction.reduce((prev, current) =>
//       parseFloat(current.confidence) > parseFloat(prev.confidence) ? current : prev
//     );
//     const predictionClass = maxConfidencePrediction.class;
//     // Assuming your filter routes are named after the prediction classes
//     window.location.href = `http://localhost:3001/${predictionClass}/index.html`;
//   };

//   return (
//     <div>
//       <h1>Prediction Page</h1>
//       <img src={image} alt="Captured Image" />
//       {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>}
      
//       <div>
//         <p>Prediction Class: {prediction[0]?.class}</p>
//         <p>Confidence: {prediction[0]?.confidence}</p>
//         <button onClick={goToFilterPage}>Filter Page</button>
//       </div>
//     </div>
//   );
// }

// export default PredictionPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './prediction.css'; 

function PredictionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, prediction } = location.state;
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch('http://localhost:3001');
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    fetchHtmlContent();

    // Navigate to filter page after 5 seconds
    const timeoutId = setTimeout(goToFilterPage, 9000);

    // Clear the timeout when the component unmounts or when the effect runs again
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures this effect runs only once

  const goToFilterPage = () => {
    const maxConfidencePrediction = prediction.reduce((prev, current) =>
      parseFloat(current.confidence) > parseFloat(prev.confidence) ? current : prev
    );
    const predictionClass = maxConfidencePrediction.class;
    // Assuming your filter routes are named after the prediction classes
    window.location.href = `http://localhost:3001/${predictionClass}/index.html`;

  };

  return (
    <div>
      <div className="container">
        <div className="prediction-container">
          <img src={image} alt="Captured Image" className="Fullscreen-image"/>
          {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>}
          
          <div className="prediction-info">
            <p>It seems you are a: {prediction[0]?.class}</p>
            {/* <p className="confidence">Confidence: {prediction[0]?.confidence}</p> */}
          </div>
          </div>
        </div>
      </div>
   
  );
}

export default PredictionPage;
