import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import useAuth from '../../../hooks/useAuth';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeeklyVisitsChart = () => {
  const { axios } = useAuth();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/visits/weekly');
        const visits = response.data;
        console.log(visits); // 데이터를 확인하는 로그 추가

        if (visits && Array.isArray(visits)) {
          const dates = visits.map(visit => format(new Date(visit.date), 'MM-dd'));
          const counts = visits.map(visit => visit.count);

          const data = {
            labels: dates,
            datasets: [
              {
                label: 'Weekly Visits',
                data: counts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1, // 선의 굽음 설정 (0이면 직선)
                borderWidth: 2, // 선 두께 설정
                pointRadius: 3, // 포인트 크기 설정
                pointBackgroundColor: 'rgba(75, 192, 192, 1)' // 포인트 색상 설정
              },
            ],
          };

          setChartData(data);
        } else {
          console.error('Invalid data format:', visits);
        }
      } catch (error) {
        console.error('Error fetching weekly visits:', error);
      }
    };

    fetchData();
  }, [axios]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>Weekly Visits</h4>
      <div style={{ height: '250px', width:'500px'}}>
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Visits'
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    </div>
  );
};

export default WeeklyVisitsChart;
