import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import "./Trends.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Trends() {
    const [query, setQuery] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);

        try {
            // Replace with your actual proxy backend URL
            const response = await fetch(`http://localhost:3000/api/trends?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            // Format data for Chart.js
            const timeline = data.timelineData;

            setChartData({
                labels: timeline.map(item => item.formattedTime),
                datasets: [{
                    label: `Interest in "${query}" (Past 5 Years)`,
                    data: timeline.map(item => item.value[0]),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false,
                }]
            });
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='trendsd'>
            <h1>Product Trend Search</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter product name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ padding: '10px', width: '300px' }}
                />
                <button onClick={handleSearch} style={{ padding: '10px 20px', marginLeft: '10px' }}>
                    Search
                </button>
            </div>

            {loading && <p>Loading 5 years of data...</p>}

            {chartData && (
                <div style={{ height: '400px', width: '100%' }}>
                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            )}
        </div>
    );
}
