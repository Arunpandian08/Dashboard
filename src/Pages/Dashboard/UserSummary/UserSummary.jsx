import React, { useEffect, useMemo, useState } from 'react'
import './userSummary.css'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const UserSummary = ({ data }) => {
    const [postCount, setPostCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)
    const [todoCount, setTodoCount] = useState(0)

    let interval = 3000;

    useEffect(() => {
        const valueDisplays = [
            { endValue: data.posts.length, setCount: setPostCount },
            { endValue: data.comments.length, setCount: setCommentCount },
            { endValue: data.todos.length, setCount: setTodoCount }
        ]

        const counters = []
        valueDisplays.forEach(({ endValue, setCount }) => {
            let startValue = 0;
            let duration = Math.floor(interval / endValue);

            let counter = setInterval(() => {
                if (startValue < endValue) {
                    startValue++;
                    setCount(startValue);
                } else {
                    clearInterval(counter);
                }
            }, duration);
            counters.push(counter)
        })

        return () => {
            counters.forEach(clearInterval)
        }
    }, [data.posts.length, data.comments.length, data.todos.length])

    const chartData = useMemo(() => ({
        labels: ['Posts', 'Comments', 'Todos'],
        datasets: [
            {
                label: ['Posts', 'Comments', 'Todos'],
                data: [
                    data.posts ? data.posts.length : 0,
                    data.comments ? data.comments.length : 0,
                    data.todos ? data.todos.length : 0
                ],
                backgroundColor: [
                    "rgba(0, 0, 0, 0.948)",
                    "rgba(178, 138, 68,1)",
                    "rgba(133, 140, 147,1)"
                ]
            }
        ]
    }), [data.posts, data.comments, data.todos]);

    const chartOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'center',
            },
            tooltip: {
                enabled: true,
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    }
    return (
        <div className='user-summary'>
            <div className="wrapper">
                <div className="container chart">
                    <Doughnut data={chartData} options={chartOptions} />
                </div>
                <div className="container">
                    <i className="bi bi-postcard-heart-fill"></i>
                    <span className='num'>{postCount.toString().padStart(2, '0')}</span>
                    <span className='text'>Posts</span>
                </div>
                <div className="container">
                    <i className="bi bi-chat-dots-fill"></i>
                    <span className='num'>{commentCount.toString().padStart(2, '0')}</span>
                    <span className='text'>Comments</span>
                </div>
                <div className="container">
                    <i className="bi bi-calendar-range-fill"></i>
                    <span className='num'>{todoCount.toString().padStart(3, '0')}</span>
                    <span className='text'>Todos</span>
                </div>
            </div>

        </div>
    )
}

export default UserSummary