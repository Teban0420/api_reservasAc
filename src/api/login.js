import axios from 'axios';

export const ApiLogin = axios.create({
    baseURL: 'https://acsapiportaltest.azurewebsites.net/'
}); 