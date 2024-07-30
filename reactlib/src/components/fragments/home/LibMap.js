import React, { useState,useRef,useEffect } from 'react';

// const {kakao} = window;


const LibMap = ({ latitude,longitude}) => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
  
    useEffect(() => {
        const mapOptions = {
            center: new window.kakao.maps.LatLng(latitude, longitude), 
            level: 3,
          };
    
          // 지도 생성
          const kakaoMap = new window.kakao.maps.Map(mapContainer.current, mapOptions);
          setMap(kakaoMap);
    
          // 마커 생성
          const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
          const kakaoMarker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          kakaoMarker.setMap(kakaoMap); // 마커를 지도에 표시
          setMarker(kakaoMarker); // 마커 상태 업데이트

    }, [latitude,longitude]);
  
    return (
      <div>
        <div ref={mapContainer} style={{ width: '100%', height: '380px' }}></div>
     
      </div>
    );
  };

export default LibMap;