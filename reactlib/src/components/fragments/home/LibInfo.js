import React, { useState,useEffect } from 'react';
import LibInfoSelect from './LibInfoSelect';
import LibInfoData from './LibInfoData';

const LibInfo = () => {
    const data = LibInfoData();
    const [category, setCategory] = useState(Object.keys(data)[0]);
    const [firstOption, setFirstOption] = useState(Object.keys(data[category])[0]);
    const [secondOption, setSecondOption] = useState(Object.keys(data[category][firstOption])[0]);
    const [selectedItem, setSelectedItem] = useState(data[category][firstOption][secondOption]);

    const onSelectCategory=(e)=>{
        setCategory(e);
    }
    const onFirstOptionChange=(e)=>{
        setFirstOption(e);
    }
    const  onSecondOptionChange=(e)=>{
        setSecondOption(e);
    }
   
 useEffect=(()=>{
    console.log(category);
    console.log(firstOption);
    console.log(secondOption);
 },[category]);
    
    return (
        <div>

            <LibInfoSelect
                category={category}
                firstOption={firstOption}
                secondOption={secondOption}
                onSelectCategory={onSelectCategory}
                onFirstOptionChange={onFirstOptionChange}
                onSecondOptionChange={onSecondOptionChange}
            />


            <div>
                <p>이름 : {selectedItem.name}</p>
                <p>휴무일 : {selectedItem.holyday}</p>
                <p>주소 : {selectedItem.address}</p>
                <p>전화 : {selectedItem.phone}</p>
            </div>
        </div>
    );
}

export default LibInfo;