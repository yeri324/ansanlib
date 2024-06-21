import React from 'react';
import './footer.css';


const Footer = () => {



  return (
    <div class="full_footer">
		<div class="top">
			<ul class="footer_menu">
				<li class="menu_item">
					<a class="footer_link" href="#">이메일추출방지정책</a>
				</li>
				<li class="menu_item">
					<a class="footer_link" href="#">개인정보처리방침</a>
				</li>
				<li class="menu_item">
					<a class="footer_link" href="#">도서관행정서비스헌장</a>
				</li>
				<li class="menu_item">
					<a class="footer_link" href="#">도서관윤리선언</a>
				</li>
			</ul>
		</div>
		<div class="bottom">
			<div class="footer_logo">
				
			</div>
			<div class="footer_content">
				<address>
					중앙능력개발원
					안산시 통합 도서관 프로젝트
				</address>
			</div>
			<div class="footer_more">
			</div>
		</div>
	</div>

  );
};




export default Footer;