import React, { useEffect } from "react";


const Kakao = () => {

    useEffect(() => {
        const { kakao } = window;

        if (kakao && kakao.maps) {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.3044336, 126.8212316),
                level: 3
            };
            const map = new kakao.maps.Map(container, options);

            // 마커가 표시 될 위치
            let markerPosition = new kakao.maps.LatLng(37.3044336, 126.8212316);

            // 마커를 생성
            const marker = new kakao.maps.Marker({
                position: markerPosition,
            });

            // 마커를 지도 위에 표시
            marker.setMap(map);
        }
    }, []);

    return (
        <div id="map" style={{
            width: '400px',
            height: '275px'
        }}></div>
    );
};

export default Kakao;
