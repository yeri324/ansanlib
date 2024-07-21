import React from 'react';
import LibInfoData from './LibInfoData';

function LibInfoSelect({ onSelectCategory, onFirstOptionChange, onSecondOptionChange, category, firstOption,secondOption, }) {
    const data = LibInfoData();
    const firstOptions=Object.keys(data[category]);
    const secondOptions=Object.keys(data[category][firstOption]);


  return (
    <div>
          <div>
                <button onClick={() => onSelectCategory('공공도서관')}>공공도서관</button>
                <button onClick={() => onSelectCategory('공립작은도서관')}>공립작은도서관</button>
                <button onClick={() => onSelectCategory('스마트도서관')}>스마트도서관</button>
            </div>
  
      <select value={firstOption} onChange={(e) => onFirstOptionChange(e.target.value)}>
        {firstOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

        <select value={secondOption} onChange={(e) => onSecondOptionChange(e.target.value)}>
          {secondOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

    </div>
  );
}

export default LibInfoSelect;
