import './FaqDetailForm.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FaqDetailForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [faqDetail, setFaqDetail] = useState();
    const [faqId, setFaqId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const writeTitle = e => setTitle(e.target.value);
    const writeContent = e => setContent(e.target.value);

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        axios.get(`/faq/detail/${id}`)
            .then((res) => {

                setFaqDetail(res.data);
            })
            .catch((err) => {
                setFaqDetail([]);
            });
    };

    function Send() {
        axios(
            {
              url: `/faq/detail/${id}`,
              method: 'put',
              data: {
                faqId:setFaqId,
                title:title,
                content:content
              }, 
              baseURL: 'http://localhost:8090',
            }
          ).then(function (response) {
            console.log(response.data);
          });
          navigate("/faq/list",{repalce:true});
    }

    return (
        <div>
            <p>수정하기</p>
            <input onChange={writeTitle} />
            <input onChange={writeContent} />
            <button onClick={()=> Send()}>수정</button>
            {faqDetail && faqDetail.map((item, index) => (
                    <div key={index} className="slide">

                        <div >
                            <tr>
                                <th>{item.id}</th>
                                <th>{item.title}</th>
                                <th>{item.content}</th>
                            </tr>
                        </div>

                    </div>
                ))}
        </div>
    );
};

export default FaqDetailForm;