import React from 'react';
import './footer.css';
import footer_logo from '../../images/logo/footer_logo.png';

const Footer = () => {
    return (
        <div id="full_footer">
            <div id="footer_content_container">
                <div className="top">
                    <ul className="footer_menu">
                        <li className="menu_item">
                            <a className="footer_link" href="#">이메일추출방지정책</a>
                        </li>
                        <li className="menu_item">
                            <a className="footer_link" href="#">개인정보처리방침</a>
                        </li>
                        <li className="menu_item">
                            <a className="footer_link" href="#">도서관행정서비스헌장</a>
                        </li>
                        <li className="menu_item">
                            <a className="footer_link" href="#">도서관윤리선언</a>
                        </li>
                    </ul>
                </div>
                <div className="bottom">
                    <div className="footer_logo">
                        <img src={footer_logo} alt="Footer Logo" />
                    </div>
                    <div className="footer_content">
                        <address>
                            중앙능력개발원<br />
                            안산시 통합 도서관 프로젝트
                        </address>
                    </div>
                    <div className="footer_more">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
