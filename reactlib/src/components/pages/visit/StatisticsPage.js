import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const StatisticsPage = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/visits');
        const data = response.data;

        const visitCounts = data.reduce((acc, visit) => {
          const date = new Date(visit.timestamp).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(visitCounts),
          datasets: [
            {
              label: 'Number of Visits',
              data: Object.values(visitCounts),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch visits', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Visit Statistics</h2>
      {chartData.labels.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>No visit data available</p>
      )}
    </div>
  );
};

export default StatisticsPage;
