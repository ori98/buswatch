import BusInfo from "./BusInfo";
import "../LandingPage/index.css";

import * as client from "./client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBuses } from "./busReducer";

export default function TextBlock() {

    const dispatch = useDispatch();

    const [isDataFetched, setIsDataFetched] = useState(false);

    // multiple 23 buses
    const bus23buses = useSelector((state) => state.busReducer.buses);

    useEffect(() => {
        if (!isDataFetched) {
            client.getRoute23().then((response) => {
                const earliestDepartureTime = getEarliestDepartureTimeBus(response);
    
                if (!earliestDepartureTime.error) {
                    const newBuses = bus23buses.filter(bus => bus.busNo !== "23");
                    newBuses.push(earliestDepartureTime);
                    // Dispatch an action to set the state with this new array
                    dispatch(setBuses(newBuses)); 
                } else {
                    console.error(earliestDepartureTime.error);
                }
                setIsDataFetched(true);
            });
        }
    }, [dispatch]);

    return (
        <div id="textblock">
            <div id="textblock-container">
                <h1 id="textblock-title">What is Buswatch?</h1>
                <p id="textblock-content">
                    Quickly Access the information for the free buses: 23, 38 and 29.<br/><br/>
                    {bus23buses.map(bus => (
                        <BusInfo key={bus.busNo} busInfo={bus} />
                    ))}
                </p>
            </div>
        </div>
    );
}

function getEarliestDepartureTimeBus(response) {
    if (response && response.data && response.data.length > 0) {
        const validDepartures = response.data.filter(schedule => schedule.attributes.departure_time);

        if (validDepartures.length > 0) {
            const earliestDepartureBus = validDepartures[0];
            const busInfo = {
                busNo: earliestDepartureBus.relationships.route.data.id,
                departureTime: earliestDepartureBus.attributes.departure_time,
                predictedDepartureTime: (earliestDepartureBus.relationships.prediction.data 
                                         && earliestDepartureBus.relationships.prediction.data.id) ? 
                                         response.included.find(pred => pred.id === earliestDepartureBus.relationships.prediction.data.id).attributes.departure_time 
                                         : 'No prediction available'
            };
            return busInfo;
        } else {
            return { error: "No valid departure times in the next 1 hour." };
        }
    } else {
        return { error: "No bus information available." };
    }
}