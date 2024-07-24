import React, { useState } from 'react';
import './History.css';
import image2020s from '../../images/history/현재-2020.png';
import image2010s from '../../images/history/2010.png';
import image2000s from '../../images/history/2000.png';
import image1990s from '../../images/history/1990.png';
import Header from '../header/header';
import Footer from '../footer/footer';

const images = {
  '2020s': image2020s,
  '2010s': image2010s,
  '2000s': image2000s,
  '1990s': image1990s,
};

function History() {
  const [selectedImage, setSelectedImage] = useState('2020s');

  return (
    <>
      <Header />
      <div className='page-header'>
        <h2 className='page-header-name'>연혁</h2>
      </div>
      <div className="history-page">
        <div className="buttons">
          {Object.keys(images).map((period) => (
            <button
              key={period}
              className={selectedImage === period ? 'active' : ''}
              onClick={() => setSelectedImage(period)}
            >
              {period}
            </button>
          ))}
        </div>
        <div className="image-container">
          <img src={images[selectedImage]} alt={selectedImage} />
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default History;