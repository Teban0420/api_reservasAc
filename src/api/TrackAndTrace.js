import axios from 'axios';

// export const TrackAndTrace = axios.create({
//     baseURL: 'https://api-gateway.champ.aero/csp/track-and-trace/v1',
//     headers: {
//         apikey: 'EnbX12j02DDHFrAoqjaq3FIkmTGncrrk',
//         Accept: 'application/json'
//     } 
// });  
export const TrackAndTrace = axios.create({
    baseURL: 'https://acsapiportaltest.azurewebsites.net/',
    headers: {
        apikey: 'EnbX12j02DDHFrAoqjaq3FIkmTGncrrk'        
    } 
});  