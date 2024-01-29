import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {baseURL } from "../../baseurl"

const PieChart = () => {
  const url = baseURL +`/general-ledger/`; 
  const [chartData, setChartData] = useState({
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: ['No data'], // Initial values, you can set these as per your requirement
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();

        // Assuming your API response has properties income and expense
        const { total_capital_amount, total_cashadvance_amount } = result;
        
        // Format the values with Naira sign
        const formattedIncome = `₦${total_capital_amount.toLocaleString()}`;
        const formattedExpense = `₦${total_cashadvance_amount.toLocaleString()}`;


        // Update the state with the new data
        setChartData({
          labels: ['Income ='+ ' '+ formattedIncome, 'Expense =' +' '+ formattedExpense],
          datasets: [
            {
              data: [total_capital_amount, total_cashadvance_amount ],
              
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]); // Empty dependency array means this effect runs once after the initial render

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className='w-[20rem] h-[10rem] md:w-[15rem] md:h-[15rem]'>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
