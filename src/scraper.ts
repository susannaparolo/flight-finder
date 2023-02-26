// import { apiKey } from "./credentials"
// import axios from "axios"


// export const selectedAirport = "LCY"
// export const date = "2023-02-08"

// export const departuresUrl = `https://app.goflightlabs.com/advanced-future-flights?access_key=${apiKey}&type=departure&iataCode=${selectedAirport}&date=${date}`

// // interface FlightData {
// //     scheduledTime: string;
// //     name: string;
    
// //   }
  
// //   interface APIFlightResponse {
// //     flights: FlightData[];
// //   }

// // export const getFlightData = async (): Promise<APIFlightResponse> => {
// //     const response = fetch(departuresUrl).then((res) => {
// //         console.log(res)
// //     });
// //     // const foo = response.text();
// //     // const result: APIFlightResponse = JSON.parse(await foo);
// //     // const output = result.flights.map(function (value, index) {
// //     //   console.log(`scheduled time: ${value.scheduledTime}, airline name ${value.name}`);
// //     // });
// //     // return result;
// //   };

// interface FlightData {
//     scheduledTime: string;
//     arrivalAirport: string;
//     airline: string;
//   }
  
//   export const getFlightData = () => {
//     return axios.get(departuresUrl).then((res) => {
//         const result = res.data.data.map((flight: any) => {
//             const flightData = {
//                 scheduledTime: flight.departure.scheduledTime,
//                 arrivalAirport: flight.arrival.iataCode.toUpperCase(),
//                 airline: flight.airline.name
//             }
//             // console.log(flightData)
//             return flightData;
//         })
//         return result;
//     });
// };
  
// // getFlightData()
// console.log(getFlightData());

import { apiKey } from "./credentials"
import axios from "axios"


// export const selectedAirport = "LCY"
// export const date = "2023-05-08"

const prompt = require("prompt-sync")({ sigint: true });


export const selectedAirport = prompt(`Insert airport code (e.g. LCY): `)
export const date = prompt(`Insert date (YYYY-MM-DD): `)

export const departuresUrl = `https://app.goflightlabs.com/advanced-future-flights?access_key=${apiKey}&type=departure&iataCode=${selectedAirport}&date=${date}`

interface FlightData {
    scheduledTime: string;
    arrivalAirport: string;
    airline: string;
}

// function calculateFlightTime(startTime: string, endTime: string) {
//     const start = new Date(startTime);
//     const end = new Date(endTime);
//     const difference = end.getTime() - start.getTime();
//     const minutes = Math.floor(difference / 1000 / 60);
//     return minutes;
// }

async function getFlightData() {
    const response = await axios.get(departuresUrl);
    const result = response.data.data.map((flight: any) => {
        const flightData = {
            scheduledArrivalTime: flight.arrival.scheduledTime,
            scheduledDepartureTime: flight.departure.scheduledTime,
            arrivalAirport: flight.arrival.iataCode.toUpperCase(),
            airline: flight.airline.name,
            // flightTime: calculateFlightTime(flight.departure.scheduledTime, flight.arrival.scheduledTime)
        }
        return flightData;
    })
    return result;
}

let flights: FlightData[] = [];

getFlightData().then((res) => {
    flights = res;
    console.log(flights);
});