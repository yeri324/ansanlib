import React, { useState, } from 'react';
import LibInfoSelect from './LibInfoSelect';
import LibInfoData from './LibInfoData';
import ansanMap from '../../images/libInfo/map.png';
import locMark from '../../images/libInfo/location.png'
import Header from '../header/header';
import Footer from '../footer/footer';
import "./LibInfo.css";

const LibInfo = () => {


    const data = LibInfoData();
    const [category, setCategory] = useState(Object.keys(data)[0]);
    const [firstOption, setFirstOption] = useState(Object.keys(data[category])[0]);
    const [secondOption, setSecondOption] = useState(Object.keys(data[category][firstOption])[0]);
    const [selectedItem, setSelectedItem] = useState(data[category][firstOption][secondOption]);

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
        <>
            <Header />
            <div className='page-header'>
                <h2 className='page-header-name'>도서관</h2>
            </div>
            <div className='libInfo-page'>
                <div >
                    <LibInfoSelect
                        category={category}
                        firstOption={firstOption}
                        secondOption={secondOption}
                        onSelectCategory={onSelectCategory}
                        onFirstOptionChange={onFirstOptionChange}
                        onSecondOptionChange={onSecondOptionChange}
                    />
                </div>
            <div className='libMapImg'>
                <img className="ansanMap" src={ansanMap} alt='안산시 지도' />
                <img className="locMark" src={locMark} style={{top:`${selectedItem.yloc}px`,left:`${selectedItem.xloc}px`}}/>
            </div>

            <div className='libInfo'>
                    <h3>{selectedItem.name}</h3> <a href={selectedItem.homepage} target="_blank" style={{backgroundColor:'#aaa'}}>도서관이동 ▷</a>
                    <p><span>휴무일</span>  {selectedItem.holyday}</p>
                    <p><span>주소</span> {selectedItem.address}</p>
                    <p><span>전화</span> {selectedItem.phone}</p>
                    <p><span>오시는길</span> <a href={selectedItem.map} target="_blank">지도보기 ▷</a></p>
                </div>
            </div>
            <Footer />

        </>
    );
}

export default LibInfo;