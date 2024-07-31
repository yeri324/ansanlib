import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import useAuth from '../../../hooks/useAuth';
import { format, subDays } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeeklyLoansChart = () => {
  const { axios } = useAuth();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/loanstatus/weekly');
        const loans = response.data;

        if (loans && Array.isArray(loans)) {
          const today = new Date();
          const lastWeek = Array.from({ length: 7 }, (_, i) => subDays(today, i)).reverse();
          const lastWeekDates = lastWeek.map(date => format(date, 'yyyy-MM-dd'));

          const dateCountMap = lastWeekDates.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
          }, {});

          loans.forEach(loan => {
            const date = loan.date;
            const count = loan.count;
            if (dateCountMap.hasOwnProperty(date)) {
              dateCountMap[date] += count;
            }
          });

          const dates = Object.keys(dateCountMap).map(date => format(new Date(date), 'MM-dd'));
          const counts = Object.values(dateCountMap);

          const data = {
            labels: dates,
            datasets: [
              {
                label: 'Weekly Loans',
                data: counts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: '#333'
              },
            ],
          };

          setChartData(data);
        } else {
          console.error('Invalid data format:', loans);
        }
      } catch (error) {
        console.error('Error fetching weekly loans:', error);
      }
    };

    fetchData();
  }, [axios]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>Weekly Loans</h4>
      <div style={{ height: '230px', width: '500px' }}>
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
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Loans'
                },
                min: 0,
                ticks: {
                  stepSize: 1,
                  callback: function(value) {
                    if (value % 1 === 0) {
                      return value;
                    }
                  }
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

export default WeeklyLoansChart;
