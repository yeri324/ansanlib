import React, { useState,useRef,useEffect } from 'react';

// const {kakao} = window;


const LibMap = () => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [clickedPosition, setClickedPosition] = useState(null);
  
    useEffect(() => {
      if (window.kakao) {
        // 지도 옵션 설정
        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시청 좌표
          level: 3,
        };
  
        // 지도 생성
        const kakaoMap = new window.kakao.maps.Map(mapContainer.current, mapOptions);
        setMap(kakaoMap);
  
        // 지도 클릭 이벤트 리스너 추가
        window.kakao.maps.event.addListener(kakaoMap, 'click', (mouseEvent) => {
          const latLng = mouseEvent.latLng;
          const lat = latLng.getLat();
          const lng = latLng.getLng();
          setClickedPosition({ lat, lng });
        });
      }
    }, []);
  
    return (
      <div>
        <div ref={mapContainer} style={{ width: '500px', height: '400px' }}></div>
        {clickedPosition && (
          <div>
            <p>Latitude: {clickedPosition.lat},<br/>longitude: {clickedPosition.lng},</p>
          </div>
        )}
      </div>
    );
  };
//     useEffect(()=>{
//         console.log(kakao)
//         var geocoder = new kakao.maps.services.Geocoder();

//         var callback = function(result, status) {
//             if (status === kakao.maps.services.Status.OK) {
//                 console.log(result);
//             }
//         };
        
        
//         // 밑의 '' 안에 주소를 한국말로 적어요. 예를들어 
//         // 서울특별시 강남구 어쩌구저쩌구 무슨무슨길  적은뒤에
//         // 콘솔창 열어보면 x: 222.223423, y:333.424242 이런식으로
//         // 소숫점 긴 숫자가 있을거에요.
//         // 그게 본인의 장소의 경도와 위도에요.
        
//         geocoder.addressSearch('서울', callback);

// 		//위에서 알아낸 x,y 값을 그대로! 밑이 괄호안에 y,x 순으로 넣어줘요.
        
//         // const container = document.getElementById('map');
//         // const options = {
//         //     center: new kakao.maps.LatLng(알아낸 y값, 알아낸 x 값),
//         //     level:3
//         // };
//         // const map = new kakao.maps.Map(container, options);
    
//     // 여기에도 넣어줘요 똑같이!
//         // var marker = new kakao.maps.Marker({
//         //     map: map,
//         //     position: new kakao.maps.LatLng( 알아낸 y값, 알아낸 x 값)
//         //   });
    
//           // 여기서는 지도에 푯말처럼 자기 장소이름이 떠요.
//         //    	예를들면 지도에 푯말이 있고 그위에 ' 미미네 분식가게' 처럼요!! 
//         //     밑에 장소이름 적은곳에 적어주시면 돼요.
            
//         //   var infowindow = new kakao.maps.InfoWindow({
//         //     content: '<div style="width:150px;color:black;text-align:center;padding:6px 0;font-size:0.8rem;">장소 이름</div>'
//         //   });
//         //   infowindow.open(map, marker);
//     },[])
   
 
//     return (

//                     <div id='map'>     
//                     </div>
//     );
// };

export default LibMap;