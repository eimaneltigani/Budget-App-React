import React from "react";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto"
import { ArcElement } from 'chart.js';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/store/statisticsSlice";
import { theme } from "../tailwind";
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
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
            <h2 css={tw`text-2xl mb-1 font-bold`}>How do you spend?</h2>
            <p>Here's a breakdown of your expenses:</p>
            <div css={tw`max-h-96 -mb-8 w-full flex justify-center items-center py-3`}>
                <Doughnut 
                    data={data} 
                    options={{
                        aspectRatio: 1.5,
                        plugins: {
                            legend: {
                                // position: 'left',
                                labels: {
                                    font: {
                                        size: 15
                                    },
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            }
                        },
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