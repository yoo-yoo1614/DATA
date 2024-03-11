// ResultPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const [photoData, setPhotoData] = useState(location.state.photoData);
  const [profession, setProfession] = useState('Detecting...');

  useEffect(() => {
    // Call external API or library to detect profession using photoData
    // Update profession state with detected profession
  }, [photoData]);

  return (
    <div>
      <h1>Result Page</h1>
      <img src={photoData} alt="Captured Photo" />
      <p>Profession: {profession}</p>
    </div>
  );
}

export default ResultPage;
