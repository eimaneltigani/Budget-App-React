import React from "react";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto"
import { ArcElement } from 'chart.js';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/store/statisticsSlice";
import { theme } from "../tailwind";
Chart.register(ArcElement);



const Statistics = () => {

    const categories = useSelector(selectCategories);

    const [doughnut, setDoughnet] = useState({
        labels: [],
        data: []
    });

    useEffect(() => {
        setDoughnet({
            labels: categories.map(x => x.category),
            data: categories.map(x => x.totalCost)
        });
    }, [categories])

    const data = {
        labels: doughnut.labels,
        datasets: [{
            data: doughnut.data,
            backgroundColor: 
                Object.values(theme.colors.teal)  
        }],
    };

    return (
        <div>   
            <p class="text-2xl mb-1 font-bold">How do you spend?</p>
            <p class="font-bold">Here's a breakdown of your expenses:</p>
            <div class="max-h-96 -mt-20 py-4 min-w-0">
                <Doughnut 
                    data={data} 
                    options={{
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    font: {
                                        size: 17
                                    },
                                    padding: 30
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )

}

const mapStateToProps = ({ income, expenses }) => ({
    income,
    expenses
})

export default connect(mapStateToProps)(Statistics);