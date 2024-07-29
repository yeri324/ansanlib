import React, { useState, useEffect } from 'react';
import AdminHeader from "./AdminHeader";
import AdminSide from "./AdminSide";
import './Admin.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import HolidayDetail from '../modal/HolidayDetail';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import HolidayListTable from '../../admin/item/HolidayListTable';
import AdminBookRequestTable from '../item/AdminBookRequestTable';
import LibraryPage from '../../visit/LibraryPage';
import AdminBookListTable from '../item/AdminBookListTable';
import AdminRecBoardTable from '../item/AdminRecBoardTable';
import AdminLoanTable from '../item/AdminLoanTable';
import ansanMap from '../../../images/libInfo/map.png';
import locMark from '../../../images/libInfo/location.png';

const Admin = () => {
  const { axios } = useAuth();
  const [date, setDate] = useState(new Date());
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [bookRequests, setBookRequests] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchBook, setSearchBook] = useState([]);
  const [searchLoan, setSearchLoan] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [todayVisits, setTodayVisits] = useState(0); // 오늘의 방문자 수 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchHolidays(date);
    fetchBookRequests();
    fetchNewBooks();
    fetchLoans(); // Fetch the loan data on component mount
    fetchTodayVisits(); // Fetch today's visit count on component mount
  }, [date]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchSelectedDateHolidays(date);
    setShowDetail(true);
  };

  const fetchHolidays = (date) => {
    console.log("Fetching holidays for date:", date);

    axios({
      url: '/api/admin/holiday/list',
      method: 'get',
      params: {
        date: date.toISOString().split('T')[0]
      }
    }).then((response) => {
      console.log("Fetched holidays for current date:", response.data);
      setHolidays(response.data.result);
    }).catch((error) => {
      console.error("Error fetching holidays for current date:", error);
      setHolidays([]);
    });
  };

  const fetchSelectedDateHolidays = (date) => {
    const adjustDate = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const nextDate = adjustDate(date, 1);

    console.log("Fetching holidays for selected date:", nextDate);

    axios({
      url: '/api/admin/holiday/list',
      method: 'get',
      params: {
        date: nextDate.toISOString().split('T')[0]
      }
    }).then((response) => {
      console.log("Fetched holidays for selected date:", response.data);
      setSelectedHolidays(response.data.result);
    }).catch((error) => {
      console.error("Error fetching holidays for selected date:", error);
      setSelectedHolidays([]);
    });
  };

  const fetchBookRequests = () => {
    axios.get('/api/admin/book/request')
      .then(response => {
        setBookRequests(response.data.result);
        setSearchResult(response.data.result.slice(0, 3));
      })
      .catch(error => {
        console.error('Error fetching book requests:', error);
      });
  };

  const fetchNewBooks = () => {
    axios.get('/api/admin/book/list')
      .then(response => {
        setBookList(response.data);
        setSearchBook(response.data.slice(0, 3));
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  };

  const fetchLoans = () => {
    axios.get('/api/admin/book/loanlist')
      .then(response => {
        setSearchLoan(response.data.slice(0,3));
      })
      .catch(error => {
        console.error('Error fetching loan data:', error);
      });
  };

  const fetchTodayVisits = () => {
    axios.get('/api/visits/today')
      .then(response => {
        setTodayVisits(response.data);
      })
      .catch(error => {
        console.error('Error fetching today\'s visits:', error);
      });
  };

  const handleCloseModal = () => {
    setShowDetail(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-base">
        <AdminHeader />
        <AdminSide />
      </div>
      <main className="admin-main-main">
        <div className="admin-main-body">
          <div className="admin-main-dash-top"></div>
          <div className="admin-main-dash-body">
            <div className="admin-main-left" style={{ width: "25%" }}>
              <div className='admin-left-box1'>
                <h5>오늘은 &nbsp;<strong>{date.toISOString().split('T')[0]}</strong> &nbsp;입니다.</h5>
              </div>
              <div className="admin-left-box2 calendar-container">
                <Calendar
                  locale="en-US"
                  onClickDay={handleDateClick}
                  value={date}
                />
                <HolidayDetail
                  show={showDetail}
                  handleClose={handleCloseModal}
                  holidays={selectedHolidays}
                />
              </div>
              <div className="admin-left-box3">
                <h4><a href="admin/holiday/list">휴관 도서관</a></h4>
                <HolidayListTable holidays={holidays.slice(0, 3)} excludedColumns={['delete']} />
              </div>
            </div>
            <div className="admin-main-right" style={{ width: "75%" }}>
              <div className="admin-right-box1">
                <div className='admin-right-graph'>
                  <LibraryPage />
                </div>
                <div className='admin-right-graph'>
                  <strong>오늘의 방문자 수는</strong>
                  <br/> {todayVisits} 명 입니다.
                </div>
                <div className='admin-right-graph'>준비중입니다.</div>
                <div className='admin-right-graph'>준비중입니다.</div>
              </div>
              <div className="admin-right-box2">
                <div className='admin-box2-table'>
                  <h4><a href="admin/recboard/list">추천 도서</a></h4>
                  <AdminRecBoardTable limit={3} />
                </div>
                <div className='admin-box2-table'>
                  <h4><a href="admin/book/request">희망 도서</a></h4>
                  <AdminBookRequestTable searchResult={searchResult} excludedColumns={['count']} />
                </div>
              </div>
              <div className="admin-right-box2">
                <div className='admin-box2-table'>
                  <h4><a href="admin/book/list">신간 도서</a></h4>
                  <AdminBookListTable 
                    books={searchBook} 
                    excludedColumns={['total_count','img']} 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                  />
                </div>
                <div className='admin-box2-table'>
                  <h4><a href="admin/user/search">대출 목록</a></h4>
                  <AdminLoanTable loan={searchLoan} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <Admin />
      </Auth>
    </>
  );
}
