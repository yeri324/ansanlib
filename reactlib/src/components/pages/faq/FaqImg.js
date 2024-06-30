import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import FaqItem from "./FaqItem";

const { Meta } = Card;

function FaqImg() {
  const [Datas, setDatas] = useState([]);

  useEffect(() => {
    axios.post("/api/data/list").then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        setDatas(response.data.dataInfo); //server 내 routes에서 지정
      } else {
        alert("상품을 가져오는데 실패했습니다.");
      }
    });
  });

  const renderCard = Datas.map((data, index) => {
    return (
      <div style={{ display: "Grid", placeItems: "center" }}>
        <Col lg={4} md={6} xs={16} key={index}>
          <Card
            style={{
              width: "350px",
              height: "20%",
              position: "relative",
              right: "50%",
            }}
            //ImageSlider에 images로 정보 전달
            cover={<FaqItem images={data.images} />}
          >
            <Meta
              title={data.title}
              description={`$${data.description}`}
            ></Meta>
          </Card>
        </Col>
      </div>
    );
  });

  return (
    <div>
        {/* card */}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <Row gutter={[20, 20]}>{renderCard}</Row>
      </div>
    </div>
  );
}

export default FaqImg;