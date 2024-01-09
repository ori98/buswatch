import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BusInfo({ busInfo }) {
    const [timeUntilArrival, setTimeUntilArrival] = useState('');

    useEffect(() => {
        const calculateTimeUntilArrival = () => {
            const currentTime = new Date();
            const departureTime = new Date(busInfo.predictedDepartureTime);
            const timeDiff = departureTime - currentTime;

            if (timeDiff > 0) {
                const minutes = Math.floor(timeDiff / 60000);
                const seconds = ((timeDiff % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            } else {
                return 'Arriving';
            }
        };

        const timer = setInterval(() => {
            setTimeUntilArrival(calculateTimeUntilArrival());
        }, 1000);

        return () => clearInterval(timer);
    }, [busInfo.predictedDepartureTime]);

    // function to format date and time
    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} at ${formattedTime}`;
    };

    return (
        <Card className="text-white" style={{ borderRadius: '15px', backgroundColor: 'transparent', borderColor: '#fff' }}>
            <Card.Body>
                <Card.Title style={{ fontSize: '2rem', textAlign: 'center' }}>Bus {busInfo.busNo}</Card.Title>
                <Card.Text style={{ fontSize: '1rem', textAlign: 'left' }}>
                    Departure Time: {formatDateTime(busInfo.departureTime)}<br />
                    Time Until Arrival: {timeUntilArrival}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
