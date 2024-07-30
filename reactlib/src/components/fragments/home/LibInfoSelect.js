import React from 'react';
import LibInfoData from './LibInfoData';

const LibInfoSelect=({setCategory,setSecondOption,setFirstOption,setSelectedItem, category, firstOption,secondOption, })=> {
    const data = LibInfoData();
    let firstOptions=Object.keys(data[category]);
    let secondOptions=Object.keys(data[category][firstOption]);

    const onSelectCategory = (e) => {
      setCategory(e);
      setFirstOption(Object.keys(data[e])[0]);
      setSecondOption(Object.keys(data[e][Object.keys(data[e])[0]])[0]);
      setSelectedItem(data[e][Object.keys(data[e])[0]][Object.keys(data[e][Object.keys(data[e])[0]])[0]]);

  }
  const onFirstOptionChange = (e) => {
      setFirstOption(e);
      setSecondOption(Object.keys(data[category][e])[0]);
      setSelectedItem(data[category][e][Object.keys(data[category][e])[0]]);
  }
  const onSecondOptionChange = (e) => {
      setSecondOption(e);
      setSelectedItem(data[category][firstOption][e]);
  }

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
