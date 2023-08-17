
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
  import { Bar } from "react-chartjs-2";
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  const Charts = () => {
    const bardata = {    
    
        labels: ['Account', 'Audit', 'News', 'ICT', 'Programmes', 'Engineering', 'Legal', 'Procurement', 'CD&C', 'Sport & OB'],
          datasets: [
            {
              data: [20000, 50000, 80000, 90000, 70000, 20000,50000, 40000, 60000, 20000,80000,], // Example data values for each label
              backgroundColor: [
                // '#FF6384',
                '#36A2EB',
                '#36A2EB',
                
                // '#FFCE56',
                // '#33CC33',
                // '#8A2BE2',
                // '#FFA500',
              ], // Example colors for each segment
              hoverBackgroundColor: [
                '#49C2EB',
              ], // Example hover colors for each segment
            },
          ],       
      
    
  };
  const chartOptions = {
    responsive: true, // Adjust chart size responsively
    maintainAspectRatio: false, // Prevent chart from maintaining aspect ratio
    
  };
  
  return (
    <div className='w-[15rem] h-[10rem] md:w-[38rem] md:h-[17rem]'><Bar  data={bardata} options={chartOptions} /></div>
  )
};

export default Charts;