// const Home = () => {
//     return (
//         <div className="content-div">
//             <h1>Home page</h1>
//         </div>
//     );
// }
// export default Home;
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    // Example data for the chart
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="d-flex">
            {/* Navbar */}
          

            {/* Main Content */}
            <div className="content-div container-fluid">
                {/* <h1 className="my-4">Admin Dashboard</h1> */}

            <div className="col-12 d-flex">
            <div className="col-4 mb-4">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body">
                               <img src="images/img.png" alt="img"  style={{width:"100%"}}/>
                            </div>
                        </div>
                    </div>
                
                  
                </div>

                {/* Chart */}
                <div className="col-8">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sales Overview</h5>
                                <Bar data={chartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Home;
