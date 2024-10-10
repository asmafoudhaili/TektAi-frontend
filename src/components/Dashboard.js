import { Chart } from 'chart.js';
import jsvectormapMin from 'jsvectormap';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row ,Table} from 'react-bootstrap';
import  { useState } from 'react';
import DataTable from 'react-data-table-component';
import {chart as chartJS} from 'chart.js/auto';
import {Bar,Doughnut,Line} from 'react-chartjs-2';
import axios from "axios";


function Dashboard() {



    const [totalCompanies, setTotalCompanies] = useState(0);
    const [totalChallengers, setTotalChallengers] = useState(0);



    useEffect(() => {
        const fetchTotalCompanies = async () => {
          try {
            const response = await fetch(`http://localhost:9091/user/nombreCompanies`); // Assurez-vous d'ajuster l'URL selon votre configuration
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération du nombre total de sociétés');
            }
            const data = await response.json();
            setTotalCompanies(data.count);
          } catch (error) {
            console.error('Erreur lors de la récupération du nombre total de sociétés:', error.message);
          }
        };
    
        fetchTotalCompanies();
      }, []); 


      useEffect(() => {
        const fetchTotalChallengers = async () => {
          try {
            const response = await fetch(`http://localhost:9091/user/nombreChallengers`); // Assurez-vous d'ajuster l'URL selon votre configuration
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération du nombre total de sociétés');
            }
            const data = await response.json();
            setTotalChallengers(data.count);
          } catch (error) {
            console.error('Erreur lors de la récupération du nombre total de sociétés:', error.message);
          }
        };
    
        fetchTotalChallengers();
      }, []); 







	useEffect(() => {
        document.addEventListener("DOMContentLoaded", function () {
            var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
            var gradient = ctx.createLinearGradient(0, 0, 0, 225);
            gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
            gradient.addColorStop(1, "rgba(215, 227, 244, 0)");

            // Graphique en ligne
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: "Sales ($)",
                        fill: true,
                        backgroundColor: gradient,
                        borderColor: window.theme.primary,
                        data: [
                            2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438, 2917, 3327
                        ]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        intersect: false
                    },
                    hover: {
                        intersect: true
                    },
                    plugins: {
                        filler: {
                            propagate: false
                        }
                    },
                    scales: {
                        xAxes: [{
                            reverse: true,
                            gridLines: {
                                color: "rgba(0,0,0,0.0)"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                stepSize: 1000
                            },
                            display: true,
                            borderDash: [3, 3],
                            gridLines: {
                                color: "rgba(0,0,0,0.0)"
                            }
                        }]
                    }
                }
            });

            // Pie chart
            new Chart(document.getElementById("chartjs-dashboard-pie"), {
                type: "pie",
                data: {
                    labels: ["Chrome", "Firefox", "IE"],
                    datasets: [{
                        data: [4306, 3801, 1689],
                        backgroundColor: [
                            window.theme.primary,
                            window.theme.warning,
                            window.theme.danger
                        ],
                        borderWidth: 5
                    }]
                },
                options: {
                    responsive: !window.MSInputMethodContext,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    cutoutPercentage: 75
                }
            });

            // Bar chart
            new Chart(document.getElementById("chartjs-dashboard-bar"), {
                type: "bar",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: "This year",
                        backgroundColor: window.theme.primary,
                        borderColor: window.theme.primary,
                        hoverBackgroundColor: window.theme.primary,
                        hoverBorderColor: window.theme.primary,
                        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
                        barPercentage: .75,
                        categoryPercentage: .5
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            stacked: false,
                            ticks: {
                                stepSize: 20
                            }
                        }],
                        xAxes: [{
                            stacked: false,
                            gridLines: {
                                color: "transparent"
                            }
                        }]
                    }
                }
            });

            var markers = [{
                    coords: [31.230391, 121.473701],
                    name: "Shanghai"
                },
                {
                    coords: [28.704060, 77.102493],
                    name: "Delhi"
                },
                {
                    coords: [6.524379, 3.379206],
                    name: "Lagos"
                },
                {
                    coords: [35.689487, 139.691711],
                    name: "Tokyo"
                },
                {
                    coords: [23.129110, 113.264381],
                    name: "Guangzhou"
                },
                {
                    coords: [40.7127837, -74.0059413],
                    name: "New York"
                },
                {
                    coords: [34.052235, -118.243683],
                    name: "Los Angeles"
                },
                {
                    coords: [41.878113, -87.629799],
                    name: "Chicago"
                },
                {
                    coords: [51.507351, -0.127758],
                    name: "London"
                },
                {
                    coords: [40.416775, -3.703790],
                    name: "Madrid "
                }
            ];
            var map = new jsvectormapMin({
                map: "world",
                selector: "#world_map",
                zoomButtons: true,
                markers: markers,
                markerStyle: {
                    initial: {
                        r: 9,
                        strokeWidth: 7,
                        stokeOpacity: .4,
                        fill: window.theme.primary
                    },
                    hover: {
                        fill: window.theme.primary,
                        stroke: window.theme.primary
                    }
                },
                zoomOnScroll: false
            });
            window.addEventListener("resize", () => {
                map.updateSize();
            });

            var date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
            var defaultDate = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
            document.getElementById("datetimepicker-dashboard").flatpickr({
                inline: true,
                prevArrow: "<span title=\"Previous month\">&laquo;</span>",
                nextArrow: "<span title=\"Next month\">&raquo;</span>",
                defaultDate: defaultDate
            });
        });
    }, []);
    return (
       <>
	          <div class="row">

	   <div class="col-12 col-lg-8 col-xxl-9 d-flex">
							<div class="card flex-fill ">
								<div class="card-header">

									<h5 class="card-title mb-0">Number of Payments per month</h5>
								</div>
								<div class="card-body px-4">
								<Bar data={ {labels:['Janvier', 'février','mars' ,'avril'],
    datasets:[
      {
        label:"number of payments per month",
        data:[150, 200 ,175 , 220],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1},],}
  }
         />								</div>
							</div>
						</div>
	   
						

							<div class="col-12 col-lg-4 col-xxl-3 d-flex">
							<div class="card flex-fill w-100">
								<div class="card-header">

									<h5 class="card-title mb-0">Company and Challenged</h5>
								</div>
								<div className='card' style={{ width: '100%', padding: '15px' }}>
        <Doughnut data={ {labels:['company', 'challenger'],
    datasets:[
      {
        label:"company and challenger",
        data:[totalCompanies, totalChallengers ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', 
          'rgba(153, 102, 255, 0.2)',
        
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(153, 102, 255)',
       
        ],
        borderWidth: 1}, ], }
      }
         />
      </div>
							</div>
						</div>
						</div>
						<div class="col-12 col-lg-12 col-xxl-9 d-flex">
							<div class="card flex-fill">
								<div class="card-header">

									<h5 class="card-title mb-0">Number of Users per month</h5>
								</div>
								<div class="col-12 col-lg-12 col-xxl-9 d-flex">
								<div className='card' style={{ width: '100%', padding: '1px' }}>
        <Line data={ {labels:['Janvier', 'février','mars' ,'avril','mai','juin','juillet','aout'],
    datasets:[
      {
        label:"Number of users per month",
        data:[150, 200 ,175 , 220,500,130,146,210,320],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1},],}
  }
         />
      </div>										
									</div>
								</div>
							</div>
	   
					
					</>
    );
}

export default Dashboard;