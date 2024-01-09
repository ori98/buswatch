import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buses: [],
    bus: {
        busNo: "0",
        departureTime: "default_time",
        predictedDepartureTime: "default_time",
    },
};

const busSlice = createSlice({
    name: "buses",
    initialState,
    reducers: {
        addBus(state, action) {
            state.buses = [...state.buses, action.payload];
        },
        updateBus(state, action) {
            const busIndex = state.buses.findIndex(bus => bus.busNo === action.payload.busNo);
            if (busIndex !== -1) {
                state.buses[busIndex] = {
                    ...state.buses[busIndex],
                    departureTime: action.payload.departureTime,
                    predictedDepartureTime: action.payload.predictedDepartureTime,
                };
            } else {
                state.buses.push(action.payload);
            }
        },
        setBus(state, action) {
            state.bus = {
                busNo: action.payload.busNo,
                departureTime: action.payload.departureTime,
                predictedDepartureTime: action.payload.predictedDepartureTime,
            };
        },
        setBuses(state, action) {
            state.buses = action.payload;
        },
    },
});

export const { addBus, updateBus, setBus, setBuses } = busSlice.actions;
export default busSlice.reducer;
