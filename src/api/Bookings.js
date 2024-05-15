import axios from 'axios'

export const Bookings = axios.create({
    baseURL: 'https://api-gateway.champ.aero/booking',
    headers: {
        apikey: 'EnbX12j02DDHFrAoqjaq3FIkmTGncrrk',
        Accept: 'application/json'
    } 
}); 

export const Update_Cancel_Booking = axios.create({
    baseURL: 'https://api-gateway.champ.aero/booking',
    headers: {
        apikey: 'EnbX12j02DDHFrAoqjaq3FIkmTGncrrk',
        Accept: 'application/json',
        "If-Match": 85854555
    }
})