import axios from 'axios';

export const Availability = axios.create({
    baseURL: 'https://api-gateway.champ.aero/csp/transport-means/v1',
    headers: {
        apikey: 'EnbX12j02DDHFrAoqjaq3FIkmTGncrrk',
        Accept: 'application/json'
    } 
}); 