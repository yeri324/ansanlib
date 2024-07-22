import React, { useState } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import organ4 from '../../images/organization/organ4.png';
import organ5 from '../../images/organization/updateorgan5_update.png';
import './Organ.css';

const Organ = () => {
    const [activeTab, setActiveTab] = useState("중앙도서관");

    const handleTabClick = (libraryName) => {
        setActiveTab(libraryName);
    };

    return (
        <>
            <Header />
            <div className='page-header'>
                <h2 className='page-header-name'>조직도</h2>
            </div>

            <div className="organization-page">
                <ul className="tap " >
                    <li className={`tapTit ${activeTab === "중앙도서관" ? "on" : ""}`} onClick={() => handleTabClick("중앙도서관")}>중앙도서관</li>
                    <li className={`tapTit ${activeTab === "감골도서관" ? "on" : ""}`} onClick={() => handleTabClick("감골도서관")}>감골도서관</li>
                    <li className={`tapTit ${activeTab === "관산도서관" ? "on" : ""}`} onClick={() => handleTabClick("관산도서관")}>관산도서관</li>
                    <li className={`tapTit ${activeTab === "미디어도서관" ? "on" : ""}`} onClick={() => handleTabClick("미디어도서관")}>미디어도서관</li>
                    <li className={`tapTit ${activeTab === "월피예술도서관" ? "on" : ""}`} onClick={() => handleTabClick("월피예술도서관")}>월피예술도서관</li>
                </ul>
                <div>
                    {activeTab === "중앙도서관" && (
                        <div>
                            <img src={organ4} alt="중앙도서관 조직도" />
                            <div className="table">
                                <h3 className="caption">중앙도서관</h3>
                                <table className="tbl-trip bg">
                                    <tbody>
                                        <tr>
                                            <th>직위</th>
                                            <th>업무</th>
                                            <th>전화번호</th>
                                        </tr>
                                        <tr>
                                            <td>중앙도서관장</td>
                                            <td>중앙도서관 업무 총괄</td>
                                            <td>031-481-2701</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table">
                                <h3 className="caption">독서행정팀</h3>
                                <table className="tbl-trip bg">
                                    <tbody>
                                        <tr>
                                            <th>직위</th>
                                            <th>업무</th>
                                            <th>전화번호</th>
                                        </tr>
                                        <tr>
                                            <td>독서행정팀장</td>
                                            <td>독서행정업무 총괄</td>
                                            <td>031-481-2706</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>도서관 중장기발전계획</td>
                                            <td>031-481-2709</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>민간위탁작은도서관 관리</td>
                                            <td>031-481-2707</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>서무</td>
                                            <td>031-481-3869</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>사립작은도서관 지원, 스마트도서관 운영</td>
                                            <td>031-481-3864</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>회계,예산</td>
                                            <td>031-481-2708</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table">
                                <h3 className="caption">독서진흥팀</h3>
                                <table className="tbl-trip bg">
                                    <tbody>
                                        <tr>
                                            <th>직위</th>
                                            <th>업무</th>
                                            <th>전화번호</th>
                                        </tr>
                                        <tr>
                                            <td>독서진흥팀장</td>
                                            <td>독서진흥팀 업무총괄</td>
                                            <td>031-481-3861</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>장서개발 계획수립 및 추진</td>
                                            <td>031-481-3868</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>안산의책</td>
                                            <td>031-481-3865</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>지역서점대출, 문화의 날</td>
                                            <td>031-481-3863</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>문헌자료실, 인력관리</td>
                                            <td>031-481-3866</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>어린이자료실, 독서감상작 전국공모전</td>
                                            <td>031-481-3860</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table">
                                <h3 className="caption">시설운영팀</h3>
                                <table className="tbl-trip bg">
                                    <tbody>
                                        <tr>
                                            <th>직위</th>
                                            <th>업무</th>
                                            <th>전화번호</th>
                                        </tr>
                                        <tr>
                                            <td>시설운영팀장</td>
                                            <td>단원구 공공 및 작은도서관 시설운영 총괄</td>
                                            <td>031-481-3347</td></tr><tr><td>주무관</td>
                                            <td>도서관리 정보시스템(S/W, H/W) 운영관리</td>
                                            <td>031-481-3871</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>도서관 건립 등 지시사항관리</td>
                                            <td>031-481-3341</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>도서관 통신시설용 시설(UPS포함) 관리</td>
                                            <td>031-481-3349</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === "감골도서관" && (
                        <div>
                            <img src={organ5} alt="감골도서관 조직도" />
                            <div className="table">
                                <h3 className="caption">감골도서관</h3>
                                <table className="tbl-trip bg">
                                    <tbody>
                                        <tr>
                                            <th>직위</th>
                                            <th>업무</th>
                                            <th>전화번호</th>
                                        </tr>
                                        <tr>
                                            <td>감골도서관장</td>
                                            <td>감골도서관 업무 총괄</td>
                                            <td>031-481-3701</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table">
                                <h3 className="caption">독서행정팀</h3>
                                <table className="tbl-trip bg">
                                    <tbody>
                                        <tr>
                                            <th>직위</th>
                                            <th>업무</th>
                                            <th>전화번호</th>
                                        </tr>
                                        <tr>
                                            <td>독서행정팀장</td>
                                            <td>독서행정팀 업무 총괄</td>
                                            <td>031-481-3705</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>장서관리</td>
                                            <td>031-481-2669</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>계약, 회계</td>
                                            <td>031-481-2759</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>문헌자료실운영, 지역서점바로대출제운영</td>
                                            <td>031-481-2668</td>
                                        </tr>
                                        <tr><td>주무관</td>
                                            <td>일반서무</td>
                                            <td>031-481-3706</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>어린이자료실 운영, 주간행사</td>
                                            <td>031-481-3704</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table">
                                <h3 className="caption">시설운영팀</h3>
                                <table className="tbl-trip bg">
                                    <tbody>
                                        <tr>
                                            <th>직위</th>
                                            <th>업무</th>
                                            <th>전화번호</th>
                                        </tr>
                                        <tr>
                                            <td>시설운영팀장</td>
                                            <td>도서관 시설운영 총괄</td>
                                            <td>031-481-3702</td>
                                        </tr>
                                        <tr><td>주무관</td>
                                            <td>인력관리</td>
                                            <td>031-481-3703</td>
                                        </tr>
                                        <tr>
                                            <td>주무관</td>
                                            <td>시설유지관리</td>
                                            <td>031-481-2667</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === "관산도서관" && (
                        <div className="table">
                            <h3 className="caption">관산도서관</h3>
                            <table className="tbl-trip bg">
                                <tbody>
                                    <tr>
                                        <th>직위</th>
                                        <th>업무</th>
                                        <th>전화번호</th>
                                    </tr>
                                    <tr>
                                        <td>관산도서관장</td>
                                        <td>관산도서관 업무 총괄</td>
                                        <td>031-481-2750</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>관산도서관 청사 유지관리 및 민원처리</td>
                                        <td>031-481-3881</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>어린이자료실운영</td>
                                        <td>031-481-3853</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>시민대상 독서운동</td>
                                        <td>031-481-2754</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>개관연장사업 운영</td>
                                        <td>031-481-3845</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>장서관리, 업무보고</td>
                                        <td>031-481-3884</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>대부도서관 운영</td>
                                        <td>031-481-3956</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === "미디어도서관" && (
                        <div className="table">
                            <h3 className="caption">미디어도서관</h3>
                            <table className="tbl-trip bg">
                                <tbody>
                                    <tr>
                                        <th>직위</th>
                                        <th>업무</th>
                                        <th>전화번호</th>
                                    </tr>
                                    <tr>
                                        <td>미디어도서관팀장</td>
                                        <td>미디어도서관 업무 총괄</td>
                                        <td>031-481-3889</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>시설물 관리, 사회복무요원 관리, 용역 관리</td>
                                        <td>031-481-3875</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>전자책, 제1,2영어자료실 관리, 정기 간행물</td>
                                        <td>031-481-3348</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>미디어 행사, 미디어창작공간 관리</td>
                                        <td>031-481-3890</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>미디어자료실 관리</td>
                                        <td>031-481-3867</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>원고잔도서관 운영</td>
                                        <td>031-481-3859</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === "월피예술도서관" && (
                        <div className="table">
                            <h3 className="caption">월피예술도서관</h3>
                            <table className="tbl-trip bg">
                                <tbody>
                                    <tr>
                                        <th>직위</th>
                                        <th>업무</th>
                                        <th>전화번호</th>
                                    </tr>
                                    <tr>
                                        <td>월피예술도서관장</td>
                                        <td>월피예술도서관 업무 총괄</td>
                                        <td>031-369-1761</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>업무보고, 장서관리</td>
                                        <td>031-369-1754</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>서무, 인력관리</td>
                                        <td>031-369-1758</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>문화행사</td>
                                        <td>031-369-1753</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>청사 시설물 유지관리</td>
                                        <td>031-369-1752</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>반월도서관 운영</td>
                                        <td>031-481-2662</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>수암도서관 운영</td>
                                        <td>031-369-1594</td>
                                    </tr>
                                    <tr>
                                        <td>주무관</td>
                                        <td>수암도서관 운영</td>
                                        <td>031-369-1715</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Organ;
