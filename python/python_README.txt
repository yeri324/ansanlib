#collections, re, os 파이썬내장모듈
# 추가적으로 필요할 수 있는 패키지 설치 (konlpy 의존성)
# 전체 install
pip install Flask mariadb wordcloud matplotlib flask-cors konlpy pandas nltk JPype1-py3

#react-wordcloud 의존성 호환문제 버전 최신버전 다운로드
npm install react-wordcloud@latest d3@latest
# transition 함수 d3 최신버전 필요
npm install d3@latest

# 의존성 충돌 패치
npm install react-wordcloud --legacy-peer-deps

# 강제 패키지 설치
npm install react-wordcloud --force

# React 버전 호환성 확인 17 18 호환이 되지않는 경우, 다운그레이드 16
npm install react@16.14.0 react-dom@16.14.0

# 이후 npm install react-wordcloud 설치
npm install react-wordcloud

# 혹은 yarn 설치
npm install -g yarn


# 전체 설치 이후 호환문제 최신버전 설치 -> d3 최신버전 설치 -> 의존성 충돌패치 
# -> 안되면 버전 다운그레이드