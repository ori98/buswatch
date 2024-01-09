import axios from "axios";

const MBTA_URL = "https://api-v3.mbta.com";

export const getRoute23 = async () => {
    // Getting current date and time in EST
    const now = new Date();
    const options = { timeZone: "America/New_York" };

    // Format date as YYYY-MM-DD
    const year = now.toLocaleString("en-US", { ...options, year: 'numeric' });
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;
    
    const currentTime = now.toLocaleString("en-US", { ...options, hour: '2-digit', minute: '2-digit', hour12: false });
    const oneHourLater = new Date(now.getTime() + 60 * 60000).toLocaleString("en-US", { ...options, hour: '2-digit', minute: '2-digit', hour12: false });

    try {
        const response = await axios.get(`${MBTA_URL}/schedules`, {
            params: {
                "filter[route]": "23",
                "filter[stop]": "17862",
                "filter[min_time]": currentTime,
                "filter[max_time]": oneHourLater,
                "include": "prediction",
                "filter[date]": formattedToday,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Error response:", error.response.data); 
        throw error;
    }
};
