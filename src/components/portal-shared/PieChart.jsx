
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';
  import { Pie, } from "react-chartjs-2";
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  const PieChart = () => {
 
  const chartOptions = {
    responsive: true, // Adjust chart size responsively
    maintainAspectRatio: false, // Prevent chart from maintaining aspect ratio
   
  };
  const data = {
    labels: ['Aproved', 'Not Aproved', ],
      datasets: [
        {
          data: [12, 19, ], // Example data values for each label
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            
            // '#FFCE56',
            // '#33CC33',
            // '#8A2BE2',
            // '#FFA500',
          ], // Example colors for each segment
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            // '#FFCE56',
            // '#33CC33',
            // '#8A2BE2',
            // '#FFA500',
          ], // Example hover colors for each segment
        },
      ],
    };
  return (
    <div className='w-[20rem] h-[10rem] md:w-[15rem] md:h-[15rem]'><Pie  data={data} options={chartOptions} /></div>
  )
};
export default PieChart;
