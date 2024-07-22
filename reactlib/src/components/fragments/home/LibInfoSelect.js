import React from 'react';
import LibInfoData from './LibInfoData';

const LibInfoSelect=({ onSelectCategory, onFirstOptionChange, onSecondOptionChange, category, firstOption,secondOption, })=> {
    const data = LibInfoData();
    let firstOptions=Object.keys(data[category]);
    let secondOptions=Object.keys(data[category][firstOption]);

    console.log(firstOptions);

  return (
    <div className='info-select'>
          <div className='info-select-btn'>
                <button  className={category === '공공도서관' ? 'active' : ''} onClick={() => onSelectCategory('공공도서관')}>공공도서관</button>
                <button  className={category === '공립작은도서관' ? 'active' : ''} onClick={() => onSelectCategory('공립작은도서관')}>공립작은도서관</button>
                <button  className={category === '스마트도서관' ? 'active' : ''} onClick={() => onSelectCategory('스마트도서관')}>스마트도서관</button>
            </div>
  <div className='info-select-drop'>
      <select value={firstOption} onChange={(e) => onFirstOptionChange(e.target.value)}>
        {firstOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
        {(category!=="스마트도서관")&&
        <select value={secondOption} onChange={(e) => onSecondOptionChange(e.target.value)}>
          {secondOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      }
      </div>
    </div>
  );
}

export default LibInfoSelect;
